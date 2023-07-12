import { mysqlTables } from "../utils/table-names-list.js"
import { connection } from "../db-setup-and-security/connect.js"

export default new class SearchDB {
  async searchForDoctors (searchTerm) {
    const sql = `SELECT NVI, FirstName, LastName
      FROM ${mysqlTables.basic_user_info}
      LEFT JOIN ${mysqlTables.doctor_specific_info} ON ${mysqlTables.basic_user_info}.User_ID = ${mysqlTables.doctor_specific_info}.Doctor_ID
      LEFT JOIN ${mysqlTables.credentials} ON ${mysqlTables.basic_user_info}.User_ID = ${mysqlTables.credentials}.UserID
      WHERE ${mysqlTables.doctor_specific_info}.verified = TRUE
      AND ${mysqlTables.doctor_specific_info}.publiclyAvailable = TRUE
      AND ${mysqlTables.credentials}.isActive = 1
      AND ${mysqlTables.basic_user_info}.FirstName LIKE ?`

    const values = [`${searchTerm}%`]
    const [results] = await connection.execute(sql, values)
    return results
  }

  async fetchAllDoctors () {
    const sql = `SELECT NVI, FirstName, LastName
      FROM ${mysqlTables.basic_user_info}
      LEFT JOIN ${mysqlTables.doctor_specific_info} ON ${mysqlTables.basic_user_info}.User_ID = ${mysqlTables.doctor_specific_info}.Doctor_ID
      LEFT JOIN ${mysqlTables.credentials} ON ${mysqlTables.basic_user_info}.User_ID = ${mysqlTables.credentials}.UserID
      WHERE ${mysqlTables.doctor_specific_info}.verified = TRUE AND ${mysqlTables.doctor_specific_info}.publiclyAvailable = TRUE AND ${mysqlTables.credentials}.isActive = 1`

    const [results] = await connection.execute(sql)
    return results
  }

}()
