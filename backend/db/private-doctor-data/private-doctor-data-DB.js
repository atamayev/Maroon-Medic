import { mysqlTables } from "../../utils/table-names-list.js"
import { connection } from "../../setup-and-security/connect.js"

export default new class PrivateDoctorDataDB {
  async addNewDoctorInfo (doctorInfo, dateOfBirth, UserID) {
    const sql = `INSERT INTO ${mysqlTables.basic_user_info} (FirstName, LastName, Gender, DOB, User_ID) VALUES (?, ?, ?, ?, ?)`
    const values = [doctorInfo.FirstName, doctorInfo.LastName, doctorInfo.Gender, dateOfBirth, UserID]
    await connection.execute(sql, values)
  }

  async newDoctorConfirmation (newDoctorUUID, existingDoctorUUID) {
    const sql = `SELECT EXISTS(SELECT 1 FROM ${mysqlTables.uuid_reference} WHERE UUID = ?) as 'exists'`
    const values1 = [newDoctorUUID]
    const values2 = [existingDoctorUUID]
    const [results1] = await connection.execute(sql, values1)
    const [results2] = await connection.execute(sql, values2)
    const doesRecord1Exist = results1[0].exists
    const doesRecord2Exist = results2[0].exists
    if (doesRecord1Exist && doesRecord2Exist) return true
    return false
  }

  async retrieveDoctorDashboard (DoctorID) {
    const sql = `SELECT
          ${mysqlTables.appointments}.appointmentsID, ${mysqlTables.appointments}.appointment_date, ${mysqlTables.appointments}.appointment_price, ${mysqlTables.appointments}.patient_message, ${mysqlTables.appointments}.Doctor_confirmation_status, ${mysqlTables.appointments}.Created_at,
          ${mysqlTables.service_and_category_list}.Category_name, ${mysqlTables.service_and_category_list}.Service_name,
          ${mysqlTables.addresses}.address_title, ${mysqlTables.addresses}.address_line_1, ${mysqlTables.addresses}.address_line_2, ${mysqlTables.addresses}.city, ${mysqlTables.addresses}.state, ${mysqlTables.addresses}.zip, ${mysqlTables.addresses}.country,
          ${mysqlTables.basic_user_info}.FirstName AS Patient_FirstName, ${mysqlTables.basic_user_info}.LastName AS Patient_LastName
      FROM ${mysqlTables.appointments}
          INNER JOIN ${mysqlTables.service_and_category_list} ON ${mysqlTables.appointments}.${mysqlTables.service_and_category_list}_ID = ${mysqlTables.service_and_category_list}.${mysqlTables.service_and_category_list}ID
          INNER JOIN ${mysqlTables.addresses} ON ${mysqlTables.appointments}.${mysqlTables.addresses}_ID = ${mysqlTables.addresses}.${mysqlTables.addresses}ID AND ${mysqlTables.addresses}.Doctor_ID = ${mysqlTables.appointments}.Doctor_ID
          INNER JOIN ${mysqlTables.basic_user_info} ON ${mysqlTables.appointments}.Patient_ID = ${mysqlTables.basic_user_info}.User_ID
      WHERE
          ${mysqlTables.appointments}.Doctor_ID = ?`

    const values = [DoctorID]
    const [dashboardData] = await connection.execute(sql, values)
    return dashboardData
  }

  async retrievePersonalDoctorData (DoctorID) {
    const sql = `SELECT FirstName, LastName, Gender, DOB FROM ${mysqlTables.basic_user_info} WHERE User_ID = ?`
    const values = [DoctorID]
    const [personalData] = await connection.execute(sql, values)
    return personalData
  }

  async updateAppointmentStatus (appointmentID) {
    const sql = `UPDATE ${mysqlTables.appointments} SET Doctor_confirmation_status = 1 WHERE appointmentsID = ?`
    const values = [appointmentID]
    await connection.execute(sql, values)
  }
}()
