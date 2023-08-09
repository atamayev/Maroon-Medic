import CalendarDB from "../db/calendar-DB"
import OperationHandler from "../utils/operation-handler"
import FetchPublicDoctorData from "../utils/fetch-account-and-public-data/fetch-public-doctor-data"
import FetchDoctorAccountData from "../utils/fetch-account-and-public-data/fetch-doctor-account-data"
import { Request, Response } from "express"

export async function returnDoctorPageData (req: Request, res: Response): Promise<Response> {
  const NVI = Number(req.params.id)
  const DoctorID: number = Number(await OperationHandler.executeAsyncAndReturnValue(res, CalendarDB.retrieveDoctorIDFromNVI, NVI))

  try {
    const response: PublicDoctorAccountDetails = {
      doctorLanguages:       await FetchPublicDoctorData.fetchDoctorLanguages(DoctorID),
      doctorServices:        await FetchDoctorAccountData.fetchDoctorServices(DoctorID),
      doctorSpecialties:     await FetchPublicDoctorData.fetchDoctorSpecialties(DoctorID),
      doctorPreVetEducation: await FetchPublicDoctorData.fetchPreVetEducation(DoctorID),
      doctorVetEducation:    await FetchPublicDoctorData.fetchVetEducation(DoctorID),
      doctorAddressData:     await FetchPublicDoctorData.fetchDoctorAddressData(DoctorID),
      description:           await FetchDoctorAccountData.fetchDescriptionData(DoctorID),
      servicedPets:          await FetchPublicDoctorData.fetchServicedPets(DoctorID),
      doctorPersonalInfo:    await FetchPublicDoctorData.fetchDoctorPersonalInfo(DoctorID)
    }
    response.doctorPersonalInfo.NVI = NVI
    return res.status(200).json(response)
  } catch (error: unknown) {
    return res.status(400).json([])
  }
}
