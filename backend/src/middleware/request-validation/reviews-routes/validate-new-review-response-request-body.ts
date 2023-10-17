import { Request, Response, NextFunction } from "express"

export default function validateNewReviewResponseRequestBody (req: Request, res: Response, next: NextFunction): void | Response {
	if (!req.body || typeof req.body !== "object") {
		return res.status(400).json({ error: "Bad Request: Missing or invalid body" })
	}

	const { newDoctorReviewResponse } = req.body as { newDoctorReviewResponse?: DoctorReviewResponse }

	if (!newDoctorReviewResponse || typeof newDoctorReviewResponse !== "object") {
		return res.status(400).json({ error: "Bad Request: Missing or invalid Doctor Review ResponseObject" })
	}

	next()
}
