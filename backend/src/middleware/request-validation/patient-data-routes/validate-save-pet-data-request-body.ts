import { Request, Response, NextFunction } from "express"

export default function validateSavePetDataRequestBody (req: Request, res: Response, next: NextFunction): void | Response {
	if (!req.body || typeof req.body !== "object") {
		return res.status(400).json({ error: "Bad Request: Missing or invalid body" })
	}

	const { petData } = req.body as { petData?: PetItemForCreationPreProcessed }

	if (!petData || typeof petData !== "object") {
		return res.status(400).json({ error: "Bad Request: Missing or Pet Data" })
	}

	next()
}
