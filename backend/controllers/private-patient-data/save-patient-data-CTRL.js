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
  const doesRecordExist = await OperationHandler.executeAsyncAndReturnValue(SavePatientDataDB.checkIfPersonalDataExists, res, PatientID)

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

/** saveLanguageData saves either Language
 *  First, converts from PatientUUID to PatientID. Then, performs operations depending on the operationType
 *  The mapping file is chosen based on the DataType (can either be Specialty, or Language)
 * @param {String} req Cookie from client, type of data, list of data (ie list of languages, or insurances)
 * @param {Boolean} res 200/400
 * @returns Returns 200/400, depending on wheather the data was saved correctly
 *  DOCUMENTATION LAST UPDATED 6/4/23
 */
export async function saveLanguageData (req, res) {
  const PatientID = req.PatientID

  const operationType = req.body.operationType

  const languageID = req.body.Data // The Data is an array of the ID of the DataType ([6]), which is a specific Language_ID)

  if (operationType !== "add" && operationType !== "delete") return res.status(400).json()
  else if (operationType === "add") {
    const operation = async () => await SavePatientDataDB.addLanguage(languageID, PatientID)
    OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
  } else if (operationType === "delete") {
    const operation = async () => await SavePatientDataDB.deleteLanguage(languageID, PatientID)
    OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
  }
}

/** savePetData is self-explanatory in name
 *  First, converts from PatientUUID to PatientID. Then, performs operations depending on the operationType
 * @param {String} req Cookie from client, type of data, list of data (ie list of languages, or insurances)
 * @param {Boolean} res 200/400
 * @returns Returns 200/400, depending on wheather the data was saved correctly
 *  DOCUMENTATION LAST UPDATED 6/4/23
 */
export async function savePetData (req, res) {
  const PatientID = req.PatientID

  let PetData = req.body.PetData
  const operationType = req.body.operationType//adding, deleting, updating

  if (operationType !== "add" && operationType !== "delete") return res.status(400).json()
  else if (operationType === "add") {
    const petInfoID = await OperationHandler.executeAsyncAndReturnValue(SavePatientDataDB.addNewPet, res, PetData, PatientID)

    const operation = async () => await SavePatientDataDB.addNewPetInsurance(PetData.insurance_listID, petInfoID)
    OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation, petInfoID)

  } else if (operationType === "delete") {
    const operation = async () => await SavePatientDataDB.deletePet(PetData)
    OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
  }
}
