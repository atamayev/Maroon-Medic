import dayjs from "dayjs"
import TimeUtils from "../utils/time.js"
import { UUID_to_ID } from "../db-setup-and-security/UUID.js"
import { connection, DB_Operation } from "../db-setup-and-security/connect.js"
import { clearCookies } from "../utils/cookie-operations.js"

/** makeAppointment is called when a patient makes an appointment
 *  First, finds the Doctor_ID corresponding to the NVI of the appointment Doctor
 *  Then, converts the Patient UUID to the PatientID, and inserts the apointment details into the Appointments table
 * @param {Object} req Appointment Object
 * @param {status} res 200/400 status code
 * @returns 200/400 status code
 *  DOCUMENTATION LAST UPDATED 6/4/23
 */
export async function makeAppointment(req, res) {
  const AppointmentObject = req.body.AppointmentObject
  const NVI = AppointmentObject.NVI

  const [Doctor_specific_info, Appointments] = ["Doctor_specific_info", "Appointments"]
  const sql = `SELECT Doctor_ID FROM ${Doctor_specific_info} WHERE NVI = ?`
  const values = [NVI]
  let DoctorID

  await DB_Operation(makeAppointment.name, Doctor_specific_info)
  try {
    const [results] = await connection.execute(sql, values)
    DoctorID = results[0].Doctor_ID
  } catch (error) {
    return res.status(500).json(error)
  }

  const createdAt = TimeUtils.createFormattedDate()

  // Remove "th", "st", "nd", "rd" from the date
  const dateStr = TimeUtils.cleanDateString(AppointmentObject.appointmentDate)
  const timeStr = AppointmentObject.appointmentTime

  // Combine date and time into a single string
  const dateTimeStr = `${dateStr} ${timeStr}`

  const dateTimeStrFormatted = dateTimeStr.split(", ").slice(1).join(" ")

  // Create a new Dayjs object from the string
  const dateTime = dayjs(dateTimeStrFormatted)

  // Format the Dayjs object into MySQL DATETIME format
  const mysqlDateTime = dateTime.format("YYYY-MM-DD HH:mm:ss")

  const sql2 = `INSERT INTO ${Appointments}
      (appointment_date, appointment_price, appointment_timespan, patient_message, Doctor_confirmation_status, Service_and_category_list_ID, pet_info_ID, Doctor_ID, Addresses_ID, Created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  const values2 = [mysqlDateTime, AppointmentObject.appointmentPrice, AppointmentObject.appointmentTimespan, AppointmentObject.message, AppointmentObject.InstantBook, AppointmentObject.Service_and_category_list_ID, AppointmentObject.selectedPetID, DoctorID, AppointmentObject.AddressesID, createdAt]

  await DB_Operation(makeAppointment.name, Appointments)
  try {
    await connection.execute(sql2, values2)
    return res.status(200).json()
  } catch (error) {
    return res.status(500).json(error)
  }
}

/** getDoctorCalendarDetails retreives a certain Doctor's calendar details
 *  First, converts the DoctorUUID to the DoctorID
 *  Then, performs a bunch of joins, and retreieves all the appointments and appointment data for that Doctor (service, time, address, etc.)
 * @param {*} req Cookies
 * @param {status} res Results, 200/400 status code
 * @returns Doctor's Calendar Details
 *  DOCUMENTATION LAST UPDATED 6/4/23
 */
export async function getDoctorCalendarDetails(req, res) {
  const DoctorUUID = req.cookies.DoctorUUID
  let DoctorID

  try {
    DoctorID = await UUID_to_ID(DoctorUUID)
  } catch (error) {
    clearCookies(res, "Doctor")
    return res.status(401).json({ shouldRedirect: true, redirectURL: "/vet-login" })
  }

  const [Appointments, service_and_category_list, addresses, basic_user_info, pet_info] =
    ["Appointments", "service_and_category_list", "addresses", "basic_user_info", "pet_info"]

  const sql = `SELECT
        ${Appointments}.AppointmentsID, ${Appointments}.appointment_date, ${Appointments}.appointment_price, ${Appointments}.appointment_timespan, ${Appointments}.patient_message, ${Appointments}.Doctor_confirmation_status, ${Appointments}.Created_at,
        ${service_and_category_list}.Category_name, ${service_and_category_list}.Service_name,
        ${addresses}.address_title, ${addresses}.address_line_1, ${addresses}.address_line_2, ${addresses}.city, ${addresses}.state, ${addresses}.zip, ${addresses}.country,
        ${basic_user_info}.FirstName AS Patient_FirstName, ${basic_user_info}.LastName AS Patient_LastName,
        ${pet_info}.Name AS Pet_Name
      FROM ${Appointments}
        INNER JOIN ${service_and_category_list} ON ${Appointments}.${service_and_category_list}_ID = ${service_and_category_list}.${service_and_category_list}ID
        INNER JOIN ${addresses} ON ${Appointments}.${addresses}_ID = ${addresses}.${addresses}ID AND ${addresses}.Doctor_ID = ${Appointments}.Doctor_ID
        INNER JOIN ${pet_info} ON ${Appointments}.pet_info_ID = ${pet_info}.pet_infoID
        INNER JOIN ${basic_user_info} ON ${pet_info}.Patient_ID = ${basic_user_info}.User_ID
      WHERE
        ${Appointments}.Doctor_ID = ?`

  const values = [DoctorID]
  await DB_Operation(getDoctorCalendarDetails.name, Appointments)

  try {
    const [results] = await connection.execute(sql, values)
    return res.status(200).json(results)
  } catch (error) {
    return res.status(400).json([])
  }
}
