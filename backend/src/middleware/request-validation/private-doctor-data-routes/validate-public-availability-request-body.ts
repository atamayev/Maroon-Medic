import { Request, Response, NextFunction } from "express"

export default function validatePublicAvailabilityRequestBody (req: Request, res: Response, next: NextFunction): void | Response {
	if (!req.body || typeof req.body !== "object") {
		return res.status(400).json({ error: "Bad Request: Missing or invalid body" })
	}

	const { publicAvailibility } = req.body as { publicAvailibility?: boolean }

	if (typeof publicAvailibility !== "boolean") {
		return res.status(400).json({ error: "Bad Request: Missing or invalid Public Availability" })
	}

	next()
}
