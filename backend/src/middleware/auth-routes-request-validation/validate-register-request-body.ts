import { Request, Response, NextFunction } from "express"

export default function validateRegisterRequestBody (req: Request, res: Response, next: NextFunction): void| Response {
	if (!req.body || typeof req.body !== "object") {
		return res.status(400).json({ error: "Bad Request: Missing or invalid body" })
	}

	const loginInfo = req.body.registerInformationObject
	if (!loginInfo || typeof loginInfo !== "object") {
		return res.status(400).json({ error: "Bad Request: Missing or invalid registerInformationObject" })
	}

	const { email, password, loginType } = loginInfo
	if (!email || !password || !loginType) {
		return res.status(400).json({ error: "Bad Request: Missing required fields" })
	}

	next()
}
