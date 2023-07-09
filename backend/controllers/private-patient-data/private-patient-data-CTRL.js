import _ from "lodash"
import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat.js"
dayjs.extend(customParseFormat) // extend Day.js with the plugin
import { UUID_to_ID } from "../../db-and-security-and-helper-functions/UUID.js"
import FetchAllLists from "../../db-and-security-and-helper-functions/fetch-all-lists.js"
import {connection, DB_Operation} from "../../db-and-security-and-helper-functions/connect.js"
import { clearCookies } from "../../db-and-security-and-helper-functions/cookie-operations.js"
import FetchPatientAccountData from "../../db-and-security-and-helper-functions/fetch-data/fetch-patient-account-data.js"

/** newPatient registers the inputted user data into basic_Patient_info table
 *  All necessary information is sent via the request (PatientUUID, firname, lastname, etc.)
 * @param {Array} req Patient's UUID cookie, new_patient_object
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

    const new_patient_object = req.body.new_patient_object

    // Combine date parts into a single string
    const dateOfBirthStr = `${new_patient_object.DOB_month} ${new_patient_object.DOB_day} ${new_patient_object.DOB_year}`

    // Convert the string to a Date object and format it
    const dateOfBirth = dayjs(dateOfBirthStr, "MMMM D YYYY").format("YYYY-MM-DD")

    const basic_user_info = "basic_user_info"
    const sql = `INSERT INTO ${basic_user_info} (FirstName, LastName, Gender, DOB, User_ID) VALUES (?, ?, ?, ?, ?)`

    const values = [new_patient_object.FirstName, new_patient_object.LastName, new_patient_object.Gender, dateOfBirth, UserID]
    await DB_Operation(newPatient.name, basic_user_info)

    try {
        await connection.execute(sql, values)
        return res.status(200).json()
    } catch(error) {
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

    const UUID_reference = "UUID_reference"
    const sql = `SELECT UUID_referenceID FROM ${UUID_reference} WHERE UUID = ?`
    let values1 = [newPatientUUID]
    let values2 = [existingPatientUUID]
    await DB_Operation(newPatientConfirmation.name, UUID_reference)

    try {
        const [results1] = await connection.execute(sql, values1)
        const [results2] = await connection.execute(sql, values2)

        if (results1.length === 1 && results2.length === 1) {
            patientPermission = true
            return res.json(patientPermission)
        }
        else return res.json(patientPermission)
    } catch(error) {
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

    const [Appointments, service_and_category_list, addresses, basic_user_info] =
        ["Appointments", "service_and_category_list", "addresses", "basic_user_info"]

    const sql = `SELECT
            ${Appointments}.AppointmentsID, ${Appointments}.appointment_date, ${Appointments}.appointment_price, ${Appointments}.patient_message, ${Appointments}.Doctor_confirmation_status, ${Appointments}.Created_at,
            ${service_and_category_list}.Category_name, ${service_and_category_list}.Service_name,
            ${addresses}.address_title, ${addresses}.address_line_1, ${addresses}.address_line_2, ${addresses}.city, ${addresses}.state, ${addresses}.zip, ${addresses}.country,
            ${basic_user_info}.FirstName AS Doctor_FirstName, ${basic_user_info}.LastName AS Doctor_LastName
        FROM ${Appointments}
            INNER JOIN ${service_and_category_list} ON ${Appointments}.${service_and_category_list}_ID = ${service_and_category_list}.${service_and_category_list}ID
            INNER JOIN ${addresses} ON ${Appointments}.${addresses}_ID = ${addresses}.${addresses}ID AND ${addresses}.Doctor_ID = ${Appointments}.Doctor_ID
            INNER JOIN ${basic_user_info} ON ${Appointments}.Doctor_ID = ${basic_user_info}.User_ID
        WHERE
            ${Appointments}.Patient_ID = ?`

    const values = [PatientID]
    await DB_Operation(fetchDashboardData.name, Appointments)

    try {
        const [results] = await connection.execute(sql, values)
        if (_.isEmpty(results)) return res.json([])
        else{
            const DashboardData = results
            for (let i = 0; i < DashboardData.length; i++) {
                DashboardData[i].appointment_date = dayjs(DashboardData[i].appointment_date).format("MMMM D, YYYY, h:mm A")
                DashboardData[i].Created_at = dayjs(DashboardData[i].Created_at).format("MMMM D, YYYY, h:mm A")
            }
            return res.json(DashboardData)
        }
    } catch(error) {
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

    const basic_user_info = "basic_user_info"

    const sql = `SELECT FirstName, LastName, Gender, DOB FROM ${basic_user_info} WHERE User_ID = ?`
    const values = [PatientID]
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
            PersonalData = {
                FirstName: results[0].FirstName,
                LastName: results[0].LastName,
                Gender: results[0].Gender,
                DOB_month: dob.format("MMMM"),  // getting month name
                DOB_day: dob.date().toString(),  // getting day
                DOB_year: dob.year().toString()  // getting year
            }
            return res.json(PersonalData)
        }
    } catch(error) {
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
    } catch(error) {
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
    } catch(error) {
        return res.status(400).json([])
    }
}

export async function fetchInsurances (req, res) {
    try {
        const response = await FetchAllLists.fetchAllInsurances()
        return res.status(200).json(response)
    } catch(error) {
        return res.status(400).json([])
    }
}

/** fetchAccountDetails retrieves the Patient's Account Details
 *  Takes the patient's UUID, and converts to the patientID.
 *  Starts with an empty list, and appends objects from fetchPatientAccountData. Each function contains a specific data type (desciriptions, languages, etc)
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
    } catch(error) {
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
    } catch(error) {
        return res.status(400).json([])
    }
}
