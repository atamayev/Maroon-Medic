import TimeUtils from "../utils/time.js"
import CalendarDB from "../db/calendar-DB.js"
import { executeAsyncOperationAndReturnCustomValueToRes, executeAsyncAndReturnValueToRes, executeAsyncAndReturnValue } from "../utils/operation-handler.js"

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
  const DoctorID = await executeAsyncAndReturnValue(CalendarDB.retrieveDoctorIDFromNVI, res, NVI)

  const createdAt = TimeUtils.createFormattedDate()

  const mysqlDateTime = TimeUtils.convertAppointmentDateTimeIntoMySQLDate(AppointmentObject.appointmentDate, AppointmentObject.appointmentTime)
  const operation = async () => await CalendarDB.addAppointment(mysqlDateTime, AppointmentObject, DoctorID, createdAt)
  executeAsyncOperationAndReturnCustomValueToRes(res, operation)
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
  const DoctorID = req.DoctorID
  const operation = async () => {
    return await CalendarDB.retrieveDoctorCalendarDetails(DoctorID)
  }
  executeAsyncAndReturnValueToRes(res, operation, [])
}

/** confirmAppointment allows for a doctor to confirm an incoming pt appointment
 *  Sets the Doctor_confirmation_status where the appointment ID is whatever is in the request
 * @param {Cookies} req Contains the appointmentID
 * @param {Array} res Status code (200: success, 400: failure)
 * @returns Status code (200, 400)
 * DOCUMENTATION LAST UPDATED 6/423
 */
export async function confirmAppointment (req, res) {
  const AppointmentID = req.body.AppointmentID

  const operation = async () => await CalendarDB.confirmAppointmentStatus(AppointmentID)
  executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}
