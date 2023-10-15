import { Request, Response, NextFunction } from "express"

export default function validateUUIDInHeader(req: Request, res: Response, next: NextFunction): void | Response {
	const { uuid } = req.headers as { uuid?: string }

	if (!uuid) {
		return res.status(400).json({ error: "Missing uuid header" })
	}

	next()
}
