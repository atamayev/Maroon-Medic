import { Response, Request } from "express"
import TimeUtils from "../../utils/time"
import OperationHandler from "../../utils/operation-handler"
import SavePatientDataDB from "../../db/private-patient-data/save-patient-data-db"

export async function savePersonalData (req: Request, res: Response): Promise<void> {
	const patientId = req.patientId
	const doesRecordExist = await OperationHandler.executeAsyncAndReturnValue(res, SavePatientDataDB.checkIfPersonalDataExists, patientId)

	const personalInfo = req.body.personalInfo

	const dateOfBirth = TimeUtils.convertDOBStringIntoMySQLDate(personalInfo.birthMonth, personalInfo.birthDay, personalInfo.birthYear)

	if (doesRecordExist) {
		const operation: () => Promise<void> = async () => await SavePatientDataDB.updatePersonalData(personalInfo, dateOfBirth, patientId)
		await OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
	} else {
		const operation: () => Promise<void> = async () => await SavePatientDataDB.addPersonalData(personalInfo, dateOfBirth, patientId)
		await OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
	}
}

export async function addLanguage (req: Request, res: Response): Promise<void> {
	const languageId = req.body.languageId
	const patientId = req.patientId
	const operation: () => Promise<void> = async () => await SavePatientDataDB.addLanguage(languageId, patientId)
	await OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}

export async function deleteLanguage (req: Request, res: Response): Promise<void> {
	const languageId: number = Number(req.params.languageId)
	const patientId = req.patientId
	const operation: () => Promise<void> = async () => await SavePatientDataDB.deleteLanguage(languageId, patientId)
	await OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}

export async function addPet (req: Request, res: Response): Promise<void> {
	const patientId = req.patientId
	const petData = req.body.petData

	const petInfoId = await OperationHandler.executeAsyncAndReturnValue(res, SavePatientDataDB.addNewPet, petData, patientId)
	const petInfoIdNumber = Number(petInfoId)
	const operation: () => Promise<void> = async () => {
		await SavePatientDataDB.addNewPetInsurance(petData.insuranceListId, petInfoIdNumber)
	}
	await OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation, petInfoIdNumber)
}

export async function deletePet (req: Request, res: Response): Promise<void> {
	const petId: number = Number(req.params.petId)
	const operation: () => Promise<void> = async () => await SavePatientDataDB.deletePet(petId)
	await OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}
