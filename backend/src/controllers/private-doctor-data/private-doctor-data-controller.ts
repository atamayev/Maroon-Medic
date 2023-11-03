import _ from "lodash"
import { Request, Response } from "express"
import TimeUtils from "../../utils/time"
import Format from "../../utils/data-formatter"
import OperationHandler from "../../utils/operation-handler"
import PrivateDoctorDataDB from "../../db/private-doctor-data/private-doctor-data-db"
import FetchDoctorAccountData from "../../utils/fetch-account-and-public-data/fetch-doctor-account-data"

export async function newDoctor (req: Request, res: Response): Promise<void> {
	const doctorId = req.doctorId

	const newDoctorObject = req.body.newDoctorObject as FormattedPersonalData

	const operation: () => Promise<void> = async () => await PrivateDoctorDataDB.addNewDoctorInfo(newDoctorObject, doctorId)
	await OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}

export async function fetchDashboardData (req: Request, res: Response): Promise<Response> {
	const doctorId = req.doctorId

	try {
		const dashboardData = await PrivateDoctorDataDB.retrieveDoctorDashboard(doctorId)
		for (const singleAppointment of dashboardData) {
			singleAppointment.appointmentDate = TimeUtils.convertMySQLDateIntoReadableString(singleAppointment.appointmentDate)
			singleAppointment.createdAt = TimeUtils.convertMySQLDateIntoReadableString(singleAppointment.createdAt)
		}
		return res.status(200).json(dashboardData)
	} catch (error: unknown) {
		console.log(error)
		return res.status(500).json([])
	}
}

export async function fetchPersonalData (req: Request, res: Response): Promise<Response> {
	const doctorId = req.doctorId

	let personalData = {
		firstName: "",
		lastName: "",
		gender: "",
		dateOfBirth: "",
	}

	try {
		const unformattedPersonaData = await PrivateDoctorDataDB.retrievePersonalDoctorData(doctorId)
		if (_.isEmpty(unformattedPersonaData)) return res.status(200).json(personalData)
		else {
			personalData = Format.personalData(unformattedPersonaData)
			return res.status(200).json(personalData)
		}
	} catch (error: unknown) {
		return res.status(500).json(personalData)
	}
}

export async function fetchAccountDetails (req: Request, res: Response): Promise<Response> {
	const doctorId = req.doctorId

	let response: DoctorAccountDetails = {
		languages            : [],
		services             : [],
		specialties          : [],
		preVetEducation      : [],
		vetEducation         : [],
		addressData          : [],
		description          : "",
		servicedPets         : [],
		verified             : false,
		publiclyAvailable    : false
	}

	try {
		const verificationAndPublicAv = await FetchDoctorAccountData.verifiedAndPubliclyAvailable(doctorId)
		response = {
			languages            : await FetchDoctorAccountData.languages(doctorId),
			services             : await FetchDoctorAccountData.services(doctorId),
			specialties          : await FetchDoctorAccountData.specialties(doctorId),
			preVetEducation      : await FetchDoctorAccountData.preVetEducation(doctorId),
			vetEducation         : await FetchDoctorAccountData.vetEducation(doctorId),
			addressData          : await FetchDoctorAccountData.addresses(doctorId),
			description          : await FetchDoctorAccountData.description(doctorId),
			servicedPets         : await FetchDoctorAccountData.servicedPets(doctorId),
			verified             : verificationAndPublicAv.verified,
			publiclyAvailable    : verificationAndPublicAv.publiclyAvailable
		}
		return res.status(200).json(response)
	} catch (error: unknown) {
		return res.status(400).json(response)
	}
}
