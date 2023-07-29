import FetchAllLists from "../utils/fetch-all-lists"
import OperationHandler from "../utils/operation-handler"
import { Request, Response } from "express"

interface ListsResponse {
  languages: LanguageItemType[]
  servicesAndCategories: ServiceListItemType[]
  specialties: SpecialtyItemType[]
  preVetSchools: PreVetSchoolType[]
  preVetEducationTypes: PreVetEducationTypeType[]
  majors: MajorType[]
  vetSchools: VetSchoolListType[]
  vetEducationTypes: VetEducationTypeType[]
  pets: ServicedPetItemType[]
}

interface LanguagesList {
  languages: LanguageItemType[]
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
