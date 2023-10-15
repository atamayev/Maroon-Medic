import { Request, Response, NextFunction } from "express"

export default function validateChangePasswordRequest(req: Request, res: Response, next: NextFunction): void | Response {
	const { changePasswordObject } = req.body as { changePasswordObject?: ChangePasswordObject }
	const UUID = req.headers.uuid as string

	if (!changePasswordObject || !UUID) {
		return res.status(400).json({ error: "Missing required fields" })
	}

	if (!changePasswordObject.currentPassword || !changePasswordObject.newPassword) {
		return res.status(400).json({ error: "Incomplete changePasswordObject" })
	}

	next()
}
