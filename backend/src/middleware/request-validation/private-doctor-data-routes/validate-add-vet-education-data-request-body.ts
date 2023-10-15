import { Request, Response, NextFunction } from "express"

export default function validateAddVetEducationDataRequestBody (req: Request, res: Response, next: NextFunction): void | Response {
	if (!req.body || typeof req.body !== "object") {
		return res.status(400).json({ error: "Bad Request: Missing or invalid body" })
	}

	const { vetEducationData } = req.body as { vetEducationData?: AddEducationItem }

	if (!vetEducationData || typeof vetEducationData !== "object") {
		return res.status(400).json({ error: "Bad Request: Missing or invalid Vet Education" })
	}

	next()
}
