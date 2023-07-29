import CalendarDB from "../db/calendar-DB"
import OperationHandler from "../utils/operation-handler"
import FetchPublicDoctorData from "../utils/fetch-account-and-public-data/fetch-public-doctor-data"
import FetchDoctorAccountData from "../utils/fetch-account-and-public-data/fetch-doctor-account-data"
import { Request, Response } from "express"

interface DoctorResponse {
  doctorLanguages: LanguagesData[]
  doctorServices: ServiceItemType[]
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
  times: AvailabilityDataType[]
}

interface PersonalData {
  FirstName: string
  LastName: string
  Gender: string
  NVI?: number
}

export async function returnDoctorPageData (req: Request, res: Response): Promise<Response> {
  const NVI = Number(req.params.id)
  const DoctorID: number = Number(await OperationHandler.executeAsyncAndReturnValue(res, CalendarDB.retrieveDoctorIDFromNVI, NVI))

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
    response.doctorPersonalInfo["NVI"] = NVI
    return res.status(200).json(response)
  } catch (error: unknown) {
    return res.status(400).json([])
  }
}
