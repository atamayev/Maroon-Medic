import _ from "lodash"
import { Request, Response, NextFunction } from "express"

export default function validateNewUserConfirmationRequest(
	req: Request,
	res: Response,
	next: NextFunction,
): void | Response {
	const UUID = req.headers.uuid as string
	if (!UUID) {
		return res.status(400).json({ error: "UUID is required in headers" })
	}

	const userType = req.headers["user-type"] as DoctorOrPatient
	if (!userType) {
		return res.status(400).json({ error: "Invalid or missing user-type in headers" })
	}

	const accessToken = req.headers.authorization

	if (_.isUndefined(accessToken)) {
		return res.status(400).json({ error: "Access token is required" })
	}

	req.accessToken = accessToken

	next()
}
