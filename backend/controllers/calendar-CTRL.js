import TimeUtils from "../utils/time.js"
import CalendarDB from "../db/calendar-DB.js"
import { UUID_to_ID } from "../setup-and-security/UUID.js"
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

  let DoctorID

  try {
    DoctorID = await CalendarDB.retrieveDoctorIDFromNVI(NVI)
  } catch (error) {
    return res.status(500).json(error)
  }

  const createdAt = TimeUtils.createFormattedDate()

  const mysqlDateTime = TimeUtils.convertAppointmentDateTimeIntoMySQLDate(AppointmentObject.appointmentDate, AppointmentObject.appointmentTime)

  try {
    await CalendarDB.createAppointment(mysqlDateTime, AppointmentObject, DoctorID, createdAt)
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

  try {
    const calendarDetails = await CalendarDB.retrieveDoctorCalendarDetails(DoctorID)
    return res.status(200).json(calendarDetails)
  } catch (error) {
    return res.status(400).json([])
  }
}
