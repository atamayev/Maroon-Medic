import { Request, Response } from "express"
import CalendarDB from "../db/calendar-db"
import OperationHandler from "../utils/operation-handler"
import FetchPublicDoctorData from "../utils/fetch-account-and-public-data/fetch-public-doctor-data"
import FetchDoctorAccountData from "../utils/fetch-account-and-public-data/fetch-doctor-account-data"

// eslint-disable-next-line max-lines-per-function
export async function returnDoctorPageData (req: Request, res: Response): Promise<Response> {
	const NVI = Number(req.params.NVI)
	if (isNaN(NVI)) return res.status(400).json({ error: "Invalid NVI" })

	const doctorId = Number(await OperationHandler.executeAsyncAndReturnValue(res, CalendarDB.retrieveDoctorIdFromNVI, NVI))
	const nonExistentDoctorId = 0
	if (doctorId === nonExistentDoctorId) return res.status(400).json({ error: "Doctor does not exist" })

	let response: PublicDoctorAccountDetails
	try {
		response = {
			doctorLanguages:       await FetchPublicDoctorData.languages(doctorId),
			doctorServices:        await FetchDoctorAccountData.services(doctorId),
			doctorSpecialties:     await FetchPublicDoctorData.specialties(doctorId),
			doctorPreVetEducation: await FetchPublicDoctorData.preVetEducation(doctorId),
			doctorVetEducation:    await FetchPublicDoctorData.vetEducation(doctorId),
			doctorAddressData:     await FetchPublicDoctorData.addresses(doctorId),
			description:           await FetchDoctorAccountData.description(doctorId),
			servicedPets:          await FetchPublicDoctorData.servicedPets(doctorId),
			doctorPersonalInfo:    await FetchPublicDoctorData.personalInfo(doctorId),
			reviews: 			   await FetchPublicDoctorData.reviews(doctorId),
		}
		response.doctorPersonalInfo.nvi = NVI
		return res.status(200).json(response)
	} catch (error: unknown) {
		response = {
			doctorLanguages:       [],
			doctorServices:        [],
			doctorSpecialties:     [],
			doctorPreVetEducation: [],
			doctorVetEducation:    [],
			doctorAddressData:     [],
			description:           "",
			servicedPets:          [],
			doctorPersonalInfo:    {
				nvi: -1,
				firstName: "",
				lastName: "",
				gender: "",
			},
			reviews: [],
		}
		return res.status(400).json(response)
	}
}
