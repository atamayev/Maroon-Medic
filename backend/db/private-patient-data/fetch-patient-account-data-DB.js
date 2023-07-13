import { mysqlTables } from "../../utils/table-names-list.js"
import { connection } from "../../setup-and-security/connect.js"

export default new class FetchPatientAccountDataDB {
  async retrievePatientInsurances (Pet_info_ID) {
    const sql = `SELECT ${mysqlTables.insurance_list}.Insurance_name, ${mysqlTables.insurance_list}.insurance_listID
    FROM ${mysqlTables.insurance_list} JOIN ${mysqlTables.insurance_mapping} ON ${mysqlTables.insurance_list}.insurance_listID = ${mysqlTables.insurance_mapping}.Insurance_ID
    WHERE ${mysqlTables.insurance_mapping}.pet_info_ID = ?`

    const values = [Pet_info_ID]
    const [insurances] = await connection.execute(sql, values)
    return insurances
  }

}()
