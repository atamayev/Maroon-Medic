import { Response, Request } from "express"
import AuthDB from "../../db/auth-db"

export async function newDoctorConfirmation (req: Request, res: Response): Promise<Response> {
	const doctorPermission = false
	const userType = req.headers["user-type"] as DoctorOrPatient
	const isNewDoctor = req.headers["new-user"] as unknown as boolean
	const doctorUUID = req.headers.uuid as string

	if (!isNewDoctor || !doctorUUID || userType !== "Doctor") {
		return res.status(400).json(doctorPermission)
	}

	try {
		const doBothUUIDExist = await AuthDB.checkIfUUIDsExist(doctorUUID)
		return res.status(200).json(doBothUUIDExist)
	} catch (error: unknown) {
		return res.status(400).json(doctorPermission)
	}
}

export async function newPatientConfirmation (req: Request, res: Response): Promise<Response> {
	const patientPermission = false
	const userType = req.headers["user-type"] as DoctorOrPatient
	const isNewPatient = req.headers["new-user"] as unknown as boolean
	const patientUUID = req.headers.uuid as string

	if (!isNewPatient || !patientUUID || userType !== "Patient") {
		return res.status(400).json(patientPermission)
	}

	try {
		const doBothUUIDExist = await AuthDB.checkIfUUIDsExist(patientUUID)
		return res.status(200).json(doBothUUIDExist)
	} catch (error: unknown) {
		return res.status(400).json(patientPermission)
	}
}
