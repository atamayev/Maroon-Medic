import _ from "lodash"
import TimeUtils from "../../utils/time.js"
import DataFormatter from "../../utils/data-formatter.js"
import OperationHandler from "../../utils/operation-handler.js"
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
  const DoctorID = req.DoctorID

  const newDoctorObject = req.body.newDoctorObject

  const dateOfBirth = TimeUtils.convertDOBStringIntoMySQLDate(newDoctorObject.DOB_month, newDoctorObject.DOB_day, newDoctorObject.DOB_year)
  const operation = async () => await PrivateDoctorDataDB.addNewDoctorInfo(newDoctorObject, dateOfBirth, DoctorID)
  OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}

/** fetchDashboardData retrieves the upcoming appointments, services, and personal information (FirstName, LastName) .
 *  Takes the doctor's UUID, and converts to the doctorID. Then, joins necessary tables to retrieve dashboard data
 * @param {Cookies} req Contains the user's cookies (DoctorUUID)
 * @param {Array} res User data, or error
 * @returns User data.
 * DOCUMENTATION LAST UPDATED 6/4/23
 */
export async function fetchDashboardData (req, res) {
  const DoctorID = req.DoctorID

  try {
    const DashboardData = await PrivateDoctorDataDB.retrieveDoctorDashboard(DoctorID)
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

/** fetchPersonalData retrieves the Doctor's personal data.
 *  Takes the doctor's UUID, and converts to the doctorID. Then, joins necessary tables to retrieve dashboard data
 *  Converts the Time details to a readble format
 * @param {Cookies} req Contains the user's cookies (DoctorUUID)
 * @param {Array} res User data, or error
 * @returns User data.
 * DOCUMENTATION LAST UPDATED 6/423
 */
export async function fetchPersonalData (req, res) {
  const DoctorID = req.DoctorID

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

/** fetchAccountDetails retrieves the Doctor's Account Details
 *  Takes the doctor's UUID, and converts to the doctorID.
 *  Starts with an empty list, and appends objects from FetchDoctorAccountData. Each function contains a specific data type (desciriptions, languages, etc)
 * @param {Cookies} req Contains the user's cookies (DoctorUUID)
 * @param {Array} res List with user account details
 * @returns User data.
 * DOCUMENTATION LAST UPDATED 3/16/23
 */
export async function fetchAccountDetails (req, res) {
  const DoctorID = req.DoctorID

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
