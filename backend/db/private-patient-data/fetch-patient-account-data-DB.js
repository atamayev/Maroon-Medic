import { mysqlTables } from "../../utils/table-names-list.js"
import { connection } from "../../setup-and-security/connect.js"

export default new class FetchPatientAccountDataDB {
  async retrievePatientLanguages (Patient_ID) {
    const sql = `SELECT ${mysqlTables.language_list}.Language_name, ${mysqlTables.language_list}.language_listID
      FROM ${mysqlTables.language_list}
          JOIN ${mysqlTables.language_mapping} ON ${mysqlTables.language_list}.language_listID = ${mysqlTables.language_mapping}.Language_ID
      WHERE
          ${mysqlTables.language_mapping}.User_ID = ?`

    const values = [Patient_ID]
    const [languages] = await connection.execute(sql, values)
    return languages
  }

  async retrievePetData (Patient_ID) {
    const sql = `SELECT ${mysqlTables.pet_info}.Name, ${mysqlTables.pet_info}.Gender, ${mysqlTables.pet_info}.DOB, ${mysqlTables.pet_list}.Pet, ${mysqlTables.pet_list}.Pet_type, ${mysqlTables.pet_info}.pet_infoID
        FROM ${mysqlTables.pet_info}
            JOIN ${mysqlTables.pet_list} ON ${mysqlTables.pet_info}.pet_ID = ${mysqlTables.pet_list}.pet_listID
        WHERE
            ${mysqlTables.pet_info}.isActive = 1 AND ${mysqlTables.pet_info}.Patient_ID = ?`

    const values = [Patient_ID]
    const [petData] = await connection.execute(sql, values)
    return petData
  }

  async retrievePetInsurances (petInfoID) {
    const sql = `SELECT ${mysqlTables.insurance_list}.Insurance_name
        FROM ${mysqlTables.insurance_list}
            JOIN ${mysqlTables.insurance_mapping} ON ${mysqlTables.insurance_list}.insurance_listID = ${mysqlTables.insurance_mapping}.Insurance_ID
        WHERE
            ${mysqlTables.insurance_mapping}.pet_info_ID = ?`

    const values = [petInfoID]
    const [insuranceResults] = await connection.execute(sql, values)
    return insuranceResults
  }

}()
