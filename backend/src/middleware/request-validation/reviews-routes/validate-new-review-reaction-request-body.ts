import { Request, Response, NextFunction } from "express"

export default function validateNewReviewReactionRequestBody (req: Request, res: Response, next: NextFunction): void | Response {
	if (!req.body || typeof req.body !== "object") {
		return res.status(400).json({ error: "Bad Request: Missing or invalid body" })
	}

	const { newReviewReaction } = req.body as { newReviewReaction?: NewReviewReaction }

	if (!newReviewReaction || typeof newReviewReaction !== "object") {
		return res.status(400).json({ error: "Bad Request: Missing or invalid New Review Reaction" })
	}

	next()
}
