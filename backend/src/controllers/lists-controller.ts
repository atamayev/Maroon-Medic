import { Request, Response } from "express"
import FetchAll from "../utils/fetch-all-lists"
import OperationHandler from "../utils/operation-handler"

export async function fetchDoctorLists (req: Request, res: Response): Promise<Response> {
	try {
		const response: DoctorListDetails = {
			languages             : await FetchAll.languages(),
			servicesAndCategories : await FetchAll.servicesAndCategories(),
			specialties           : await FetchAll.specialties(),
			preVetSchools         : await FetchAll.preVetSchools(),
			preVetEducationTypes  : await FetchAll.preVetEducationTypes(),
			majors                : await FetchAll.majors(),
			vetSchools            : await FetchAll.vetSchools(),
			vetEducationTypes     : await FetchAll.vetEducationTypes(),
			pets                  : await FetchAll.petTypes()
		}
		return res.status(200).json(response)
	} catch (error: unknown) {
		return res.status(400).json([])
	}
}

export async function fetchPatientLists (req: Request, res: Response): Promise<void> {
	const operation: () => Promise<PatientListDetails> = async () => {
		const response: PatientListDetails = {
			languages: await FetchAll.languages()
		}
		return response
	}
	await OperationHandler.executeAsyncAndReturnValueToRes(res, operation, [])
}

export async function fetchPetTypes (req: Request, res: Response): Promise<void> {
	const operation: () => Promise<ServicedPetItem[]> = async () => {
		return await FetchAll.petTypes()
	}
	await OperationHandler.executeAsyncAndReturnValueToRes(res, operation, [])
}

export async function fetchInsurances (req: Request, res: Response): Promise<void> {
	const operation: () => Promise<InsuranceItem[]> = async () => {
		return await FetchAll.insurances()
	}
	await OperationHandler.executeAsyncAndReturnValueToRes(res, operation, [])
}

export async function fetchPetMedications (req: Request, res: Response): Promise<void> {
	const operation: () => Promise<PetMedicationItem[]> = async () => {
		return await FetchAll.petMedications()
	}
	await OperationHandler.executeAsyncAndReturnValueToRes(res, operation, [])
}

export async function fetchPetProcedures (req: Request, res: Response): Promise<void> {
	const operation: () => Promise<PetProceduresItem[]> = async () => {
		return await FetchAll.petProcedures()
	}
	await OperationHandler.executeAsyncAndReturnValueToRes(res, operation, [])
}
