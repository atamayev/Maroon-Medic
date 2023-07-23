import CalendarDB from "../db/calendar-DB.js"
import OperationHandler from "../utils/operation-handler.js"
import FetchPublicDoctorData from "../utils/fetch-account-and-public-data/fetch-public-doctor-data.js"
import FetchDoctorAccountData from "../utils/fetch-account-and-public-data/fetch-doctor-account-data.js"
import { Request, Response } from "express"

interface DoctorPersonalInfo {
  [key: string]: any
}

interface DoctorResponse {
  doctorLanguages: any[]
  doctorServices: any[]
  doctorSpecialties: any[]
  doctorPreVetEducation: any[]
  doctorVetEducation: any[]
  doctorAddressData: any[]
  description: string
  servicedPets: any[]
  doctorPersonalInfo: DoctorPersonalInfo
}

export async function returnDoctorPageData (req: Request, res: Response) {
  const NVI = req.params.id
  const DoctorID = await OperationHandler.executeAsyncAndReturnValue(res, CalendarDB.retrieveDoctorIDFromNVI, NVI)

  try {
    const response: DoctorResponse = {
      doctorLanguages: await FetchPublicDoctorData.fetchDoctorLanguages(DoctorID),
      doctorServices: await FetchDoctorAccountData.fetchDoctorServices(DoctorID),
      doctorSpecialties: await FetchPublicDoctorData.fetchDoctorSpecialties(DoctorID),
      doctorPreVetEducation: await FetchPublicDoctorData.fetchPreVetEducation(DoctorID),
      doctorVetEducation: await FetchPublicDoctorData.fetchVetEducation(DoctorID),
      doctorAddressData: await FetchPublicDoctorData.fetchDoctorAddressData(DoctorID),
      description: await FetchDoctorAccountData.fetchDescriptionData(DoctorID),
      servicedPets: await FetchPublicDoctorData.fetchServicedPets(DoctorID),
      doctorPersonalInfo: await FetchPublicDoctorData.fetchDoctorPersonalInfo(DoctorID)
    }
    response.doctorPersonalInfo["NVI"] = NVI;
    return res.status(200).json(response)
  } catch (error) {
    return res.status(400).json([])
  }
}
