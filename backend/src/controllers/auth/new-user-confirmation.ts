import { Response, Request } from "express"
import AuthDB from "../../db/auth-DB"

export async function newDoctorConfirmation (req: Request, res: Response): Promise<Response> {
	const doctorPermission = false
	const newDoctorUUID = req.cookies.DoctorNewUser
	const existingDoctorUUID = req.cookies.DoctorUUID

	if (!newDoctorUUID || !existingDoctorUUID) return res.status(400).json(doctorPermission)

	try {
		const doBothUUIDExist = await AuthDB.checkIfUUIDsExist(newDoctorUUID, existingDoctorUUID)
		return res.status(200).json(doBothUUIDExist)
	} catch (error: unknown) {
		return res.status(400).json(doctorPermission)
	}
}

export async function newPatientConfirmation (req: Request, res: Response): Promise<Response> {
	const patientPermission = false
	const newPatientUUID = req.cookies.PatientNewUser
	const existingPatientUUID = req.cookies.PatientUUID

	if (!newPatientUUID || !existingPatientUUID) return res.status(400).json(patientPermission)

	try {
		const doBothUUIDExist = await AuthDB.checkIfUUIDsExist(newPatientUUID, existingPatientUUID)
		return res.status(200).json(doBothUUIDExist)
	} catch (error: unknown) {
		return res.status(400).json(patientPermission)
	}
}
