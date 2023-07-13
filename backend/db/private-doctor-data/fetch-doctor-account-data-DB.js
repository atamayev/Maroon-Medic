import { mysqlTables } from "../../utils/table-names-list.js"
import { connection } from "../../setup-and-security/connect.js"

export default new class FetchDoctorAccountDataDB {
  async retrievePatientInsurances (User_ID) {
    const sql = `SELECT ${mysqlTables.language_mapping}.Language_name, ${mysqlTables.language_mapping}.language_listID
      FROM ${mysqlTables.language_mapping} JOIN ${mysqlTables.language_mapping} ON ${mysqlTables.language_mapping}.language_listID = ${mysqlTables.language_mapping}.Language_ID
      WHERE ${mysqlTables.language_mapping}.User_ID = ?`

    const values = [User_ID]

    const [languages] = await connection.execute(sql, values)
    return languages
  }

}()
