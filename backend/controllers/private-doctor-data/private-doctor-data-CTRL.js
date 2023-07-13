import _ from "lodash"
import TimeUtils from "../../utils/time.js"
import DataFormatter from "../../utils/data-formatter.js"
import FetchAllLists from "../../utils/fetch-all-lists.js"
import { UUID_to_ID } from "../../setup-and-security/UUID.js"
import { clearCookies } from "../../utils/cookie-operations.js"
import PrivateDoctorDataDB from "../../db/private-doctor-data/private-doctor-data-DB.js"
import FetchDoctorAccountData from "../../utils/fetch-account-and-public-data/fetch-doctor-account-data.js"

/** newDoctor registers the inputted user data into basic_Doctor_info table
 *  All necessary information is sent via the request (DoctorUUID, firname, lastname, etc.)
 * @param {Array} req
 * @param {Array} res If the user data is successfully added to table, return true. If not, return error--> front end doesn't allow
 * @returns true/error
 * DOCUMENTATION LAST UPDATED 3/16/23
 */
export async function newDoctor (req, res) {
  const DoctorUUID = req.cookies.DoctorUUID
  let UserID

  try {
    UserID = await UUID_to_ID(DoctorUUID)
  } catch (error) {
    clearCookies(res, "Doctor")
    return res.status(401).json({ shouldRedirect: true, redirectURL: "/vet-login" })
  }

  const newDoctorObject = req.body.newDoctorObject

  const dateOfBirth = TimeUtils.convertDOBStringIntoMySQLDate(newDoctorObject.DOB_month, newDoctorObject.DOB_day, newDoctorObject.DOB_year)

  try {
    await PrivateDoctorDataDB.addNewDoctorInfo(newDoctorObject, dateOfBirth, UserID)
    return res.status(200).json()
  } catch (error) {
    return res.status(500).json(error)
  }
}

/** newDoctorConfirmation makes sure that the user on the site is a new Doctor
 *  If newDoctorUUID or the regular DoctorUUID don't exist, returns false.
 *  If both the DoctorUUID and newDoctorUUID exist in DB, then returns true, else returns false.
 * @param {Cookies} req Contains the user's cookies (newUser, and DoctorUUID)
 * @param {Array} res If the user data is successfully found in the table to table, return true. If not, return false --> front-end re-directs to register page
 * @returns true/false
 * DOCUMENTATION LAST UPDATED 3/16/23
 */
export async function newDoctorConfirmation (req, res) {
  let doctorPermission = false
  const newDoctorUUID = req.cookies.DoctorNewUser
  const existingDoctorUUID = req.cookies.DoctorUUID

  if (!newDoctorUUID || !existingDoctorUUID) return res.json(doctorPermission)

  try {
    const doBothUUIDExist = await PrivateDoctorDataDB.newDoctorConfirmation(newDoctorUUID, existingDoctorUUID)
    return res.json(doBothUUIDExist)
  } catch (error) {
    return res.json(doctorPermission)
  }
}

/** fetchDashboardData retrieves the upcoming appointments, services, and personal information (FirstName, LastName) .
 *  Takes the doctor's UUID, and converts to the doctorID. Then, joins necessary tables to retrieve dashboard data
 * @param {Cookies} req Contains the user's cookies (DoctorUUID)
 * @param {Array} res User data, or error
 * @returns User data.
 * DOCUMENTATION LAST UPDATED 6/4/23
 */
export async function fetchDashboardData (req, res) {
  const DoctorUUID = req.cookies.DoctorUUID
  let DoctorID
  try {
    DoctorID = await UUID_to_ID(DoctorUUID)
  } catch (error) {
    clearCookies(res, "Doctor")
    return res.status(401).json({ shouldRedirect: true, redirectURL: "/vet-login" })
  }

  try {
    const DashboardData = await PrivateDoctorDataDB.retrieveDoctorDashboard(DoctorID)
    if (_.isEmpty(DashboardData)) return res.json([])
    else {
      for (let i = 0; i < DashboardData.length; i++) {
        DashboardData[i].appointment_date = TimeUtils.convertMySQLDateIntoReadableString(DashboardData[i].appointment_date)
        DashboardData[i].Created_at = TimeUtils.convertMySQLDateIntoReadableString(DashboardData[i].Created_at)
      }
      return res.json(DashboardData)
    }
  } catch (error) {
    return res.json([])
  }
}

/** fetchPersonalData retrieves the Doctor's personal data.
 *  Takes the doctor's UUID, and converts to the doctorID. Then, joins necessary tables to retrieve dashboard data
 *  Converts the Time details to a readble format
 * @param {Cookies} req Contains the user's cookies (DoctorUUID)
 * @param {Array} res User data, or error
 * @returns User data.
 * DOCUMENTATION LAST UPDATED 6/423
 */
