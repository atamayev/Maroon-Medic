import { mysqlTables } from "../../utils/table-names-list.js"
import { connectDatabase } from "../../setup-and-security/connect.js"
import { RowDataPacket } from "mysql2"

type LanguageItem = {
  language_listID: number
  Language_name: string
}

type PetItem = {
  Name: string
  Gender: string
  DOB: string
  Pet: string
  Pet_type: string
  pet_infoID: number
  insuranceName: InsuranceItem
}

type InsuranceItem = {
  Insurance_name: string
}

export default new class FetchPatientAccountDataDB {
  async retrievePatientLanguages (PatientID: number): Promise<LanguageItem[]> {
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

  async retrievePetData (PatientID: number): Promise<PetItem[]> {
    const sql = `SELECT ${mysqlTables.pet_info}.Name, ${mysqlTables.pet_info}.Gender, ${mysqlTables.pet_info}.DOB, ${mysqlTables.pet_list}.Pet, ${mysqlTables.pet_list}.Pet_type, ${mysqlTables.pet_info}.pet_infoID
        FROM ${mysqlTables.pet_info}
            JOIN ${mysqlTables.pet_list} ON ${mysqlTables.pet_info}.pet_ID = ${mysqlTables.pet_list}.pet_listID
        WHERE
            ${mysqlTables.pet_info}.isActive = 1 AND ${mysqlTables.pet_info}.Patient_ID = ?`

    const values = [PatientID]

    const connection = await connectDatabase()
    const [results] = await connection.execute(sql, values) as RowDataPacket[]
    const petData = results.map((row: RowDataPacket) => row as PetItem)
    return petData
  }

  async retrievePetInsurances (petInfoID: number): Promise<InsuranceItem> {
    const sql = `SELECT ${mysqlTables.insurance_list}.Insurance_name
        FROM ${mysqlTables.insurance_list}
            JOIN ${mysqlTables.insurance_mapping} ON ${mysqlTables.insurance_list}.insurance_listID = ${mysqlTables.insurance_mapping}.Insurance_ID
        WHERE
            ${mysqlTables.insurance_mapping}.pet_info_ID = ?`

    const values = [petInfoID]

    const connection = await connectDatabase()
    const [insuranceResults] = await connection.execute(sql, values) as RowDataPacket[]
    const insurance = insuranceResults[0] as InsuranceItem
    return insurance
  }
}()
