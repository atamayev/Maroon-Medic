import CalendarDB from "../db/calendar-DB.js"
import OperationHandler from "../utils/operation-handler.js"
import FetchPublicDoctorData from "../utils/fetch-account-and-public-data/fetch-public-doctor-data.js"
import FetchDoctorAccountData from "../utils/fetch-account-and-public-data/fetch-doctor-account-data.js"
import { Request, Response } from "express"

interface DoctorResponse {
  doctorLanguages: LanguagesData[]
  doctorServices: any[]
  doctorSpecialties: SpecialtiesData[]
  doctorPreVetEducation: EducationData[]
  doctorVetEducation: EducationData[]
  doctorAddressData: AddressData[]
  description: string
  servicedPets: PetData[]
  doctorPersonalInfo: PersonalData
}

type LanguagesData = {
  Language_name: string
}

type SpecialtiesData = {
  Organization_name: string
  Specialty_name: string
}

type EducationData = {
  School_name: string
  Major_name?: string
  Education_type: string
  Start_Date: string
  End_Date: string
}

type PetData = {
  pet: number
  pet_type: string
}

type AddressData = {
  addressesID: number
  address_title: string
  address_line_1: string
  address_line_2: string
  city: string
  state: string
  zip: string
  country: string
  address_priority: number
  instant_book: boolean
  Phone: string
  phone_priority: number
  times: AvailabilityData[]
}

interface AvailabilityData {
  Day_of_week: string
  Start_time: string
  End_time: string
}

interface PersonalData {
  FirstName: string
  LastName: string
  Gender: string
  NVI?: number
}

export async function returnDoctorPageData (req: Request, res: Response) {
  const NVI: number = Number(req.params.id)
  const DoctorID = await OperationHandler.executeAsyncAndReturnValue(res, CalendarDB.retrieveDoctorIDFromNVI, NVI)

  try {
    const response: DoctorResponse = {
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
    response.doctorPersonalInfo["NVI"] = NVI;
    return res.status(200).json(response)
  } catch (error) {
    return res.status(400).json([])
  }
}
