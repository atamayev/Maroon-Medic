import { Response, Request } from "express"
import TimeUtils from "../../utils/time"
import OperationHandler from "../../utils/operation-handler"
import SavePatientDataDB from "../../db/private-patient-data/save-patient-data-DB"

export async function savePersonalData (req: Request, res: Response): Promise<void> {
	const PatientID = req.PatientID
	const doesRecordExist = await OperationHandler.executeAsyncAndReturnValue(res, SavePatientDataDB.checkIfPersonalDataExists, PatientID)

	const personalInfo = req.body.personalInfo

	const dateOfBirth = TimeUtils.convertDOBStringIntoMySQLDate(personalInfo.DOB_month, personalInfo.DOB_day, personalInfo.DOB_year)

	if (doesRecordExist) {
		const operation: () => Promise<void> = async () => await SavePatientDataDB.updatePersonalData(personalInfo, dateOfBirth, PatientID)
		await OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
	} else {
		const operation: () => Promise<void> = async () => await SavePatientDataDB.addPersonalData(personalInfo, dateOfBirth, PatientID)
		await OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
	}
}

export async function addLanguage (req: Request, res: Response): Promise<void> {
	const languageID = req.body.languageID
	const PatientID = req.PatientID
	const operation: () => Promise<void> = async () => await SavePatientDataDB.addLanguage(languageID, PatientID)
	await OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}

export async function deleteLanguage (req: Request, res: Response): Promise<void> {
	const languageID: number = Number(req.params.languageID)
	const PatientID = req.PatientID
	const operation: () => Promise<void> = async () => await SavePatientDataDB.deleteLanguage(languageID, PatientID)
	await OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}

export async function addPet (req: Request, res: Response): Promise<void> {
	const PatientID = req.PatientID
	const PetData = req.body.PetData

	const petInfoID = await OperationHandler.executeAsyncAndReturnValue(res, SavePatientDataDB.addNewPet, PetData, PatientID)
	const petInfoIDNumber = Number(petInfoID)
	const operation: () => Promise<void> = async () => await SavePatientDataDB.addNewPetInsurance(PetData.insurance_listID, petInfoIDNumber)
	await OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation, petInfoIDNumber)
}

export async function deletePet (req: Request, res: Response): Promise<void> {
	const petID: number = Number(req.params.petID)
	const operation: () => Promise<void> = async () => await SavePatientDataDB.deletePet(petID)
	await OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}
