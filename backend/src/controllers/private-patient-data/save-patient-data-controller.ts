import _ from "lodash"
import { Response, Request } from "express"
import OperationHandler from "../../utils/operation-handler"
import SavePatientDataDB from "../../db/private-patient-data/save-patient-data-db"
import changeSavePetKeyNames from "../../utils/change-save-pet-key-names"

export async function savePersonalData (req: Request, res: Response): Promise<void> {
	const patientId = req.patientId
	const doesRecordExist = await OperationHandler.executeAsyncAndReturnValue(res, SavePatientDataDB.checkIfPersonalDataExists, patientId)

	const personalInfo = req.body.personalInfo as FormattedPersonalData

	if (doesRecordExist === true) {
		const operation: () => Promise<void> = async () => await SavePatientDataDB.updatePersonalData(personalInfo, patientId)
		await OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
	} else {
		const operation: () => Promise<void> = async () => await SavePatientDataDB.addPersonalData(personalInfo, patientId)
		await OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
	}
}

export async function addLanguage (req: Request, res: Response): Promise<void | Response> {
	const languageId: number = Number(req.params.languageId)
	if (isNaN(languageId)) return res.status(400).json({ error: "Invalid language ID" })

	const patientId = req.patientId
	const operation: () => Promise<void> = async () => await SavePatientDataDB.addLanguage(languageId, patientId)
	await OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}

export async function deleteLanguage (req: Request, res: Response): Promise<void | Response> {
	const languageId: number = Number(req.params.languageId)
	if (isNaN(languageId)) return res.status(400).json({ error: "Invalid languageID" })

	const patientId = req.patientId
	const operation: () => Promise<void> = async () => await SavePatientDataDB.deleteLanguage(languageId, patientId)
	await OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}

export async function addPet (req: Request, res: Response): Promise<Response> {
	const patientId = req.patientId
	const unProcessedPetData = req.body.petData as PetItemForCreationPreProcessed

	const petData = changeSavePetKeyNames(unProcessedPetData)

	const petInfoId = await OperationHandler.executeAsyncAndReturnValue(res, SavePatientDataDB.addNewPet, petData, patientId)
	const petInfoIdNumber = Number(petInfoId)

	const operation: () => Promise<void> = async () => {
		await SavePatientDataDB.addNewPetInsurance(petData.insuranceListId, petInfoIdNumber)
	}
	await OperationHandler.executeAsyncOperationWithoutReturnValueNorRes(res, operation)

	if (!_.isEmpty(petData.petMedications)) {
		for (const petMedication of petData.petMedications) {
			const operation1: () => Promise<void> = async () => await SavePatientDataDB.addNewPetMedication(petMedication, petInfoIdNumber)
			await OperationHandler.executeAsyncOperationWithoutReturnValueNorRes(res, operation1)
		}
	}

	if (!_.isEmpty(petData.petProcedures)) {
		for (const petProcedure of petData.petProcedures) {
			const operation2: () => Promise<void> = async () => await SavePatientDataDB.addNewPetProcedure(petProcedure, petInfoIdNumber)
			await OperationHandler.executeAsyncOperationWithoutReturnValueNorRes(res, operation2)
		}
	}

	return res.status(200).json(petInfoId)
}

export async function deletePet (req: Request, res: Response): Promise<void | Response> {
	const petId: number = Number(req.params.petId)
	if (isNaN(petId)) return res.status(400).json({ error: "Invalid petID" })

	const operation: () => Promise<void> = async () => await SavePatientDataDB.deletePet(petId)
	await OperationHandler.executeAsyncOperationWithoutReturnValueNorRes(res, operation)

	const operation2: () => Promise<void> = async () => await SavePatientDataDB.deleteAllPetInsurances(petId)
	await OperationHandler.executeAsyncOperationWithoutReturnValueNorRes(res, operation2)

	const operation3: () => Promise<void> = async () => await SavePatientDataDB.deleteAllPetMedications(petId)
	await OperationHandler.executeAsyncOperationWithoutReturnValueNorRes(res, operation3)

	const operation4: () => Promise<void> = async () => await SavePatientDataDB.deleteAllPetProcedures(petId)
	await OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation4)
}

export async function addPetMedication (req: Request, res: Response): Promise<void> {
	const petInfoId = req.body.petInfoId as number
	const petMedication = req.body.petMedication as PetMedications
	const operation: () => Promise<void> = async () => await SavePatientDataDB.addNewPetMedication(petMedication, petInfoId)
	await OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}

export async function deletePetMedication (req: Request, res: Response): Promise<void> {
	const petInfoId = req.body.petInfoId as number
	const petMedicationId = req.body.petMedicationId as number
	const operation: () => Promise<void> = async () => await SavePatientDataDB.deletePetMedication(petMedicationId, petInfoId)
	await OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}

export async function addPetProcedure (req: Request, res: Response): Promise<void> {
	const petInfoId = req.body.petInfoId as number
	const petProcedure = req.body.petProcedure as PetProcedures
	const operation: () => Promise<void> = async () => await SavePatientDataDB.addNewPetProcedure(petProcedure, petInfoId)
	await OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}

export async function deletePetProcedure (req: Request, res: Response): Promise<void> {
	const petInfoId = req.body.petInfoId as number
	const petProcedureId = req.body.petProcedureId as number
	const operation: () => Promise<void> = async () => await SavePatientDataDB.deletePetProcedure(petProcedureId, petInfoId)
	await OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}
