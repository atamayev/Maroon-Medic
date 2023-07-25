import FetchAllLists from "../utils/fetch-all-lists"
import OperationHandler from "../utils/operation-handler"
import { Request, Response } from "express"

type LanguageListItem = {
  language_listID: number
  Language_name: string
}

type ServiceListItem = {
  service_and_category_listID: number
  Category_name: string
  Service_name: string
}

type SpecialtyListItem = {
  specialties_listID: number
  Organization_name: string
  Specialty_name: string
}

type PreVetSchoolListItem = {
  pre_vet_school_listID: number
  School_name: string
}

type MajorListItem = {
  major_listID: number
  Major_name: string
}

type PreVetEducationTypeListItem = {
  pre_vet_education_typeID: number
  Education_type: string
}

type VetSchoolListItem = {
  vet_school_listID: number
  School_name: string
}

type VetEducationTypeListItem = {
  vet_education_typeID: number
  Education_type: string
}

type PetListItem = {
  pet_listID: number
  Pet: string
  Pet_type: string
}

interface ListsResponse {
  languages: LanguageListItem[]
  servicesAndCategories: ServiceListItem[]
  specialties: SpecialtyListItem[]
  preVetSchools: PreVetSchoolListItem[]
  preVetEducationTypes: PreVetEducationTypeListItem[]
  majors: MajorListItem[]
  vetSchools: VetSchoolListItem[]
  vetEducationTypes: VetEducationTypeListItem[]
  pets: PetListItem[]
}

interface LanguagesList {
  languages: LanguageListItem[]
}

export async function fetchDoctorLists (req: Request, res: Response): Promise<Response> {
  try {
    const response: ListsResponse = {
      languages             : await FetchAllLists.fetchAllLanguages(),
      servicesAndCategories : await FetchAllLists.fetchAllServicesAndCategories(),
      specialties           : await FetchAllLists.fetchAllSpecialties(),
      preVetSchools         : await FetchAllLists.fetchAllPreVetSchools(),
      preVetEducationTypes  : await FetchAllLists.fetchAllPreVetEducationTypes(),
      majors                : await FetchAllLists.fetchAllMajors(),
      vetSchools            : await FetchAllLists.fetchAllVetSchools(),
      vetEducationTypes     : await FetchAllLists.fetchAllVetEducationTypes(),
      pets                  : await FetchAllLists.fetchAllPets()
    }
    return res.status(200).json(response)
  } catch (error: unknown) {
    return res.status(400).json([])
  }
}

export async function fetchPatientLists (req: Request, res: Response): Promise<void> {
  const operation = async () => {
    const response: LanguagesList = {
      languages: await FetchAllLists.fetchAllLanguages()
    }
    return response
  }
  OperationHandler.executeAsyncAndReturnValueToRes(res, operation, [])
}

export async function fetchPetTypes (req: Request, res: Response): Promise<void> {
  const operation = async () => {
    return await FetchAllLists.fetchAllPets()
  }
  OperationHandler.executeAsyncAndReturnValueToRes(res, operation, [])
}

export async function fetchInsurances (req: Request, res: Response): Promise<void> {
  const operation = async () => {
    return await FetchAllLists.fetchAllInsurances()
  }
  OperationHandler.executeAsyncAndReturnValueToRes(res, operation, [])
}
