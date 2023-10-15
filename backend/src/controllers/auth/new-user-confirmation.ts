import { Response, Request } from "express"
import AuthDB from "../../db/auth-db"
import { getDecodedNewUser } from "../../utils/auth-helpers"

export async function newDoctorConfirmation (req: Request, res: Response): Promise<void> {
	await newUserConfirmation(req, res, "Doctor")
}

export async function newPatientConfirmation (req: Request, res: Response): Promise<void> {
	await newUserConfirmation(req, res, "Patient")
}

async function newUserConfirmation (req: Request, res: Response, doctorOrPatient: DoctorOrPatient): Promise<Response> {
	const permission = false
	const UUID = req.headers.uuid as string
	const userType = req.headers["user-type"] as DoctorOrPatient

	if (userType !== doctorOrPatient) {
		return res.status(400).json({ error: "Invalid or missing user-type in headers" })
	}

	const accessToken = req.accessToken as string

	const isNewUser = getDecodedNewUser(doctorOrPatient, accessToken)

	if (!isNewUser) return res.status(400).json(permission)

	try {
		const doBothUUIDExist = await AuthDB.checkIfUUIDExists(UUID)
		return res.status(200).json(doBothUUIDExist)
	} catch (error: unknown) {
		return res.status(400).json(permission)
	}
}
