import { Request, Response, NextFunction } from "express"

export default function validateNewReviewRequestBody (req: Request, res: Response, next: NextFunction): void | Response {
	if (!req.body || typeof req.body !== "object") {
		return res.status(400).json({ error: "Bad Request: Missing or invalid body" })
	}

	const { newReviewObject } = req.body as { newReviewObject?: NewReview }

	if (!newReviewObject || typeof newReviewObject !== "object") {
		return res.status(400).json({ error: "Bad Request: Missing or invalid Review Object" })
	}

	next()
}
