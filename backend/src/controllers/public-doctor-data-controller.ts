import CalendarDB from "../db/calendar-db"
import OperationHandler from "../utils/operation-handler"
import FetchPublicDoctorData from "../utils/fetch-account-and-public-data/fetch-public-doctor-data"
import FetchDoctorAccountData from "../utils/fetch-account-and-public-data/fetch-doctor-account-data"
import { Request, Response } from "express"

export async function returnDoctorPageData (req: Request, res: Response): Promise<Response> {
	const NVI = Number(req.params.NVI)
	const doctorId: number = Number(await OperationHandler.executeAsyncAndReturnValue(res, CalendarDB.retrieveDoctorIdFromNVI, NVI))

	try {
		const response: PublicDoctorAccountDetails = {
			doctorLanguages:       await FetchPublicDoctorData.languages(doctorId),
			doctorServices:        await FetchDoctorAccountData.services(doctorId),
			doctorSpecialties:     await FetchPublicDoctorData.specialties(doctorId),
			doctorPreVetEducation: await FetchPublicDoctorData.preVetEducation(doctorId),
			doctorVetEducation:    await FetchPublicDoctorData.vetEducation(doctorId),
			doctorAddressData:     await FetchPublicDoctorData.addresses(doctorId),
			description:           await FetchDoctorAccountData.description(doctorId),
			servicedPets:          await FetchPublicDoctorData.servicedPets(doctorId),
			doctorPersonalInfo:    await FetchPublicDoctorData.personalInfo(doctorId)
		}
		response.doctorPersonalInfo.NVI = NVI
		return res.status(200).json(response)
	} catch (error: unknown) {
		return res.status(400).json([])
	}
}
