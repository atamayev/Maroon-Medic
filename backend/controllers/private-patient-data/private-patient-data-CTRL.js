import _ from "lodash"
import TimeUtils from "../../utils/time.js"
import DataFormatter from "../../utils/data-formatter.js"
import FetchAllLists from "../../utils/fetch-all-lists.js"
import { UUID_to_ID } from "../../setup-and-security/UUID.js"
import { clearCookies } from "../../utils/cookie-operations.js"
import PrivatePatientDataDB from "../../db/private-patient-data/private-patient-data-DB.js"
import FetchPatientAccountData from "../../utils/fetch-account-and-public-data/fetch-patient-account-data.js"

/** newPatient registers the inputted user data into basic_Patient_info table
 *  All necessary information is sent via the request (PatientUUID, firname, lastname, etc.)
 * @param {Array} req Patient's UUID cookie, newPatientObject
 * @param {status} res If the user data is successfully added to table, return 200. If not, return 400--> front end will tell pt data not added
 * @returns status code 200/400
 * DOCUMENTATION LAST UPDATED 6/4/23
 */
export async function newPatient (req, res) {
  const PatientUUID = req.cookies.PatientUUID
  let UserID
  try {
    UserID = await UUID_to_ID(PatientUUID)
  } catch (error) {
    clearCookies(res, "Patient")
    return res.status(401).json({ shouldRedirect: true, redirectURL: "/patient-login" })
  }

  const newPatientObject = req.body.newPatientObject

  const dateOfBirth = TimeUtils.convertDOBStringIntoMySQLDate(newPatientObject.DOB_month, newPatientObject.DOB_day, newPatientObject.DOB_year)

  try {
    await PrivatePatientDataDB.addNewPatientInfo(newPatientObject, dateOfBirth, UserID)
    return res.status(200).json()
  } catch (error) {
    return res.status(500).json(error)
  }
}

/** newPatientConfirmation makes sure that the user on the site is a new Patient
 *  If newPatientUUID or the regular PatientUUID don't exist, returns false.
 *  If both the PatientUUID and newPatientUUID exist in DB, then returns true, else returns false.
 * @param {Array} req
 * @param {Array} res If the user data is successfully found in the table to table, return true. If not, return false --> front-end re-directs to register page
 * @returns true/false
 * DOCUMENTATION LAST UPDATED 3/16/23
 */
export async function newPatientConfirmation (req, res) {
  let patientPermission = false
  const newPatientUUID = req.cookies.PatientNewUser
  const existingPatientUUID = req.cookies.PatientUUID

  if (!newPatientUUID || !existingPatientUUID) return res.json(patientPermission)

  try {
    const doBothUUIDExist = await PrivatePatientDataDB.checkIfUUIDsExist(newPatientUUID, existingPatientUUID)
    return res.json(doBothUUIDExist)
  } catch (error) {
    return res.json(patientPermission)
  }
}

/** fetchDashboardData retrieves the Patient's dashboard data, which contains information about future appointments.
 *  Takes the Patient's UUID, and converts to the PatientID. Then, joins necessary tables to retrieve dashboard data
 *  Retreieves the appointment details, which contain the service/category name, address information, and the doctor's personal information
 * @param {Cookies} req Contains the user's cookies (PatientUUID)
 * @param {Array} res User data, or nothing
 * @returns User data.
 * DOCUMENTATION LAST UPDATED 3/16/23
 */
export async function fetchDashboardData (req, res) {
  const PatientUUID = req.cookies.PatientUUID
  let PatientID
  try {
    PatientID = await UUID_to_ID(PatientUUID)
  } catch (error) {
    clearCookies(res, "Patient")
    return res.status(401).json({ shouldRedirect: true, redirectURL: "/patient-login" })
  }

  try {
    const DashboardData = await PrivatePatientDataDB.retrieveDoctorDashboard(PatientID)

    if (_.isEmpty(DashboardData)) return res.json([])
    else {
      for (let singleAppointment of DashboardData) {
        singleAppointment.appointment_date = TimeUtils.convertMySQLDateIntoReadableString(singleAppointment.appointment_date)
        singleAppointment.Created_at = TimeUtils.convertMySQLDateIntoReadableString(singleAppointment.Created_at)
      }
      return res.json(DashboardData)
    }
  } catch (error) {
    return res.json([])
  }
}

