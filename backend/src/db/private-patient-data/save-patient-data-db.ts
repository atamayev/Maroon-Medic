import { mysqlTables } from "../../utils/table-names-list"
import { connectDatabase } from "../../setup-and-security/connect"
import { ResultSetHeader, RowDataPacket } from "mysql2"

export default new class SavePatientDataDB {
	async checkIfPersonalDataExists (patientId: number): Promise<boolean> {
		const sql = `SELECT EXISTS(SELECT 1 FROM ${mysqlTables.basic_user_info} WHERE user_id = ?) AS 'exists' `
		const values = [patientId]
		const connection = await connectDatabase()
		const [results] = await connection.execute(sql, values)
		const doesRecordExist = (results as RowDataPacket[])[0].exists
		return Boolean(doesRecordExist)
	}

	async updatePersonalData (personalInfo: FormattedPersonalData, patientId: number): Promise<void> {
		const sql = `UPDATE ${mysqlTables.basic_user_info} SET first_name = ?, last_name = ?, gender = ?, date_of_birth = ?
			WHERE user_id = ?`
		const values = [personalInfo.firstName, personalInfo.lastName, personalInfo.gender, personalInfo.dateOfBirth, patientId]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}

	async addPersonalData (personalInfo: FormattedPersonalData, patientId: number): Promise<void> {
		const sql = `INSERT INTO ${mysqlTables.basic_user_info} (first_name, last_name, gender, date_of_birth, user_id)
			VALUES (?, ?, ?, ?, ?)`
		const values = [personalInfo.firstName, personalInfo.lastName, personalInfo.gender, personalInfo.dateOfBirth, patientId]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}

	async addLanguage(languageId: number, patientId: number): Promise<void> {
		const sql = `INSERT INTO ${mysqlTables.language_mapping} (language_id, user_id) VALUES (?, ?)`
		const values = [languageId, patientId]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}

	async deleteLanguage(languageId: number, patientId: number): Promise<void> {
		const sql = `DELETE FROM ${mysqlTables.language_mapping} WHERE language_id = ? AND user_id = ?`
		const values = [languageId, patientId]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}

	async addNewPet(petData: PetDetails, patientId: number): Promise<number> {
		const sql = `INSERT INTO ${mysqlTables.pet_info} (name, gender, date_of_birth, patient_id, pet_id) VALUES (?, ?, ?, ?, ?)`
		const values = [petData.name, petData.gender, petData.dateOfBirth, patientId, petData.petListId]
		const connection = await connectDatabase()
		const [result] = await connection.execute(sql, values)
		return (result as ResultSetHeader).insertId
	}

	async deletePet(petId: number): Promise<void> {
		const sql = `UPDATE ${mysqlTables.pet_info} SET is_active = 0 WHERE pet_info_id = ?`
		const values = [petId]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}

	async addNewPetInsurance (insuranceListId: number, petInfoId: number): Promise<void> {
		const sql = `INSERT INTO ${mysqlTables.insurance_mapping} (insurance_id, pet_info_id) VALUES (?, ?)`
		const values = [insuranceListId, petInfoId]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}

	async deleteAllPetInsurances (petInfoId: number): Promise<void> {
		const sql = `DELETE FROM ${mysqlTables.insurance_mapping} WHERE pet_info_id = ?`
		const values = [petInfoId]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}

	async addNewPetMedication (petMedication: PetMedication, petInfoId: number): Promise<void> {
		const sql = `INSERT INTO ${mysqlTables.pet_medication_mapping}
			(pet_medication_id, pet_info_id, frequency_period, frequency_count) VALUES (?, ?, ?, ?)`
		const values = [petMedication.petMedicationId, petInfoId, petMedication.frequencyPeriod, petMedication.frequencyCount]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}

	async deletePetMedication (petMedicationId: number, petInfoId: number): Promise<void> {
		const sql = `DELETE FROM ${mysqlTables.pet_medication_mapping}
			WHERE pet_medication_id = ? AND pet_info_id = ?`
		const values = [petMedicationId, petInfoId]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}

	async deleteAllPetMedications (petInfoId: number): Promise<void> {
		const sql = `DELETE FROM ${mysqlTables.pet_medication_mapping} WHERE pet_info_id = ?`
		const values = [petInfoId]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}

	async addNewPetProcedure (petData: PetProcedure, petInfoId: number): Promise<void> {
		const sql = `INSERT INTO ${mysqlTables.pet_procedure_mapping}
			(pet_procedure_id, pet_info_id, procedure_date) VALUES (?, ?, ?)`
		const values = [petData.petProcedureId, petInfoId, petData.procedureDate]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}

	async deletePetProcedure (petMedicationId: number, petInfoId: number): Promise<void> {
		const sql = `DELETE FROM ${mysqlTables.pet_procedure_mapping}
			WHERE pet_medication_id = ? AND pet_info_id = ?`
		const values = [petMedicationId, petInfoId]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}

	async deleteAllPetProcedures (petInfoId: number): Promise<void> {
		const sql = `DELETE FROM ${mysqlTables.pet_procedure_mapping} WHERE pet_info_id = ?`
		const values = [petInfoId]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}
}()
