import { Request, Response, NextFunction } from "express"

export default function validateNewPatientDataRequestBody (req: Request, res: Response, next: NextFunction): void | Response {
	if (!req.body || typeof req.body !== "object") {
		return res.status(400).json({ error: "Bad Request: Missing or invalid body" })
	}
	const { newPatientObject } = req.body as { newPatientObject?: FormattedPersonalData }

	if (!newPatientObject || typeof newPatientObject !== "object") {
		return res.status(400).json({ error: "Bad Request: Missing or DoctorInformation" })
	}

	next()
}
