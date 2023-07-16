import { mysqlTables } from "../utils/table-names-list.js"
import { connection } from "../setup-and-security/connect.js"

export default new class CalendarDB {
  async retrieveDoctorIDFromNVI (NVI) {
    const sql = `SELECT Doctor_ID FROM ${mysqlTables.doctor_specific_info} WHERE NVI = ?`
    const values = [NVI]
    const [results] = await connection.execute(sql, values)
    const DoctorID = results[0].Doctor_ID
    return DoctorID
  }

  async addAppointment (dateTime, AppointmentObject, DoctorID, createdAt) {
    const sql = `INSERT INTO ${mysqlTables.appointments}
      (appointment_date, appointment_price, appointment_timespan, patient_message, Doctor_confirmation_status, Service_and_category_list_ID, pet_info_ID, Doctor_ID, Addresses_ID, Created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

    const values = [dateTime, AppointmentObject.appointmentPrice, AppointmentObject.appointmentTimespan, AppointmentObject.message, AppointmentObject.InstantBook, AppointmentObject.Service_and_category_list_ID, AppointmentObject.selectedPetID, DoctorID, AppointmentObject.AddressesID, createdAt]
    await connection.execute(sql, values)
  }

  async retrieveDoctorCalendarDetails (DoctorID) {
    const sql = `SELECT
        ${mysqlTables.appointments}.mysqlTables.appointmentsID, ${mysqlTables.appointments}.appointment_date, ${mysqlTables.appointments}.appointment_price, ${mysqlTables.appointments}.appointment_timespan, ${mysqlTables.appointments}.patient_message, ${mysqlTables.appointments}.Doctor_confirmation_status, ${mysqlTables.appointments}.Created_at,
        ${mysqlTables.service_and_category_list}.Category_name, ${mysqlTables.service_and_category_list}.Service_name,
        ${mysqlTables.addresses}.address_title, ${mysqlTables.addresses}.address_line_1, ${mysqlTables.addresses}.address_line_2, ${mysqlTables.addresses}.city, ${mysqlTables.addresses}.state, ${mysqlTables.addresses}.zip, ${mysqlTables.addresses}.country,
        ${mysqlTables.basic_user_info}.FirstName AS Patient_FirstName, ${mysqlTables.basic_user_info}.LastName AS Patient_LastName,
        ${mysqlTables.pet_info}.Name AS Pet_Name
      FROM ${mysqlTables.appointments}
        INNER JOIN ${mysqlTables.service_and_category_list} ON ${mysqlTables.appointments}.${mysqlTables.service_and_category_list}_ID = ${mysqlTables.service_and_category_list}.${mysqlTables.service_and_category_list}ID
        INNER JOIN ${mysqlTables.addresses} ON ${mysqlTables.appointments}.${mysqlTables.addresses}_ID = ${mysqlTables.addresses}.${mysqlTables.addresses}ID AND ${mysqlTables.addresses}.Doctor_ID = ${mysqlTables.appointments}.Doctor_ID
        INNER JOIN ${mysqlTables.pet_info} ON ${mysqlTables.appointments}.mysqlTables.pet_info_ID = ${mysqlTables.pet_info}.mysqlTables.pet_infoID
        INNER JOIN ${mysqlTables.basic_user_info} ON ${mysqlTables.pet_info}.Patient_ID = ${mysqlTables.basic_user_info}.User_ID
      WHERE
        ${mysqlTables.appointments}.Doctor_ID = ?`

    const values = [DoctorID]
    const [calendarDetalis] = await connection.execute(sql, values)
    return calendarDetalis
  }

  async confirmAppointmentStatus (appointmentID) {
    const sql = `UPDATE ${mysqlTables.appointments} SET Doctor_confirmation_status = 1 WHERE appointmentsID = ?`
    const values = [appointmentID]
    await connection.execute(sql, values)
  }
}()
