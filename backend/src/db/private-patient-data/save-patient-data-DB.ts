import { mysqlTables } from "../../utils/table-names-list"
import { connectDatabase } from "../../setup-and-security/connect"
import { OkPacket, RowDataPacket } from "mysql2"

interface PersonalInfo {
  firstName: string
  lastName: string
  gender: string
}

export default new class SavePatientDataDB {
	async checkIfPersonalDataExists (patientId: number): Promise<boolean> {
		const sql = `SELECT EXISTS(SELECT 1 FROM ${mysqlTables.basic_user_info} WHERE user_id = ?) AS 'exists' `
		const values = [patientId]
		const connection = await connectDatabase()
		const [results] = await connection.execute(sql, values)
		const doesRecordExist = (results as RowDataPacket[])[0].exists
		return Boolean(doesRecordExist)
	}

	async updatePersonalData (personalInfo: PersonalInfo, dateOfBirth: MysqlTimestamp, patientId: number): Promise<void> {
		const sql = `UPDATE ${mysqlTables.basic_user_info} SET first_name = ?, last_name = ?, gender = ?, date_of_birth = ?
			WHERE user_id = ?`
		const values = [personalInfo.firstName, personalInfo.lastName, personalInfo.gender, dateOfBirth, patientId]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}

	async addPersonalData (personalInfo: PersonalInfo, dateOfBirth: MysqlTimestamp, patientId: number): Promise<void> {
		const sql = `INSERT INTO ${mysqlTables.basic_user_info} (first_name, last_name, gender, date_of_birth, user_id)
			VALUES (?, ?, ?, ?, ?)`
		const values = [personalInfo.firstName, personalInfo.lastName, personalInfo.gender, dateOfBirth, patientId]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}

	async addLanguage(languageID: number, patientId: number): Promise<void> {
		const sql = `INSERT INTO ${mysqlTables.language_mapping} (Language_ID, user_id) VALUES (?, ?)`
		const values = [languageID, patientId]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}

	async deleteLanguage(languageID: number, patientId: number): Promise<void> {
		const sql = `DELETE FROM ${mysqlTables.language_mapping} WHERE Language_ID = ? AND user_id = ?`
		const values = [languageID, patientId]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}

	async addNewPet(petData: PetDetails, patientId: number): Promise<number> {
		const sql = `INSERT INTO ${mysqlTables.pet_info} (name, gender, date_of_birth, patient_id, pet_ID) VALUES (?, ?, ?, ?, ?)`
		const values = [petData.name, petData.gender, petData.dateOfBirth, patientId, petData.petListId]
		const connection = await connectDatabase()
		const [result] = await connection.execute(sql, values)
		return (result as OkPacket).insertId
	}

	async addNewPetInsurance (insuranceListID: number, petInfoID: number): Promise<void> {
		const sql = `INSERT INTO ${mysqlTables.insurance_mapping} (Insurance_ID, pet_info_ID) VALUES (?, ?)`
		const values = [insuranceListID, petInfoID]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}

	async deletePet(petID: number): Promise<void> {
		const sql = `UPDATE ${mysqlTables.pet_info} SET is_active = 0 WHERE pet_infoID = ?`
		const values = [petID]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}
}()
