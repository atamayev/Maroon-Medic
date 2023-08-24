import CalendarDB from "../db/calendar-DB"
import OperationHandler from "../utils/operation-handler"
import FetchPublicDoctorData from "../utils/fetch-account-and-public-data/fetch-public-doctor-data"
import FetchDoctorAccountData from "../utils/fetch-account-and-public-data/fetch-doctor-account-data"
import { Request, Response } from "express"

export async function returnDoctorPageData (req: Request, res: Response): Promise<Response> {
	const NVI = Number(req.params.NVI)
	const DoctorID: number = Number(await OperationHandler.executeAsyncAndReturnValue(res, CalendarDB.retrieveDoctorIDFromNVI, NVI))

	try {
		const response: PublicDoctorAccountDetails = {
			doctorLanguages:       await FetchPublicDoctorData.languages(DoctorID),
			doctorServices:        await FetchDoctorAccountData.services(DoctorID),
			doctorSpecialties:     await FetchPublicDoctorData.specialties(DoctorID),
			doctorPreVetEducation: await FetchPublicDoctorData.preVetEducation(DoctorID),
			doctorVetEducation:    await FetchPublicDoctorData.vetEducation(DoctorID),
			doctorAddressData:     await FetchPublicDoctorData.addresses(DoctorID),
			description:           await FetchDoctorAccountData.description(DoctorID),
			servicedPets:          await FetchPublicDoctorData.servicedPets(DoctorID),
			doctorPersonalInfo:    await FetchPublicDoctorData.personalInfo(DoctorID)
		}
		response.doctorPersonalInfo.NVI = NVI
		return res.status(200).json(response)
	} catch (error: unknown) {
		console.log(error)
		return res.status(400).json([])
	}
}