export async function fetchPersonalData (req, res) {
  const DoctorUUID = req.cookies.DoctorUUID
  let DoctorID
  try {
    DoctorID = await UUID_to_ID(DoctorUUID)
  } catch (error) {
    clearCookies(res, "Doctor")
    return res.status(401).json({ shouldRedirect: true, redirectURL: "/vet-login" })
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
    const unformattedPersonaData = await PrivateDoctorDataDB.retrievePersonalDoctorData(DoctorID)
    if (_.isEmpty(unformattedPersonaData)) return res.json(PersonalData)
    else {
      PersonalData = DataFormatter.formatPersonalData(unformattedPersonaData)
      return res.json(PersonalData)
    }
  } catch (error) {
    return res.json(PersonalData)
  }
}

/** confirmAppointment allows for a doctor to confirm an incoming pt appointment
 *  Sets the Doctor_confirmation_status where the appointment ID is whatever is in the request
 * @param {Cookies} req Contains the appointmentID
 * @param {Array} res Status code (200: success, 400: failure)
 * @returns Status code (200, 400)
 * DOCUMENTATION LAST UPDATED 6/423
 */
export async function confirmAppointment (req, res) {
  const AppointmentID = req.body.AppointmentID

  try {
    await PrivateDoctorDataDB.updateAppointmentStatus(AppointmentID)
    return res.status(200).json()
  } catch (error) {
    return res.status(400).json()
  }
}

/** fetchAccountDetails retrieves the Doctor's Account Details
 *  Takes the doctor's UUID, and converts to the doctorID.
 *  Starts with an empty list, and appends objects from FetchDoctorAccountData. Each function contains a specific data type (desciriptions, languages, etc)
 * @param {Cookies} req Contains the user's cookies (DoctorUUID)
 * @param {Array} res List with user account details
 * @returns User data.
 * DOCUMENTATION LAST UPDATED 3/16/23
 */
export async function fetchAccountDetails (req, res) {
  const DoctorUUID = req.cookies.DoctorUUID
  let DoctorID
  try {
    DoctorID = await UUID_to_ID(DoctorUUID)
  } catch (error) {
    clearCookies(res, "Doctor")
    return res.status(401).json({ shouldRedirect: true, redirectURL: "/vet-login" })
  }

  try {
    let response = {}
    response.languages            = await FetchDoctorAccountData.fetchDoctorLanguages(DoctorID)
    response.services             = await FetchDoctorAccountData.fetchDoctorServices(DoctorID)
    response.specialties          = await FetchDoctorAccountData.fetchDoctorSpecialties(DoctorID)
    response.preVetEducation      = await FetchDoctorAccountData.fetchPreVetEducation(DoctorID)
    response.vetEducation         = await FetchDoctorAccountData.fetchVetEducation(DoctorID)
    response.addressData          = await FetchDoctorAccountData.fetchDoctorAddressData(DoctorID)
    response.description          = await FetchDoctorAccountData.fetchDescriptionData(DoctorID)
    response.servicedPets         = await FetchDoctorAccountData.fetchServicedPets(DoctorID)
    const verificationAndPublicAv = await FetchDoctorAccountData.fetchVerifiedAndPubliclyAvailable(DoctorID)
    response.verified             = verificationAndPublicAv.Verified
    response.publiclyAvailable    = verificationAndPublicAv.PubliclyAvailable
    // response.pictures             = await FetchDoctorAccountData.fetchDoctorPictures(DoctorID)
    return res.status(200).json(response)
  } catch (error) {
    return res.status(400).json([])
  }
}

/** fetchAccountDetails creates a list of objects contains all of the Lists from the DB
 *  Doctors fill in their personal details using options from these lists.
 * @param {N/A} req
 * @param {Array} res An Array of objects, filled with all possible list data
 * @returns Objects from List data
 * DOCUMENTATION LAST UPDATED 3/16/23
 */
export async function fetchDoctorLists (req, res) {
  try {
    let response = {}
    response.languages             = await FetchAllLists.fetchAllLanguages()
    response.servicesAndCategories = await FetchAllLists.fetchAllServicesAndCategories()
    response.specialties           = await FetchAllLists.fetchAllSpecialties()
    response.preVetSchools         = await FetchAllLists.fetchAllPreVetSchools()
    response.preVetEducationTypes  = await FetchAllLists.fetchAllPreVetEducationTypes()
    response.majors                = await FetchAllLists.fetchAllMajors()
    response.vetSchools            = await FetchAllLists.fetchAllVetSchools()
    response.vetEducationTypes     = await FetchAllLists.fetchAllVetEducationTypes()
    response.pets                  = await FetchAllLists.fetchAllPets()
    return res.status(200).json(response)
  } catch (error) {
    return res.status(400).json([])
  }
}
