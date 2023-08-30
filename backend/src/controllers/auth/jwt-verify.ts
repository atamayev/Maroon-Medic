import { Response, Request } from "express"
import AuthDB from "../../db/auth-db"
import Cookie from "../../utils/cookie-operations"
import { getUserType, getDecodedUUID } from "../../utils/auth-helpers"

export default async function jwtVerify(req: Request, res: Response): Promise<Response> {
	const cookies = req.cookies
	const responseType = getUserType(cookies)

	if (!responseType) {
		Cookie.clearAll(res, undefined)
		return res.status(401).json({ shouldRedirect: true, redirectURL: "/" })
	}

	try {
		const accessToken = req.cookies[`${responseType}AccessToken`]
		const decodedUUID = getDecodedUUID(responseType, accessToken)
		const doesRecordExist = await AuthDB.checkIfUUIDExists(decodedUUID)

		if (doesRecordExist) {
			return res.status(200).json({ isValid: true, type: responseType })
		}
	} catch (error: unknown) {
	// Log or handle error if needed
	}

	const redirectURL = responseType === "Doctor" ? "/vet-login" : "/patient-login"
	Cookie.clearAll(res, undefined)
	return res.status(401).json({ shouldRedirect: true, redirectURL: redirectURL })
}
