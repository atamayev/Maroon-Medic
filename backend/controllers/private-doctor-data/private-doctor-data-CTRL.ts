import _ from "lodash"
import { Request, Response } from "express"
import TimeUtils from "../../utils/time"
import DataFormatter from "../../utils/data-formatter"
import OperationHandler from "../../utils/operation-handler"
import PrivateDoctorDataDB from "../../db/private-doctor-data/private-doctor-data-DB"
import FetchDoctorAccountData from "../../utils/fetch-account-and-public-data/fetch-doctor-account-data"

type LanguageItem = {
  language_listID: number
  Language_name: string
}

type ServiceItem = {
  service_and_category_listID: number
  Category_name: string
  Service_name: string
  Service_time: string
  Service_price: number
}

type SpecialtyItem = {
  specialties_listID: number
  Organization_name: string
  Specialty_name: string
}

type EducationItem = {
  education_mappingID: number
  School_name: string
  Major_name?: string
  Education_type: string
  Start_Date: string
  End_Date: string
}

type DoctorAddressData = {
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
  address_public_status: boolean
  phones: PhoneData[]
  times: AvailabilityData[]
}

type PhoneData = {
  Phone: string
  phone_priority: number
}

interface AvailabilityData {
  Day_of_week: string
  Start_time: string
  End_time: string
}

type PetItem = {
  pet_listID: number
  Pet: string
  Pet_type: string
}

interface DoctorResponse {
  languages: LanguageItem[]
  services: ServiceItem[]
  specialties: SpecialtyItem[]
  preVetEducation: EducationItem[]
  vetEducation: EducationItem[]
  addressData: DoctorAddressData[]
  description: string
  servicedPets: PetItem[]
  verified: boolean
  publiclyAvailable: boolean
}

export async function newDoctor (req: Request, res: Response): Promise<void> {
  const DoctorID = req.DoctorID!

  const newDoctorObject = req.body.newDoctorObject

  const dateOfBirth = TimeUtils.convertDOBStringIntoMySQLDate(newDoctorObject.DOB_month, newDoctorObject.DOB_day, newDoctorObject.DOB_year)
  const operation = async () => await PrivateDoctorDataDB.addNewDoctorInfo(newDoctorObject, dateOfBirth, DoctorID)
  OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}

export async function fetchDashboardData (req: Request, res: Response): Promise<Response> {
  const DoctorID = req.DoctorID!

  try {
    const DashboardData = await PrivateDoctorDataDB.retrieveDoctorDashboard(DoctorID)
    if (_.isEmpty(DashboardData)) return res.json([])
    else {
      for (const singleAppointment of DashboardData) {
        singleAppointment.appointment_date = TimeUtils.convertMySQLDateIntoReadableString(singleAppointment.appointment_date)
        singleAppointment.Created_at = TimeUtils.convertMySQLDateIntoReadableString(singleAppointment.Created_at)
      }
      return res.json(DashboardData)
    }
  } catch (error: any) {
    return res.json([])
  }
}

export async function fetchPersonalData (req: Request, res: Response): Promise<Response> {
  const DoctorID = req.DoctorID!

  let PersonalData = {
    FirstName: "",
    LastName: "",
    Gender: "",
    DOB_month: "",
    DOB_day: 0,
    DOB_year: 0
  }

  try {
    const unformattedPersonaData = await PrivateDoctorDataDB.retrievePersonalDoctorData(DoctorID)
    if (_.isEmpty(unformattedPersonaData)) return res.json(PersonalData)
    else {
      PersonalData = DataFormatter.formatPersonalData(unformattedPersonaData)
      return res.json(PersonalData)
    }
  } catch (error: any) {
    return res.json(PersonalData)
  }
}

export async function fetchAccountDetails (req: Request, res: Response): Promise<Response> {
  const DoctorID = req.DoctorID

  try {
    const verificationAndPublicAv = await FetchDoctorAccountData.fetchVerifiedAndPubliclyAvailable(DoctorID)
    const response: DoctorResponse = {
      languages            : await FetchDoctorAccountData.fetchDoctorLanguages(DoctorID),
      services             : await FetchDoctorAccountData.fetchDoctorServices(DoctorID),
      specialties          : await FetchDoctorAccountData.fetchDoctorSpecialties(DoctorID),
      preVetEducation      : await FetchDoctorAccountData.fetchPreVetEducation(DoctorID),
      vetEducation         : await FetchDoctorAccountData.fetchVetEducation(DoctorID),
      addressData          : await FetchDoctorAccountData.fetchDoctorAddressData(DoctorID),
      description          : await FetchDoctorAccountData.fetchDescriptionData(DoctorID),
      servicedPets         : await FetchDoctorAccountData.fetchServicedPets(DoctorID),
      verified             : verificationAndPublicAv.Verified,
      publiclyAvailable    : verificationAndPublicAv.PubliclyAvailable
      // response.pictures             = await FetchDoctorAccountData.fetchDoctorPictures(DoctorID)
    }
    return res.status(200).json(response)
  } catch (error: any) {
    return res.status(400).json([])
  }
}
