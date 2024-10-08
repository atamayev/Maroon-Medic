import { Request, Response } from "express"
import TimeUtils from "../utils/time"
import CalendarDB from "../db/calendar-db"
import OperationHandler from "../utils/operation-handler"
import convertInstantBook from "../utils/convert-instant-book"

export async function makeAppointment(req: Request, res: Response): Promise<Response | void> {
	const appointmentObject = req.body.appointmentObject as AppointmentObject
	const patientId = req.patientId
	const NVI = appointmentObject.nvi

	const doctorId: number = Number(
		await OperationHandler.executeAsyncAndReturnValue(res, CalendarDB.retrieveDoctorIdFromNVI, NVI)
	)

	const nonExistentDoctorId = 0
	if (doctorId === nonExistentDoctorId) return res.status(400).json({ error: "Doctor does not exist" })

	const mysqlDateTime = TimeUtils.convertAppointmentDateTimeIntoMySQLDate(
		appointmentObject.appointmentDate,
		appointmentObject.appointmentTime
	)

	const appointmentStatus = convertInstantBook(appointmentObject)

	const operation: () => Promise<void> = async () => await CalendarDB.addAppointment(
		mysqlDateTime, appointmentObject, appointmentStatus, doctorId, patientId
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

export async function confirmAppointment (req: Request, res: Response): Promise<void | Response> {
	const doctorId = req.doctorId
	const appointmentId = Number(req.params.appointmentId)
	if (isNaN(appointmentId)) return res.status(400).json({ error: "Invalid appointmentId" })

	const operation: () => Promise<void> = async () => await CalendarDB.confirmAppointmentStatus(appointmentId, doctorId)
	await OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}

export async function denyAppointment (req: Request, res: Response): Promise<void | Response> {
	const doctorId = req.doctorId
	const appointmentId = Number(req.params.appointmentId)
	if (isNaN(appointmentId)) return res.status(400).json({ error: "Invalid appointmentId" })

	const operation: () => Promise<void> = async () => await CalendarDB.denyAppointmentStatus(appointmentId, doctorId)
	await OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}
