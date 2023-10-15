import { Request, Response, NextFunction } from "express"

export default function validateNewDoctorDataRequestBody (req: Request, res: Response, next: NextFunction): void | Response {
	if (!req.body || typeof req.body !== "object") {
		return res.status(400).json({ error: "Bad Request: Missing or invalid body" })
	}
	const { newDoctorObject } = req.body as { newDoctorObject?: FormattedPersonalData }

	if (!newDoctorObject || typeof newDoctorObject !== "object") {
		return res.status(400).json({ error: "Bad Request: Missing or DoctorInformation" })
	}

	next()
}
