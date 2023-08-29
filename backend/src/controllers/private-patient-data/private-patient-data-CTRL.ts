import _ from "lodash"
import { Response, Request } from "express"
import TimeUtils from "../../utils/time"
import Format from "../../utils/data-formatter"
import OperationHandler from "../../utils/operation-handler"
import PrivatePatientDataDB from "../../db/private-patient-data/private-patient-data-DB"
import FetchPatientAccountData from "../../utils/fetch-account-and-public-data/fetch-patient-account-data"

export async function newPatient (req: Request, res: Response): Promise<void> {
	const patientId = req.patientId

	const newPatientObject = req.body.newPatientObject

	const dateOfBirth = TimeUtils.convertDOBStringIntoMySQLDate(
		newPatientObject.birthMonth,
		newPatientObject.birthDay,
		newPatientObject.birthYear
	)
	const operation: () => Promise<void> = async () => await PrivatePatientDataDB.addNewPatientInfo(
		newPatientObject, dateOfBirth, patientId
	)
	await OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}

export async function fetchDashboardData (req: Request, res: Response): Promise<Response> {
	const patientId = req.patientId

	try {
		const DashboardData = await PrivatePatientDataDB.retrievePatientDashboard(patientId)
		for (const singleAppointment of DashboardData) {
			singleAppointment.appointmentDate = TimeUtils.convertMySQLDateIntoReadableString(singleAppointment.appointmentDate)
			singleAppointment.createdAt = TimeUtils.convertMySQLDateIntoReadableString(singleAppointment.createdAt)
		}
		return res.status(200).json(DashboardData)
	} catch (error: unknown) {
		return res.status(400).json([])
	}
}

export async function fetchPersonalData (req: Request, res: Response): Promise<Response> {
	const patientId = req.patientId

	let PersonalData = {
		firstName: "",
		lastName: "",
		gender: "",
		birthMonth: "",
		birthDay: -1,
		birthYear: -1
	}

	try {
		const unformattedPersonaData = await PrivatePatientDataDB.retrievePersonalPatientData(patientId)
		if (_.isEmpty(unformattedPersonaData)) return res.status(200).json(PersonalData)
		else {
			PersonalData = Format.personalData(unformattedPersonaData)
			return res.status(200).json(PersonalData)
		}
	} catch (error: unknown) {
		return res.status(400).json(PersonalData)
	}
}

export async function pets (req: Request, res: Response): Promise<void> {
	const patientId = req.patientId
	const operation: () => Promise<CompletePetInfo[]> = async () => {
		return await FetchPatientAccountData.pets(patientId)
	}
	await OperationHandler.executeAsyncAndReturnValueToRes(res, operation, [])
}

export async function fetchAccountDetails (req: Request, res: Response): Promise<Response> {
	const patientId = req.patientId
	try {
		const response: PatientAccountDetails = {
			languages: await FetchPatientAccountData.languages(patientId)
		}
		return res.status(200).json(response)
	} catch (error: unknown) {
		return res.status(400).json([])
	}
}
