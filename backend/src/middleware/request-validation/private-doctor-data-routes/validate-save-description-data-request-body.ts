import { Request, Response, NextFunction } from "express"

export default function validateSaveDescriptionDataRequestBody (req: Request, res: Response, next: NextFunction): void | Response {
	if (!req.body || typeof req.body !== "object") {
		return res.status(400).json({ error: "Bad Request: Missing or invalid body" })
	}

	const { description } = req.body as { description?: string }

	if (typeof description !== "string") {
		return res.status(400).json({ error: "Bad Request: Missing or invalid Description" })
	}

	next()
}
