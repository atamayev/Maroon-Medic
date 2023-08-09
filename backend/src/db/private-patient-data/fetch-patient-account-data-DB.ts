import { mysqlTables } from "../../utils/table-names-list"
import { connectDatabase } from "../../setup-and-security/connect"
import { RowDataPacket } from "mysql2"

type InsuranceItem = {
  Insurance_name: string
}

export default new class FetchPatientAccountDataDB {
  async languages (PatientID: number): Promise<LanguageItem[]> {
    const sql = `SELECT ${mysqlTables.language_list}.Language_name, ${mysqlTables.language_list}.language_listID
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
    const sql = `SELECT ${mysqlTables.pet_info}.Name, ${mysqlTables.pet_info}.Gender, ${mysqlTables.pet_info}.DOB,
    ${mysqlTables.pet_list}.Pet, ${mysqlTables.pet_list}.Pet_type, ${mysqlTables.pet_info}.pet_infoID
        FROM ${mysqlTables.pet_info}
            JOIN ${mysqlTables.pet_list} ON ${mysqlTables.pet_info}.pet_ID = ${mysqlTables.pet_list}.pet_listID
        WHERE
            ${mysqlTables.pet_info}.isActive = 1 AND ${mysqlTables.pet_info}.Patient_ID = ?`

    const values = [PatientID]

    const connection = await connectDatabase()
    const [results] = await connection.execute(sql, values) as RowDataPacket[]
    const petData = results.map((row: RowDataPacket) => row as CompletePetInfo)
    return petData
  }

  async petInsurances (petInfoID: number): Promise<string> {
    const sql = `SELECT ${mysqlTables.insurance_list}.Insurance_name
        FROM ${mysqlTables.insurance_list}
            JOIN ${mysqlTables.insurance_mapping} ON
            ${mysqlTables.insurance_list}.insurance_listID = ${mysqlTables.insurance_mapping}.Insurance_ID
        WHERE
            ${mysqlTables.insurance_mapping}.pet_info_ID = ?`

    const values = [petInfoID]

    const connection = await connectDatabase()
    const [insuranceResults] = await connection.execute(sql, values) as RowDataPacket[]
    const insurance = (insuranceResults[0] as InsuranceItem).Insurance_name
    return insurance as string
  }
}()