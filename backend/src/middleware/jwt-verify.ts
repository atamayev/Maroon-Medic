import _ from "lodash"
import { Request, Response, NextFunction } from "express"
import AuthDB from "../db/auth-db"
import Cookie from "../utils/cookie-operations"
import { getDecodedUUID } from "../utils/auth-helpers"

export default async function jwtVerify(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
	try {
		const userType = req.headers["user-type"] as DoctorOrPatientOrUndefined
		const accessToken = req.headers.authorization

		if (_.isUndefined(userType) || _.isUndefined(accessToken)) {
			return handleUnauthorized()
		}

		const UUID = getDecodedUUID(userType, accessToken)

		if (_.isUndefined(UUID)) return handleKnownUserTypeUnauthorized(userType)

		const doesRecordExist = await AuthDB.checkIfUUIDExists(UUID)

		if (doesRecordExist === false) return handleKnownUserTypeUnauthorized(userType)

		req.headers.uuid = UUID
		next()
	} catch (error: unknown) {
		console.error("Error in jwtVerify: ", error)
		return handleUnauthorized()
	}

	function handleUnauthorized(): Response {
		Cookie.clearAll(res)
		return res.status(401).json({ shouldRedirect: true, redirectURL: "/" })
	}

	function handleKnownUserTypeUnauthorized(userType: DoctorOrPatientOrUndefined): Response {
		const redirectURL = userType === "Doctor" ? "/vet-login" : "/patient-login"
		Cookie.clearAll(res)
		return res.status(401).json({ shouldRedirect: true, redirectURL })
	}
}
