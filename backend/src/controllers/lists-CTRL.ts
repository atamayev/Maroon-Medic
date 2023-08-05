import FetchAllLists from "../utils/fetch-all-lists"
import OperationHandler from "../utils/operation-handler"
import { Request, Response } from "express"

interface DoctorList {
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

interface PatientList {
  languages: LanguageItemType[]
}

export async function fetchDoctorLists (req: Request, res: Response): Promise<Response> {
  try {
    const response: DoctorList = {
      languages             : await FetchAllLists.fetchAllLanguages(),
      servicesAndCategories : await FetchAllLists.fetchAllServicesAndCategories(),
      specialties           : await FetchAllLists.fetchAllSpecialties(),
      preVetSchools         : await FetchAllLists.fetchAllPreVetSchools(),
      preVetEducationTypes  : await FetchAllLists.fetchAllPreVetEducationTypes(),
      majors                : await FetchAllLists.fetchAllMajors(),
      vetSchools            : await FetchAllLists.fetchAllVetSchools(),
      vetEducationTypes     : await FetchAllLists.fetchAllVetEducationTypes(),
      pets                  : await FetchAllLists.fetchAllPetTypes()
    }
    return res.status(200).json(response)
  } catch (error: unknown) {
    return res.status(400).json([])
  }
}

export async function fetchPatientLists (req: Request, res: Response): Promise<void> {
  const operation: () => Promise<PatientList> = async () => {
    const response: PatientList = {
      languages: await FetchAllLists.fetchAllLanguages()
    }
    return response
  }
  await OperationHandler.executeAsyncAndReturnValueToRes(res, operation, [])
}

export async function fetchPetTypes (req: Request, res: Response): Promise<void> {
  const operation: () => Promise<ServicedPetItemType[]> = async () => {
    return await FetchAllLists.fetchAllPetTypes()
  }
  await OperationHandler.executeAsyncAndReturnValueToRes(res, operation, [])
}

export async function fetchInsurances (req: Request, res: Response): Promise<void> {
  const operation: () => Promise<InsuranceItemType[]> = async () => {
    return await FetchAllLists.fetchAllInsurances()
  }
  await OperationHandler.executeAsyncAndReturnValueToRes(res, operation, [])
}
