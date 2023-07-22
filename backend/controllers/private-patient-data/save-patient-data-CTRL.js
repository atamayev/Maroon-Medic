import TimeUtils from "../../utils/time.js"
import OperationHandler from "../../utils/operation-handler.js"
import SavePatientDataDB from "../../db/private-patient-data/save-patient-data-DB.js"

/** savePersonalData is self-explanatory in name
 *  First, checks if the patient already has saved data in the DB.
 *  If there is no data saved, the data is added. If there is data, then it is updated
 * @param {Array} req Contains Patient's UUID as a cookie, and the personalInfo
 * @param {*} res 200/400 status code
 * @returns 200/400 status code
 *  DOCUMENTATION LAST UPDATED 6/4/23
 */
export async function savePersonalData (req, res) {
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

export async function addLanguage (req, res) {
  const languageID = req.body.languageID
  const PatientID = req.PatientID
  const operation = async () => await SavePatientDataDB.addLanguage(languageID, PatientID)
  OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}

export async function deleteLanguage (req, res) {
  const languageID = req.params.languageID
  const PatientID = req.PatientID
  const operation = async () => await SavePatientDataDB.deleteLanguage(languageID, PatientID)
  OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}

export async function addPet (req, res) {
  const PatientID = req.PatientID
  const PetData = req.body.PetData

  const petInfoID = await OperationHandler.executeAsyncAndReturnValue(res, SavePatientDataDB.addNewPet, PetData, PatientID)
  const operation = async () => await SavePatientDataDB.addNewPetInsurance(PetData.insurance_listID, petInfoID)
  OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation, petInfoID)
}

export async function deletePet (req, res) {
  const petID = req.params.petID
  const operation = async () => await SavePatientDataDB.deletePet(petID)
  OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}