/** fetchPersonalData retrieves the Patient's personal data.
 *  Takes the Patient's UUID, and converts to the PatientID. Then, selects data from basic_user_info table where User_ID matches.
 * @param {Cookies} req Contains the user's cookies (PatientUUID)
 * @param {Array} res PersonalData
 * @returns PersonalData
 * DOCUMENTATION LAST UPDATED 6/4/23
 */
export async function fetchPersonalData (req, res) {
  const PatientUUID = req.cookies.PatientUUID
  let PatientID
  try {
    PatientID = await UUID_to_ID(PatientUUID)
  } catch (error) {
    clearCookies(res, "Patient")
    return res.status(401).json({ shouldRedirect: true, redirectURL: "/patient-login" })
  }

  let PersonalData = {
    FirstName: "",
    LastName: "",
    Gender: "",
    DOB_month: "",
    DOB_day: "",
    DOB_year: ""
  }

  try {
    const unformattedPersonaData = await PrivatePatientDataDB.retrievePersonalPatientData(PatientID)
    if (_.isEmpty(unformattedPersonaData)) return res.json(PersonalData)
    else {
      PersonalData = DataFormatter.formatPersonalData(unformattedPersonaData)
      return res.json(PersonalData)
    }
  } catch (error) {
    return res.json(PersonalData)
  }
}

/** fetchPetData retrieves all of the pet's that pretain to a pet parent.
 *  Takes the Patient's UUID, and converts to the PatientID.
 *  Selects all of each pet's details (name, gender, etc.), where isActive = 1
 * @param {Cookies} req Contains the user's cookies (PatientUUID)
 * @param {Array} res PetData or nothing (if error)
 * @returns PetData
 * DOCUMENTATION LAST UPDATED 6/4/23
 */
export async function fetchPetData (req, res) {
  const PatientUUID = req.cookies.PatientUUID
  let PatientID
  try {
    PatientID = await UUID_to_ID(PatientUUID)
  } catch (error) {
    clearCookies(res, "Patient")
    return res.status(401).json({ shouldRedirect: true, redirectURL: "/patient-login" })
  }

  try {
    const response = await FetchPatientAccountData.fetchPetData(PatientID)
    return res.status(200).json(response)
  } catch (error) {
    return res.status(400).json([])
  }
}

/** fetchPetTypes retrieves a list of all the petTypes from the DB
 * @param {} req N/A
 * @param {Array} res PetTypes or nothing (if error)
 * @returns PetTypes
 * DOCUMENTATION LAST UPDATED 6/4/23
 */
export async function fetchPetTypes (req, res) {
  try {
    const response = await FetchAllLists.fetchAllPets()
    return res.status(200).json(response)
  } catch (error) {
    return res.status(400).json([])
  }
}

export async function fetchInsurances (req, res) {
  try {
    const response = await FetchAllLists.fetchAllInsurances()
    return res.status(200).json(response)
  } catch (error) {
    return res.status(400).json([])
  }
}

/** fetchAccountDetails retrieves the Patient's Account Details
 *  Takes the patient's UUID, and converts to the patientID.
 *  Starts with an empty list, and appends objects from FetchPatientAccountData. Each function contains a specific data type (desciriptions, languages, etc)
 * @param {Cookies} req Contains the user's cookies (PatientUUID)
 * @param {Array} res List with user account details
 * @returns User data.
 * DOCUMENTATION LAST UPDATED 3/16/23
 */
export async function fetchAccountDetails (req, res) {
  const PatientUUID = req.cookies.PatientUUID
  let PatientID
  try {
    PatientID = await UUID_to_ID(PatientUUID)
  } catch (error) {
    clearCookies(res, "Patient")
    return res.status(401).json({ shouldRedirect: true, redirectURL: "/patient-login" })
  }

  try {
    let response = {}
    response.languages  = await FetchPatientAccountData.fetchPatientLanguages(PatientID)
    return res.status(200).json(response)
  } catch (error) {
    return res.status(400).json([])
  }
}

/** Returns a list of insurances and languages
 * @param {} req
 * @param {Array} res Array of 2 Arrays: Insurances, Languages
 * @returns
 */
export async function fetchPatientLists (req, res) {
  try {
    let response = {}
    response.languages  = await FetchAllLists.fetchAllLanguages()
    return res.status(200).json(response)
  } catch (error) {
    return res.status(400).json([])
  }
}
