import { mysqlTables } from "../../utils/table-names-list"
import { connectDatabase } from "../../setup-and-security/connect"
import { RowDataPacket } from "mysql2"
import { transformArrayOfObjectsToCamelCase } from "../../utils/transform-keys-to-camel-case"

type InsuranceItem = {
	insuranceName: string
}

export default new class FetchPatientAccountDataDB {
	async languages (patientId: number): Promise<LanguageItem[]> {
		const sql = `SELECT ${mysqlTables.language_list}.language_name, ${mysqlTables.language_list}.language_list_id
      FROM ${mysqlTables.language_list}
          JOIN ${mysqlTables.language_mapping}
		  ON ${mysqlTables.language_list}.language_list_id = ${mysqlTables.language_mapping}.language_id
      WHERE
          ${mysqlTables.language_mapping}.user_id = ?`

		const values = [patientId]

		const connection = await connectDatabase()
		const [results] = await connection.execute(sql, values) as RowDataPacket[]
		const languages = results.map((row: RowDataPacket) => row as LanguageItem)
		const camelCasedLanguages = transformArrayOfObjectsToCamelCase(languages)
		return camelCasedLanguages as LanguageItem[]
	}

	async petData (patientId: number): Promise<CompletePetInfo[]> {
		const sql = `SELECT ${mysqlTables.pet_info}.name, ${mysqlTables.pet_info}.gender, ${mysqlTables.pet_info}.date_of_birth,
    		${mysqlTables.pet_list}.pet, ${mysqlTables.pet_list}.pet_type, ${mysqlTables.pet_info}.pet_info_id
        FROM ${mysqlTables.pet_info}
            JOIN ${mysqlTables.pet_list} ON ${mysqlTables.pet_info}.pet_id = ${mysqlTables.pet_list}.pet_list_id
        WHERE
            ${mysqlTables.pet_info}.is_active = 1 AND ${mysqlTables.pet_info}.patient_id = ?`

		const values = [patientId]

		const connection = await connectDatabase()
		const [results] = await connection.execute(sql, values) as RowDataPacket[]
		const petData = results.map((row: RowDataPacket) => row as CompletePetInfo)
		const camelCasedPetData = transformArrayOfObjectsToCamelCase(petData)
		return camelCasedPetData as CompletePetInfo[]
	}

	async petInsurances (petInfoId: number): Promise<string> {
		const sql = `SELECT ${mysqlTables.insurance_list}.insurance_name
        FROM ${mysqlTables.insurance_list}
            JOIN ${mysqlTables.insurance_mapping} ON
            ${mysqlTables.insurance_list}.insurance_list_id = ${mysqlTables.insurance_mapping}.insurance_id
        WHERE
            ${mysqlTables.insurance_mapping}.pet_info_id = ?`

		const values = [petInfoId]

		const connection = await connectDatabase()
		const [results] = await connection.execute(sql, values) as RowDataPacket[]
		const insuranceResults = results.map((row: RowDataPacket) => row)
		const camelCasedPetData = transformArrayOfObjectsToCamelCase(insuranceResults)
		const insurance = (camelCasedPetData[0] as InsuranceItem).insuranceName
		return insurance as string
	}

	async petMedications (petInfoId: number): Promise<PetMedications[]> {
		const sql = `SELECT ${mysqlTables.pet_medications_list}.medication_name
        FROM ${mysqlTables.pet_medications_list}
            JOIN ${mysqlTables.pet_medications_mapping} ON
            ${mysqlTables.pet_medications_list}.pet_medications_list_id = ${mysqlTables.pet_medications_mapping}.pet_medications_id
        WHERE
            ${mysqlTables.pet_medications_mapping}.pet_info_id = ?`

		const values = [petInfoId]

		const connection = await connectDatabase()
		const [results] = await connection.execute(sql, values) as RowDataPacket[]
		const petMedicationsResults = results.map((row: RowDataPacket) => row as PetMedications)
		const camelCasedPetMedicationData = transformArrayOfObjectsToCamelCase(petMedicationsResults)
		return camelCasedPetMedicationData as PetMedications[]
	}

	async petProcedures (petInfoId: number): Promise<PetProcedures[]> {
		const sql = `SELECT ${mysqlTables.pet_procedures_list}.procedure_name
        FROM ${mysqlTables.pet_procedures_list}
            JOIN ${mysqlTables.pet_procedures_mapping} ON
            ${mysqlTables.pet_procedures_list}.pet_procedures_list_id = ${mysqlTables.pet_procedures_mapping}.pet_procedures_id
        WHERE
            ${mysqlTables.pet_procedures_mapping}.pet_info_id = ?`

		const values = [petInfoId]

		const connection = await connectDatabase()
		const [results] = await connection.execute(sql, values) as RowDataPacket[]
		const petProceduresResults = results.map((row: RowDataPacket) => row as PetProcedures)
		const camelCasedPetProceduresData = transformArrayOfObjectsToCamelCase(petProceduresResults)
		return camelCasedPetProceduresData as PetProcedures[]
	}
}()
