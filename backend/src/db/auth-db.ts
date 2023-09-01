import { mysqlTables } from "../utils/table-names-list"
import { connectDatabase } from "../setup-and-security/connect"
import { OkPacket, RowDataPacket } from "mysql2"
import { transformArrayOfObjectsToCamelCase } from "../utils/transform-keys-to-camel-case"

type LoginHistoryRecord = {
  loginAt: string
}

export default new class AuthDB {
	async checkIfUUIDExists (UUID: string): Promise<boolean> {
		const sql = `SELECT EXISTS(SELECT 1 FROM ${mysqlTables.uuid_reference} WHERE UUID = ?) AS 'exists' `
		const values = [UUID]
		const connection = await connectDatabase()
		const [results] = await connection.execute(sql, values)
		const doesRecordExist = (results as RowDataPacket[])[0].exists
		return Boolean(doesRecordExist)
	}

	async retrieveUserIdAndPassword (username: string, loginType: DoctorOrPatient): Promise<UserIdAndPassword> {
		const sql = `SELECT user_id, password FROM ${mysqlTables.credentials} WHERE email = ? AND user_type = ? AND is_active = 1`
		const values = [username, loginType]
		const connection = await connectDatabase()
		const [results] = await connection.execute(sql, values) as RowDataPacket[]
		const userIDData = results.map((row: RowDataPacket) => row as UserIdAndPassword)
		const camelCasedUserIdData = transformArrayOfObjectsToCamelCase(userIDData)
		const resultsObject = camelCasedUserIdData[0] as UserIdAndPassword
		return resultsObject
	}

	async checkIfAccountExists (username: string, registrationType: DoctorOrPatient): Promise<boolean> {
		//Consider adding is_active as a search parameter. If a user deletes their account,
		//should they be allowed to create a new one with the same email?
		const sql = `SELECT EXISTS(SELECT 1 FROM ${mysqlTables.credentials} WHERE email = ? AND user_type = ?) AS 'exists' `
		const values = [username, registrationType]
		const connection = await connectDatabase()
		const [results] = await connection.execute(sql, values)
		const doesAccountExist = (results as RowDataPacket[])[0].exists
		return Boolean(doesAccountExist)
	}

	async addNewUserCredentials (
		username: string,
		password: string,
		registrationType: DoctorOrPatient
	): Promise<number> {
		const sql = `INSERT INTO ${mysqlTables.credentials} (email, password, user_type) VALUES (?, ?, ?)`
		const values = [username, password, registrationType]
		const connection = await connectDatabase()
		const [results] = await connection.execute(sql, values)
		return (results as OkPacket).insertId
	}

	async addDoctorSpecificDetails (userId: number): Promise<void> {
		const sql = `INSERT INTO ${mysqlTables.doctor_specific_info} (verified, publicly_available, doctor_id) VALUES (?, ?, ?)`
		const values = [true, true, userId]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}

	async updatePassword (password: string, userId: number): Promise<void> {
		const sql = `UPDATE ${mysqlTables.credentials} SET password = ? WHERE user_id = ?`
		const values = [password, userId]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}

	async retrieveUserPassword (userId: number): Promise<string> {
		const sql = `SELECT password FROM ${mysqlTables.credentials} WHERE user_id = ?`
		const values = [userId]
		const connection = await connectDatabase()
		const [results] = await connection.execute(sql, values)
		const password = (results as RowDataPacket[])[0].password
		return password
	}

	async retrieveLoginHistory (userId: number): Promise<LoginHistoryRecord[]> {
		const sql = `SELECT login_at FROM ${mysqlTables.login_history} WHERE user_id = ? ORDER BY login_at DESC`
		const values = [userId]
		const connection = await connectDatabase()
		const [results] = await connection.execute(sql, values) as RowDataPacket[]
		const loginHistory = results.map((row: RowDataPacket) => row as LoginHistoryRecord)
		const camelCasedLoginHistory = transformArrayOfObjectsToCamelCase(loginHistory)
		return camelCasedLoginHistory as LoginHistoryRecord[]
	}

	async checkIfUUIDsExist (newDoctorUUID: string, existingDoctorUUID: string): Promise<boolean> {
		const sql = `SELECT EXISTS(SELECT 1 FROM ${mysqlTables.uuid_reference} WHERE UUID = ?) AS 'exists'`
		const values1 = [newDoctorUUID]
		const values2 = [existingDoctorUUID]

		const connection = await connectDatabase()
		const [results1] = await connection.execute(sql, values1)
		const [results2] = await connection.execute(sql, values2)
		const doesRecord1Exist = (results1 as RowDataPacket[])[0].exists
		const doesRecord2Exist = (results2 as RowDataPacket[])[0].exists
		if (doesRecord1Exist && doesRecord2Exist) return true
		return false
	}

	async addLoginHistory (userId: number): Promise<void> {
		const sql = `INSERT INTO ${mysqlTables.login_history} (ip_address, user_id) VALUES (?, ?)`
		const values = [null, userId]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}

	async deleteUUIDUponLogout (UUID: string): Promise<void> {
		const sql = `DELETE FROM ${mysqlTables.uuid_reference} WHERE UUID = ?`
		const values = [UUID]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}
}()
