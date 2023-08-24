import { Response, Request } from "express"
import AuthDB from "../../db/auth-DB"
import Cookie from "../../utils/cookie-operations"
import { UUID_to_ID } from "../../setup-and-security/UUID"

export default async function fetchLoginHistory (req: Request, res: Response): Promise<Response> {
	const cookies = req.cookies
	let UUID: string = ""
	let userType: DoctorOrPatient = "Patient"

	if ("DoctorUUID" in cookies || "DoctorAccessToken" in cookies) {
		UUID = cookies.DoctorUUID
		userType = "Doctor"
	} else if ("PatientUUID" in cookies || "PatientAccessToken" in cookies) {
		UUID = cookies.PatientUUID
		userType = "Patient"
	}

	try {
		const User_ID = await UUID_to_ID(UUID)
		const loginHistoryRecords = await AuthDB.retrieveLoginHistory(User_ID)
		return res.status(200).json(loginHistoryRecords)
	} catch (error: unknown) {
		Cookie.clearAll(res, userType)
		return res.status(401).json({ shouldRedirect: true, redirectURL: "/" })
	}
}

