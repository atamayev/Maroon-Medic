import { mysqlTables } from "../../utils/table-names-list.js"
import { connection } from "../../setup-and-security/connect.js"

export default new class PrivatePatientDataDB {
  async addNewPatientInfo (patientInfo, dateOfBirth, UserID) {
    const sql = `INSERT INTO ${mysqlTables.basic_user_info} (FirstName, LastName, Gender, DOB, User_ID) VALUES (?, ?, ?, ?, ?)`
    const values = [patientInfo.FirstName, patientInfo.LastName, patientInfo.Gender, dateOfBirth, UserID]
    await connection.execute(sql, values)
  }

  async retrievePatientDashboard (PatientID) {
    const sql = `SELECT
          ${mysqlTables.appointments}.AppointmentsID, ${mysqlTables.appointments}.appointment_date, ${mysqlTables.appointments}.appointment_price, ${mysqlTables.appointments}.patient_message, ${mysqlTables.appointments}.Doctor_confirmation_status, ${mysqlTables.appointments}.Created_at,
          ${mysqlTables.service_and_category_list}.Category_name, ${mysqlTables.service_and_category_list}.Service_name,
          ${mysqlTables.addresses}.address_title, ${mysqlTables.addresses}.address_line_1, ${mysqlTables.addresses}.address_line_2, ${mysqlTables.addresses}.city, ${mysqlTables.addresses}.state, ${mysqlTables.addresses}.zip, ${mysqlTables.addresses}.country,
          ${mysqlTables.basic_user_info}.FirstName AS Doctor_FirstName, ${mysqlTables.basic_user_info}.LastName AS Doctor_LastName
      FROM ${mysqlTables.appointments}
          INNER JOIN ${mysqlTables.service_and_category_list} ON ${mysqlTables.appointments}.${mysqlTables.service_and_category_list}_ID = ${mysqlTables.service_and_category_list}.${mysqlTables.service_and_category_list}ID
          INNER JOIN ${mysqlTables.addresses} ON ${mysqlTables.appointments}.${mysqlTables.addresses}_ID = ${mysqlTables.addresses}.${mysqlTables.addresses}ID AND ${mysqlTables.addresses}.Doctor_ID = ${mysqlTables.appointments}.Doctor_ID
          INNER JOIN ${mysqlTables.basic_user_info} ON ${mysqlTables.appointments}.Doctor_ID = ${mysqlTables.basic_user_info}.User_ID
      WHERE
          ${mysqlTables.appointments}.Patient_ID = ?`

    const values = [PatientID]
    const [dashboardData] = await connection.execute(sql, values)
    return dashboardData
  }

  async retrievePersonalPatientData (PatientID) {
    const sql = `SELECT FirstName, LastName, Gender, DOB FROM ${mysqlTables.basic_user_info} WHERE User_ID = ?`
    const values = [PatientID]
    const [personalData] = await connection.execute(sql, values)
    return personalData
  }
}()
