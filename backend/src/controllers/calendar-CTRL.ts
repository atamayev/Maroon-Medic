import { Request, Response } from "express"
import TimeUtils from "../utils/time"
import CalendarDB from "../db/calendar-DB"
import OperationHandler from "../utils/operation-handler"

export async function makeAppointment(req: Request, res: Response): Promise<void> {
  const AppointmentObject = req.body.AppointmentObject
  const NVI = AppointmentObject.NVI
  const DoctorID: number = Number(await OperationHandler.executeAsyncAndReturnValue(res, CalendarDB.retrieveDoctorIDFromNVI, NVI))

  const createdAt = TimeUtils.createFormattedDate()

  const mysqlDateTime = TimeUtils.convertAppointmentDateTimeIntoMySQLDate(
    AppointmentObject.appointmentDate,
    AppointmentObject.appointmentTime
  )
  const operation: () => Promise<void> = async () => await CalendarDB.addAppointment(mysqlDateTime, AppointmentObject, DoctorID, createdAt)
  await OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}

export async function getDoctorCalendarDetails(req: Request, res: Response): Promise<void> {
  const DoctorID = req.DoctorID
  const operation: () => Promise<CalendarData[]> = async () => {
    return await CalendarDB.retrieveDoctorCalendarDetails(DoctorID)
  }
  await OperationHandler.executeAsyncAndReturnValueToRes(res, operation, [])
}

export async function confirmAppointment (req: Request, res: Response): Promise<void> {
  const AppointmentID = req.body.AppointmentID

  const operation: () => Promise<void> = async () => await CalendarDB.confirmAppointmentStatus(AppointmentID)
  await OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}
