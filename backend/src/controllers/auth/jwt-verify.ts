import _ from "lodash"
import { Response, Request } from "express"
import AuthDB from "../../db/auth-db"
import Cookie from "../../utils/cookie-operations"
import { extractAccessToken, getDecodedUUID } from "../../utils/auth-helpers"

export default async function jwtVerify(req: Request, res: Response): Promise<Response> {
	const userType = req.headers["user-type"] as DoctorOrPatient | undefined

	if (!userType) {
		Cookie.clearAll(res)
		return res.status(401).json({ shouldRedirect: true, redirectURL: "/" })
	}

	const accessToken = extractAccessToken(req)

	if (_.isUndefined(accessToken) || _.isUndefined(userType)) {
		Cookie.clearAll(res)
		return res.status(401).json({ shouldRedirect: true, redirectURL: "/" })
	}

	try {
		const decodedUUID = getDecodedUUID(userType, accessToken)
		const doesRecordExist = await AuthDB.checkIfUUIDExists(decodedUUID)

		if (doesRecordExist) {
			return res.status(200).json({ isValid: true, type: userType })
		}
	} catch (error: unknown) {
		console.log(error)
	}

	const redirectURL = userType === "Doctor" ? "/vet-login" : "/patient-login"
	Cookie.clearAll(res)
	return res.status(401).json({ shouldRedirect: true, redirectURL: redirectURL })
}
