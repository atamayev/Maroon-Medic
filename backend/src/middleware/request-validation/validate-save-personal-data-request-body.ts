import { Request, Response, NextFunction } from "express"

export default function validateSavePersonalDataRequestBody (req: Request, res: Response, next: NextFunction): void | Response {
	if (!req.body || typeof req.body !== "object") {
		return res.status(400).json({ error: "Bad Request: Missing or invalid body" })
	}

	const { personalInfo } = req.body as { personalInfo?: FormattedPersonalData }

	if (!personalInfo || typeof personalInfo !== "object") {
		return res.status(400).json({ error: "Bad Request: Missing or invalid Personal Info" })
	}

	next()
}
