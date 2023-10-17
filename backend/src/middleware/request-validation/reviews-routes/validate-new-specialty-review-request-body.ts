import { Request, Response, NextFunction } from "express"

export default function validateNewSpecialtyReviewResponseBody (req: Request, res: Response, next: NextFunction): void | Response {
	if (!req.body || typeof req.body !== "object") {
		return res.status(400).json({ error: "Bad Request: Missing or invalid body" })
	}

	const { newSpecialtyReview } = req.body as { newSpecialtyReview?: NewSpecialtyReview }

	if (!newSpecialtyReview || typeof newSpecialtyReview !== "object") {
		return res.status(400).json({ error: "Bad Request: Missing or invalid Doctor Review ResponseObject" })
	}

	next()
}
