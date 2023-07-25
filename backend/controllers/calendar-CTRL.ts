import TimeUtils from "../utils/time.ts"
import CalendarDB from "../db/calendar-DB.ts"
import OperationHandler from "../utils/operation-handler.ts"
import { Request, Response } from "express"

export async function makeAppointment(req: Request, res: Response) {
  const AppointmentObject = req.body.AppointmentObject
  const NVI = AppointmentObject.NVI
  const DoctorID: number = Number(await OperationHandler.executeAsyncAndReturnValue(res, CalendarDB.retrieveDoctorIDFromNVI, NVI))

  const createdAt = TimeUtils.createFormattedDate()

  const mysqlDateTime = TimeUtils.convertAppointmentDateTimeIntoMySQLDate(AppointmentObject.appointmentDate, AppointmentObject.appointmentTime)
  const operation = async () => await CalendarDB.addAppointment(mysqlDateTime, AppointmentObject, DoctorID, createdAt)
  OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}

export async function getDoctorCalendarDetails(req: Request, res: Response) {
  const DoctorID: number = Number(req.DoctorID)
  const operation = async () => {
    return await CalendarDB.retrieveDoctorCalendarDetails(DoctorID)
  }
  OperationHandler.executeAsyncAndReturnValueToRes(res, operation, [])
}

export async function confirmAppointment (req: Request, res: Response) {
  const AppointmentID = req.body.AppointmentID

  const operation = async () => await CalendarDB.confirmAppointmentStatus(AppointmentID)
  OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}
