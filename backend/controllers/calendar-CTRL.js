import TimeUtils from "../utils/time.js"
import CalendarDB from "../db/calendar-DB.js"
import OperationHandler from "../utils/operation-handler.js"

export async function makeAppointment(req, res) {
  const AppointmentObject = req.body.AppointmentObject
  const NVI = AppointmentObject.NVI
  const DoctorID = await OperationHandler.executeAsyncAndReturnValue(res, CalendarDB.retrieveDoctorIDFromNVI, NVI)

  const createdAt = TimeUtils.createFormattedDate()

  const mysqlDateTime = TimeUtils.convertAppointmentDateTimeIntoMySQLDate(AppointmentObject.appointmentDate, AppointmentObject.appointmentTime)
  const operation = async () => await CalendarDB.addAppointment(mysqlDateTime, AppointmentObject, DoctorID, createdAt)
  OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}

export async function getDoctorCalendarDetails(req, res) {
  const DoctorID = req.DoctorID
  const operation = async () => {
    return await CalendarDB.retrieveDoctorCalendarDetails(DoctorID)
  }
  OperationHandler.executeAsyncAndReturnValueToRes(res, operation, [])
}

export async function confirmAppointment (req, res) {
  const AppointmentID = req.body.AppointmentID

  const operation = async () => await CalendarDB.confirmAppointmentStatus(AppointmentID)
  OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}
