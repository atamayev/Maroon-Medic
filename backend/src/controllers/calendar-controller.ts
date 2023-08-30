import { Request, Response } from "express"
import TimeUtils from "../utils/time"
import CalendarDB from "../db/calendar-db"
import OperationHandler from "../utils/operation-handler"

export async function makeAppointment(req: Request, res: Response): Promise<void> {
	const appointmentObject = req.body.AppointmentObject
	const patientId = req.patientId
	const NVI = appointmentObject.NVI

	const doctorId: number = Number(await OperationHandler.executeAsyncAndReturnValue(res, CalendarDB.retrieveDoctorIdFromNVI, NVI))

	const createdAt = TimeUtils.createFormattedDate()

	const mysqlDateTime = TimeUtils.convertAppointmentDateTimeIntoMySQLDate(
		appointmentObject.appointmentDate,
		appointmentObject.appointmentTime
	)
	const operation: () => Promise<void> = async () => await CalendarDB.addAppointment(
		mysqlDateTime, appointmentObject, doctorId, patientId, createdAt
	)
	await OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}

export async function getDoctorCalendarDetails(req: Request, res: Response): Promise<void> {
	const doctorId = req.doctorId
	const operation: () => Promise<CalendarData[]> = async () => {
		return await CalendarDB.retrieveDoctorCalendarDetails(doctorId)
	}
	await OperationHandler.executeAsyncAndReturnValueToRes(res, operation, [])
}

export async function confirmAppointment (req: Request, res: Response): Promise<void> {
	const appointmentId = req.body.appointmentId

	const operation: () => Promise<void> = async () => await CalendarDB.confirmAppointmentStatus(appointmentId)
	await OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}
