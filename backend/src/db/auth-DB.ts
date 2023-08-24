import { mysqlTables } from "../utils/table-names-list"
import { connectDatabase } from "../setup-and-security/connect"
import { OkPacket, RowDataPacket } from "mysql2"

type LoginHistoryRecord = {
  login_historyID: number,
  Login_at: string,
}

export default new class AuthDB {
	async checkIfUUIDExists (UUID: string): Promise<boolean> {
		const sql = `SELECT EXISTS(SELECT 1 FROM ${mysqlTables.uuid_reference} WHERE UUID = ?) as 'exists' `
		const values = [UUID]
		const connection = await connectDatabase()
		const [results] = await connection.execute(sql, values)
		const doesRecordExist = (results as RowDataPacket[])[0].exists
		return Boolean(doesRecordExist)
	}

	async retrieveUserIDAndPassword (username: string, loginType: DoctorOrPatient): Promise<UserIDAndPassword> {
		const sql = `SELECT UserID, password FROM ${mysqlTables.credentials} WHERE email = ? AND User_type = ? AND isActive = 1`
		const values = [username, loginType]
		const connection = await connectDatabase()
		const [results] = await connection.execute(sql, values) as RowDataPacket[]
		const resultsObject = results[0] as UserIDAndPassword
		return resultsObject
	}

	async checkIfAccountExists (username: string, registrationType: DoctorOrPatient): Promise<boolean> {
		//Consider adding isActive as a search parameter. If a user deletes their account,
		//should they be allowed to create a new one with the same email?
		const sql = `SELECT EXISTS(SELECT 1 FROM ${mysqlTables.credentials} WHERE email = ? AND User_type = ?) as 'exists' `
		const values = [username, registrationType]
		const connection = await connectDatabase()
		const [results] = await connection.execute(sql, values)
		const doesAccountExist = (results as RowDataPacket[])[0].exists
		return Boolean(doesAccountExist)
	}

	async addNewUserCredentials (
		username: string,
		password: string,
		createdAt: MysqlTimestamp,
		registrationType: DoctorOrPatient
	): Promise<number> {
		const sql = `INSERT INTO ${mysqlTables.credentials} (email, password, Created_at, User_type) VALUES (?, ?, ?, ?)`
		const values = [username, password, createdAt, registrationType]
		const connection = await connectDatabase()
		const [results] = await connection.execute(sql, values)
		return (results as OkPacket).insertId
	}

	async addDoctorSpecificDetails (UserID: number): Promise<void> {
		const sql = `INSERT INTO ${mysqlTables.doctor_specific_info} (verified, publiclyAvailable, Doctor_ID) VALUES (?, ?, ?)`
		const values = [true, true, UserID]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}

	async updatePassword (password: string, UserID: number): Promise<void> {
		const sql = `UPDATE ${mysqlTables.credentials} SET password = ? WHERE UserID = ?`
		const values = [password, UserID]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}

	async retrieveUserPassword (UserID: number): Promise<string> {
		const sql = `SELECT password FROM ${mysqlTables.credentials} WHERE UserID = ?`
		const values = [UserID]
		const connection = await connectDatabase()
		const [results] = await connection.execute(sql, values)
		const password = (results as RowDataPacket[])[0].password
		return password
	}

	async retrieveLoginHistory (UserID: number): Promise<LoginHistoryRecord[]> {
		const sql = `SELECT Login_at FROM ${mysqlTables.login_history} WHERE User_ID = ? ORDER BY Login_at DESC`
		const values = [UserID]
		const connection = await connectDatabase()
		const [results] = await connection.execute(sql, values)
		return results as LoginHistoryRecord[]
	}

	async checkIfUUIDsExist (newDoctorUUID: string, existingDoctorUUID: string): Promise<boolean> {
		const sql = `SELECT EXISTS(SELECT 1 FROM ${mysqlTables.uuid_reference} WHERE UUID = ?) as 'exists'`
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

	async addLoginHistory (UserID: number, loginTime: MysqlTimestamp): Promise<void> {
		const sql = `INSERT INTO ${mysqlTables.login_history} (Login_at, IP_Address, User_ID) VALUES (?, ?, ?)`
		const values = [loginTime, null, UserID]
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
