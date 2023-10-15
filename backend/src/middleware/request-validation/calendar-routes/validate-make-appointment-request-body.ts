import { Request, Response, NextFunction } from "express"

export default function validateMakeAppointmentRequestBody (req: Request, res: Response, next: NextFunction): void | Response {
	if (!req.body || typeof req.body !== "object") {
		return res.status(400).json({ error: "Bad Request: Missing or invalid body" })
	}

	const { appointmentObject } = req.body as { appointmentObject?: AppointmentObject }

	if (!appointmentObject || typeof appointmentObject !== "object") {
		return res.status(400).json({ error: "Bad Request: Missing or invalid Appointment Information" })
	}

	next()
}
