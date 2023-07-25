import { Response } from "express"
import TimeUtils from "../../utils/time"
import { MaroonPatientRequest } from "../../express"
import OperationHandler from "../../utils/operation-handler"
import SavePatientDataDB from "../../db/private-patient-data/save-patient-data-DB"

export async function savePersonalData (req: MaroonPatientRequest, res: Response): Promise<void> {
  const PatientID = req.PatientID
  const doesRecordExist = await OperationHandler.executeAsyncAndReturnValue(res, SavePatientDataDB.checkIfPersonalDataExists, PatientID)

  const personalInfo = req.body.personalInfo

  const dateOfBirth = TimeUtils.convertDOBStringIntoMySQLDate(personalInfo.DOB_month, personalInfo.DOB_day, personalInfo.DOB_year)

  if (doesRecordExist) {
    const operation = async () => await SavePatientDataDB.updatePersonalData(personalInfo, dateOfBirth, PatientID)
    OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
  } else {
    const operation = async () => await SavePatientDataDB.addPersonalData(personalInfo, dateOfBirth, PatientID)
    OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
  }
}

export async function addLanguage (req: MaroonPatientRequest, res: Response) {
  const languageID: number = req.body.languageID
  const PatientID = req.PatientID
  const operation = async () => await SavePatientDataDB.addLanguage(languageID, PatientID)
  OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}

export async function deleteLanguage (req: MaroonPatientRequest, res: Response) {
  const languageID: number = req.body.languageID
  const PatientID = req.PatientID
  const operation = async () => await SavePatientDataDB.deleteLanguage(languageID, PatientID)
  OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}

export async function addPet (req: MaroonPatientRequest, res: Response) {
  const PatientID = req.PatientID
  const PetData = req.body.PetData

  const petInfoID = await OperationHandler.executeAsyncAndReturnValue(res, SavePatientDataDB.addNewPet, PetData, PatientID)
  const petInfoIDNumber = Number(petInfoID)
  const operation = async () => await SavePatientDataDB.addNewPetInsurance(PetData.insurance_listID, petInfoIDNumber)
  OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation, petInfoIDNumber)
}

export async function deletePet (req: MaroonPatientRequest, res: Response) {
  const petID: number = Number(req.params.petID)
  const operation = async () => await SavePatientDataDB.deletePet(petID)
  OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}
