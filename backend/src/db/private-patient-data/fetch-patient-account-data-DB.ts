import { mysqlTables } from "../../utils/table-names-list"
import { connectDatabase } from "../../setup-and-security/connect"
import { RowDataPacket } from "mysql2"
import { transformArrayOfObjectsToCamelCase } from "../../utils/transform-keys-to-camel-case"

type InsuranceItem = {
	insurance_name: string
}

export default new class FetchPatientAccountDataDB {
	async languages (PatientID: number): Promise<LanguageItem[]> {
		const sql = `SELECT ${mysqlTables.language_list}.language_name AS languageName, ${mysqlTables.language_list}.language_listID
      FROM ${mysqlTables.language_list}
          JOIN ${mysqlTables.language_mapping} ON ${mysqlTables.language_list}.language_listID = ${mysqlTables.language_mapping}.Language_ID
      WHERE
          ${mysqlTables.language_mapping}.User_ID = ?`

		const values = [PatientID]

		const connection = await connectDatabase()
		const [results] = await connection.execute(sql, values) as RowDataPacket[]
		const languages = results.map((row: RowDataPacket) => row as LanguageItem)
		return languages
	}

	async petData (PatientID: number): Promise<CompletePetInfo[]> {
		const sql = `SELECT ${mysqlTables.pet_info}.name, ${mysqlTables.pet_info}.gender, ${mysqlTables.pet_info}.date_of_birth,
    		${mysqlTables.pet_list}.pet, ${mysqlTables.pet_list}.pet_type, ${mysqlTables.pet_info}.pet_infoID
        FROM ${mysqlTables.pet_info}
            JOIN ${mysqlTables.pet_list} ON ${mysqlTables.pet_info}.pet_ID = ${mysqlTables.pet_list}.pet_listID
        WHERE
            ${mysqlTables.pet_info}.is_active = 1 AND ${mysqlTables.pet_info}.patient_id = ?`

		const values = [PatientID]

		const connection = await connectDatabase()
		const [results] = await connection.execute(sql, values) as RowDataPacket[]
		const petData = results.map((row: RowDataPacket) => row as CompletePetInfo)
		const camelCasedPetData = transformArrayOfObjectsToCamelCase(petData)
		return camelCasedPetData as CompletePetInfo[]
	}

	async petInsurances (petInfoID: number): Promise<string> {
		const sql = `SELECT ${mysqlTables.insurance_list}.insurance_name
        FROM ${mysqlTables.insurance_list}
            JOIN ${mysqlTables.insurance_mapping} ON
            ${mysqlTables.insurance_list}.insurance_listID = ${mysqlTables.insurance_mapping}.Insurance_ID
        WHERE
            ${mysqlTables.insurance_mapping}.pet_info_ID = ?`

		const values = [petInfoID]

		const connection = await connectDatabase()
		const [insuranceResults] = await connection.execute(sql, values) as RowDataPacket[]
		const insurance = (insuranceResults[0] as InsuranceItem).insurance_name
		return insurance as string
	}
}()
