import { Request, Response, NextFunction } from "express"

export default function validateSavePetProcedureDataRequestBody (req: Request, res: Response, next: NextFunction): void | Response {
	if (!req.body || typeof req.body !== "object") {
		return res.status(400).json({ error: "Bad Request: Missing or invalid body" })
	}
	const { petProcedure } = req.body as { petProcedure?: PetProcedure }

	if (!petProcedure || typeof petProcedure !== "object") {
		return res.status(400).json({ error: "Bad Request: Missing or Pet Procedure Data" })
	}

	next()
}
