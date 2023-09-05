import { Response, Request } from "express"
import AuthDB from "../../db/auth-db"
import { extractAccessToken, getDecodedNewUser } from "../../utils/auth-helpers"

export async function newDoctorConfirmation (req: Request, res: Response): Promise<Response> {
	const doctorPermission = false
	const userType = req.headers["user-type"] as DoctorOrPatient
	const doctorUUID = req.headers.uuid as string

	const accessToken = extractAccessToken(req)
	if (!accessToken) return res.status(400).json(doctorPermission)

	const isNewUser = getDecodedNewUser("Doctor", accessToken)

	if (!isNewUser || !doctorUUID || userType !== "Doctor") {
		return res.status(400).json(doctorPermission)
	}

	try {
		const doBothUUIDExist = await AuthDB.checkIfUUIDExists(doctorUUID)
		return res.status(200).json(doBothUUIDExist)
	} catch (error: unknown) {
		return res.status(400).json(doctorPermission)
	}
}

export async function newPatientConfirmation (req: Request, res: Response): Promise<Response> {
	const patientPermission = false
	const userType = req.headers["user-type"] as DoctorOrPatient
	const patientUUID = req.headers.uuid as string

	const accessToken = extractAccessToken(req)
	if (!accessToken) return res.status(400).json(patientPermission)

	const isNewUser = getDecodedNewUser("Patient", accessToken)

	if (!isNewUser || !patientUUID || userType !== "Patient") {
		return res.status(400).json(patientPermission)
	}

	try {
		const doBothUUIDExist = await AuthDB.checkIfUUIDExists(patientUUID)
		return res.status(200).json(doBothUUIDExist)
	} catch (error: unknown) {
		return res.status(400).json(patientPermission)
	}
}
