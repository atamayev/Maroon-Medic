import _ from "lodash"
import { Response, Request } from "express"
import TimeUtils from "../../utils/time"
import Format from "../../utils/data-formatter"
import OperationHandler from "../../utils/operation-handler"
import PrivatePatientDataDB from "../../db/private-patient-data/private-patient-data-db"
import FetchPatientAccountData from "../../utils/fetch-account-and-public-data/fetch-patient-account-data"

export async function newPatient (req: Request, res: Response): Promise<void> {
	const patientId = req.patientId
	const newPatientObject = req.body.newPatientObject as FormattedPersonalData

	const operation: () => Promise<void> = async () => await PrivatePatientDataDB.addNewPatientInfo(newPatientObject, patientId)
	await OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}

export async function fetchDashboardData (req: Request, res: Response): Promise<Response> {
	const patientId = req.patientId

	try {
		const dashboardData = await PrivatePatientDataDB.retrievePatientDashboard(patientId)
		for (const singleAppointment of dashboardData) {
			singleAppointment.appointmentDate = TimeUtils.convertMySQLDateIntoReadableString(singleAppointment.appointmentDate)
			singleAppointment.createdAt = TimeUtils.convertMySQLDateIntoReadableString(singleAppointment.createdAt)
		}
		return res.status(200).json(dashboardData)
	} catch (error: unknown) {
		return res.status(400).json([])
	}
}

export async function fetchPersonalData (req: Request, res: Response): Promise<Response> {
	const patientId = req.patientId

	let personalData = {
		firstName: "",
		lastName: "",
		gender: "",
		dateOfBirth: "",
	}

	try {
		const unformattedPersonaData = await PrivatePatientDataDB.retrievePersonalPatientData(patientId)
		if (_.isEmpty(unformattedPersonaData)) return res.status(200).json(personalData)
		else {
			personalData = Format.personalData(unformattedPersonaData)
			return res.status(200).json(personalData)
		}
	} catch (error: unknown) {
		return res.status(400).json(personalData)
	}
}

export async function fetchPetData (req: Request, res: Response): Promise<void> {
	const patientId = req.patientId
	const operation: () => Promise<CompletePetInfo[]> = async () => {
		return await FetchPatientAccountData.pets(patientId)
	}
	await OperationHandler.executeAsyncAndReturnValueToRes(res, operation, [])
}

export async function fetchAccountDetails (req: Request, res: Response): Promise<Response> {
	const patientId = req.patientId
	let response: PatientAccountDetails
	try {
		response = {
			languages: await FetchPatientAccountData.languages(patientId)
		}
		return res.status(200).json(response)
	} catch (error: unknown) {
		response = {
			languages: []
		}
		return res.status(400).json(response)
	}
}
