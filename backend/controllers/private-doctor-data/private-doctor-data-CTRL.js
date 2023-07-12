import _ from "lodash"
import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat.js"
dayjs.extend(customParseFormat) // extend Day.js with the plugin
import TimeUtils from "../../utils/time.js"
import { UUID_to_ID } from "../../db-setup-and-security/UUID.js"
import { clearCookies } from "../../utils/cookie-operations.js"
import FetchAllLists from "../../helper-functions/fetch-all-lists.js"
import {connection, DB_Operation} from "../../db-setup-and-security/connect.js"
import { formatPersonalData } from "../../utils/personal-data-formatter.js"
import FetchDoctorAccountData from "../../helper-functions/fetch-data/fetch-doctor-account-data.js"

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

  const basic_user_info = "basic_user_info"
  const sql = `INSERT INTO ${basic_user_info} (FirstName, LastName, Gender, DOB, User_ID) VALUES (?, ?, ?, ?, ?)`

  const values = [newDoctorObject.FirstName, newDoctorObject.LastName, newDoctorObject.Gender, dateOfBirth, UserID]
  await DB_Operation(newDoctor.name, basic_user_info)

  try {
    await connection.execute(sql, values)
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

  const UUID_reference = "UUID_reference"
  const sql = `SELECT EXISTS(SELECT 1 FROM ${UUID_reference} WHERE UUID = ?) as 'exists'`

  const values1 = [newDoctorUUID]
  const values2 = [existingDoctorUUID]
  await DB_Operation(newDoctorConfirmation.name, UUID_reference)

  try {
    const [results1] = await connection.execute(sql, values1)
    const [results2] = await connection.execute(sql, values2)
    const doesRecord1Exist = results1[0].exists
    const doesRecord2Exist = results2[0].exists

    if (doesRecord1Exist === 1 && doesRecord2Exist === 1) {
      doctorPermission = true
      return res.json(doctorPermission)
    }
    else return res.json(doctorPermission)
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

  const [Appointments, service_and_category_list, addresses, basic_user_info] =
      ["Appointments", "service_and_category_list", "addresses", "basic_user_info"]

  const sql = `SELECT
          ${Appointments}.AppointmentsID, ${Appointments}.appointment_date, ${Appointments}.appointment_price, ${Appointments}.patient_message, ${Appointments}.Doctor_confirmation_status, ${Appointments}.Created_at,
          ${service_and_category_list}.Category_name, ${service_and_category_list}.Service_name,
          ${addresses}.address_title, ${addresses}.address_line_1, ${addresses}.address_line_2, ${addresses}.city, ${addresses}.state, ${addresses}.zip, ${addresses}.country,
          ${basic_user_info}.FirstName AS Patient_FirstName, ${basic_user_info}.LastName AS Patient_LastName
      FROM ${Appointments}
          INNER JOIN ${service_and_category_list} ON ${Appointments}.${service_and_category_list}_ID = ${service_and_category_list}.${service_and_category_list}ID
          INNER JOIN ${addresses} ON ${Appointments}.${addresses}_ID = ${addresses}.${addresses}ID AND ${addresses}.Doctor_ID = ${Appointments}.Doctor_ID
          INNER JOIN ${basic_user_info} ON ${Appointments}.Patient_ID = ${basic_user_info}.User_ID
      WHERE
          ${Appointments}.Doctor_ID = ?`

  const values = [DoctorID]
  await DB_Operation(fetchDashboardData.name, Appointments)

  try {
    const [results] = await connection.execute(sql, values)
    if (_.isEmpty(results)) return res.json([])
    else {
      const DashboardData = results
      for (let i = 0; i < DashboardData.length; i++) {
        DashboardData[i].appointment_date = dayjs(DashboardData[i].appointment_date).format("MMMM D, YYYY, h:mm A")
        DashboardData[i].Created_at = dayjs(DashboardData[i].Created_at).format("MMMM D, YYYY, h:mm A")
      }
      return res.json(DashboardData)
    }
  } catch (error) {
    return res.json([])
  }
}

/** fetchPersonalData retrieves the Doctor's personal data.
 *  Takes the doctor's UUID, and converts to the doctorID. Then, joins necessary tables to retrieve dashboard data
 *  Converts the Time details to a readble format using dayjs
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

  const basic_user_info = "basic_user_info"

  const sql = `SELECT FirstName, LastName, Gender, DOB FROM ${basic_user_info} WHERE User_ID = ?`
  const values = [DoctorID]
  await DB_Operation(fetchPersonalData.name, basic_user_info)

  let PersonalData = {
    FirstName: "",
    LastName: "",
    Gender: "",
    DOB_month: "",
    DOB_day: "",
    DOB_year: ""
  }

  try {
    const [results] = await connection.execute(sql, values)
    if (_.isEmpty(results)) return res.json(PersonalData)
    else {
      let dob = dayjs(results[0].DOB)
      const PersonalData = formatPersonalData(results, dob)
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
  const Appointments = "Appointments"

  const sql = `UPDATE ${Appointments} SET Doctor_confirmation_status = 1 WHERE appointmentsID = ?`
  const values = [AppointmentID]
  try {
    await connection.execute(sql, values)
    return res.status(200).json()
  } catch (error) {
    return res.status(400).json()
  }
}

/** fetchAccountDetails retrieves the Doctor's Account Details
 *  Takes the doctor's UUID, and converts to the doctorID.
 *  Starts with an empty list, and appends objects from fetchDoctorAccountData. Each function contains a specific data type (desciriptions, languages, etc)
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
    //response.pictures          = await FetchDoctorAccountData.fetchDoctorPictures(DoctorID)
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
