import _ from "lodash"
import { Request, Response, NextFunction } from "express"
import AuthDB from "../db/auth-db"
import Cookie from "../utils/cookie-operations"
import { extractAccessToken, getDecodedUUID } from "../utils/auth-helpers"

export default async function jwtVerify(req: Request, res: Response, next: NextFunction): Promise<void| Response> {
	const userType = req.headers["user-type"] as DoctorOrPatientOrUndefined

	if (!userType  || _.isUndefined(userType)) {
		Cookie.clearAll(res)
		return res.status(401).json({ shouldRedirect: true, redirectURL: "/" })
	}

	const accessToken = extractAccessToken(req)

	if (_.isUndefined(accessToken)) {
		Cookie.clearAll(res)
		return res.status(401).json({ shouldRedirect: true, redirectURL: "/" })
	}

	const handleKnownUserTypeUnauthorized = (): Response => {
		const redirectURL = userType === "Doctor" ? "/vet-login" : "/patient-login"
		Cookie.clearAll(res)
		return res.status(401).json({ shouldRedirect: true, redirectURL: redirectURL })
	}

	try {
		const UUID = getDecodedUUID(userType, accessToken)
		const doesRecordExist = await AuthDB.checkIfUUIDExists(UUID)

		if (doesRecordExist) {
			req.headers.uuid = UUID
			next()
			return
		}
	} catch (error: unknown) {
		handleKnownUserTypeUnauthorized()
		console.log("Error in JWT Verify", error)
	}
	handleKnownUserTypeUnauthorized()
}
