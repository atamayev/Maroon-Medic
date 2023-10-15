import { Request, Response, NextFunction } from "express"

export default function validateLoginRequestBody (req: Request, res: Response, next: NextFunction): void| Response {
	if (!req.body || typeof req.body !== "object") {
		return res.status(400).json({ error: "Bad Request: Missing or invalid body" })
	}

	const { loginInformationObject } = req.body as { loginInformationObject?: LoginInformationObject }

	if (!loginInformationObject || typeof loginInformationObject !== "object") {
		return res.status(400).json({ error: "Bad Request: Missing or invalid loginInformationObject" })
	}

	const { email, password, loginType } = loginInformationObject
	if (!email || !password || !loginType) {
		return res.status(400).json({ error: "Bad Request: Missing required fields" })
	}

	next()
}
