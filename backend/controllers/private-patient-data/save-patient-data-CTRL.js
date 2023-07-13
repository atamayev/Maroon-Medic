import TimeUtils from "../../utils/time.js"
import { clearCookies } from "../../utils/cookie-operations.js"
import { UUID_to_ID } from "../../setup-and-security/UUID.js"
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
  const PatientUUID = req.cookies.PatientUUID
  let PatientID
  try {
    PatientID = await UUID_to_ID(PatientUUID)
  } catch (error) {
    clearCookies(res, "Patient")
    return res.status(401).json({ shouldRedirect: true, redirectURL: "/patient-login" })
  }

  let doesRecordExist

  try {
    doesRecordExist = await SavePatientDataDB.checkIfPersonalDataExists(PatientID)
  } catch (error) {
    return res.status(400).json()
  }

  const personalInfo = req.body.personalInfo

  const dateOfBirth = TimeUtils.convertDOBStringIntoMySQLDate(personalInfo.DOB_month, personalInfo.DOB_day, personalInfo.DOB_year)

  if (doesRecordExist) {
    try {
      await SavePatientDataDB.updatePersonalData(personalInfo, dateOfBirth, PatientID)
      return res.status(200).json()
    } catch (error) {
      return res.status(400).json()
    }
  } else {
    try {
      await SavePatientDataDB.addPersonalData(personalInfo, dateOfBirth, PatientID)
      return res.status(200).json()
    } catch (error) {
      return res.status(400).json()
    }
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
  const PatientUUID = req.cookies.PatientUUID
  let PatientID
  try {
    PatientID = await UUID_to_ID(PatientUUID)
  } catch (error) {
    clearCookies(res, "Patient")
    return res.status(401).json({ shouldRedirect: true, redirectURL: "/patient-login" })
  }

  const operationType = req.body.operationType

  const languageID = req.body.Data // The Data is an array of the ID of the DataType ([6]), which is a specific Language_ID)

  if (operationType !== "add" && operationType !== "delete") return res.status(400).json()
  else if (operationType === "add") {
    try {
      await SavePatientDataDB.addLanguage(languageID, PatientID)
      return res.status(200).json()
    } catch (error) {
      return res.status(400).json()
    }
  } else if (operationType === "delete") {
    try {
      await SavePatientDataDB.deleteLanguage(languageID, PatientID)
      return res.status(200).json()
    } catch (error) {
      return res.status(400).json()
    }
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
  const PatientUUID = req.cookies.PatientUUID
  let PatientID
  try {
    PatientID = await UUID_to_ID(PatientUUID)
  } catch (error) {
    clearCookies(res, "Patient")
    return res.status(401).json({ shouldRedirect: true, redirectURL: "/patient-login" })
  }

  let PetData = req.body.PetData
  const operationType = req.body.operationType//adding, deleting, updating

  if (operationType !== "add" && operationType !== "delete") return res.status(400).json()
  else if (operationType === "add") {
    let petInfoID
    try {
      petInfoID = await SavePatientDataDB.addNewPet(PetData, PatientID)
    } catch (error) {
      return res.status(400).json()
    }

    try {
      await SavePatientDataDB.addNewPetInsurance(PetData.insurance_listID, petInfoID)
      return res.status(200).json(petInfoID)
    } catch (error) {
      return res.status(400).json()
    }
  } else if (operationType === "delete") {
    try {
      await SavePatientDataDB.deletePet(PetData)
      return res.status(200).json()
    } catch (error) {
      return res.status(400).json()
    }
  }
}
