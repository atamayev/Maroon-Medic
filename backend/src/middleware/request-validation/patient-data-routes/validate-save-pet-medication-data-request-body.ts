import { Request, Response, NextFunction } from "express"

export default function validateSavePetMedicationDataRequestBody (req: Request, res: Response, next: NextFunction): void | Response {
	if (!req.body || typeof req.body !== "object") {
		return res.status(400).json({ error: "Bad Request: Missing or invalid body" })
	}
	const { petMedication } = req.body as { petMedication?: PetMedication }

	if (!petMedication || typeof petMedication !== "object") {
		return res.status(400).json({ error: "Bad Request: Missing or Pet Data" })
	}

	next()
}
