import {connection, DB_Operation} from "../../dbAndSecurityAndHelperFunctions/connect.js";
import { UUID_to_ID } from "../../dbAndSecurityAndHelperFunctions/UUID.js";
import FetchDoctorAccountData from "./fetchDoctorAccountData.js";
import FetchAllLists from "../../dbAndSecurityAndHelperFunctions/fetchAllLists.js";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat.js"
dayjs.extend(customParseFormat); // extend Day.js with the plugin
import _ from "lodash"
import { clearCookies } from "../../dbAndSecurityAndHelperFunctions/cookieOperations.js";

/** newDoctor registers the inputted user data into basic_Doctor_info table
 *  All necessary information is sent via the request (DoctorUUID, firname, lastname, etc.)
 * @param {Array} req 
 * @param {Array} res If the user data is successfully added to table, return true. If not, return error--> front end doesn't allow
 * @returns true/error
 * DOCUMENTATION LAST UPDATED 3/16/23
 */
export async function newDoctor (req, res) {
    const DoctorUUID = req.cookies.DoctorUUID
    let User_ID;

    try {
        User_ID = await UUID_to_ID(DoctorUUID);
    } catch (error) {
        console.log('Error in UUID to ID conversion')
        clearCookies('Doctor', res)
        return res.status(500).json();
    }

    const new_doctor_object = req.body.new_doctor_object

    // Combine date parts into a single string
    const dateOfBirthStr = `${new_doctor_object.DOB_month} ${new_doctor_object.DOB_day} ${new_doctor_object.DOB_year}`;

    // Convert the string to a Date object and format it
    const dateOfBirth = dayjs(dateOfBirthStr, 'MMMM D YYYY').format('YYYY-MM-DD');

    const basic_user_info = 'basic_user_info'
    const sql = `INSERT INTO ${basic_user_info} (FirstName, LastName, Gender, DOB, User_ID) VALUES (?, ?, ?, ?, ?)`;

    const values = [new_doctor_object.FirstName, new_doctor_object.LastName, new_doctor_object.Gender, dateOfBirth, User_ID];    
    await DB_Operation(newDoctor.name, basic_user_info)
    
    try {
        await connection.execute(sql, values)
        return res.status(200).json();
    } catch(error) {
        console.log(`error in ${newDoctor.name}`,error)
        return res.status(500).json(error);
    }
};

/** newDoctorConfirmation makes sure that the user on the site is a new Doctor
 *  If newDoctorUUID or the regular DoctorUUID don't exist, returns false.
 *  If both the DoctorUUID and newDoctorUUID exist in DB, then returns true, else returns false.
 * @param {Cookies} req Contains the user's cookies (newUser, and DoctorUUID)
 * @param {Array} res If the user data is successfully found in the table to table, return true. If not, return false --> front-end re-directs to register page
 * @returns true/false
 * DOCUMENTATION LAST UPDATED 3/16/23
 */
export async function newDoctorConfirmation (req, res) {
    let Doctor_permission = false;
    const newDoctorUUID = req.cookies.DoctorNew_User
    const existingDoctorUUID = req.cookies.DoctorUUID

    if (!newDoctorUUID || !existingDoctorUUID) return res.json(Doctor_permission);

    const UUID_reference = 'UUID_reference';
    const sql = `SELECT UUID_referenceID FROM ${UUID_reference} WHERE UUID = ?`;
    const values1 = [newDoctorUUID];
    const values2 = [existingDoctorUUID];
    await DB_Operation(newDoctorConfirmation.name, UUID_reference)

    try {
      const [results1] = await connection.execute(sql, values1)
      const [results2] = await connection.execute(sql, values2)

        if (results1.length === 1 && results2.length === 1) {
            Doctor_permission = true;
            return res.json(Doctor_permission);
        }
        else return res.json(Doctor_permission);
    } catch(error) {
        console.log(`error in ${newDoctorConfirmation.name}:`, error)
        return res.json(Doctor_permission);
    }
};

/** fetchDashboardData retrieves the upcoming appointments, services, and personal information (FirstName, LastName) .
 *  Takes the doctor's UUID, and converts to the doctorID. Then, joins necessary tables to retrieve dashboard data
 * @param {Cookies} req Contains the user's cookies (DoctorUUID)
 * @param {Array} res User data, or error
 * @returns User data.
 * DOCUMENTATION LAST UPDATED 6/4/23
 */
export async function fetchDashboardData (req, res) {
    const DoctorUUID = req.cookies.DoctorUUID
    let DoctorID;
    try {
        DoctorID = await UUID_to_ID(DoctorUUID);
    } catch (error) {
        console.log('Error in UUID to ID conversion')
        clearCookies('Doctor', res)
        return res.status(500).json();
    }

    const [Appointments, service_and_category_list, addresses, basic_user_info] = 
        ['Appointments', 'service_and_category_list', 'addresses', 'basic_user_info'];

    const sql = `SELECT 
            ${Appointments}.AppointmentsID, ${Appointments}.appointment_date, ${Appointments}.patient_message, ${Appointments}.Doctor_confirmation_status, ${Appointments}.Created_at,
            ${service_and_category_list}.Category_name, ${service_and_category_list}.Service_name, 
            ${addresses}.address_title, ${addresses}.address_line_1, ${addresses}.address_line_2, ${addresses}.city, ${addresses}.state, ${addresses}.zip, ${addresses}.country,
            ${basic_user_info}.FirstName AS Patient_FirstName, ${basic_user_info}.LastName AS Patient_LastName
        FROM ${Appointments}
            INNER JOIN ${service_and_category_list} ON ${Appointments}.${service_and_category_list}_ID = ${service_and_category_list}.${service_and_category_list}ID
            INNER JOIN ${addresses} ON ${Appointments}.${addresses}_ID = ${addresses}.${addresses}ID AND ${addresses}.Doctor_ID = ${Appointments}.Doctor_ID
            INNER JOIN ${basic_user_info} ON ${Appointments}.Patient_ID = ${basic_user_info}.User_ID
        WHERE
            ${Appointments}.Doctor_ID = ?`;

    const values = [DoctorID];
    await DB_Operation(fetchDashboardData.name, Appointments);

    try {
        const [results] = await connection.execute(sql, values)
        if (_.isEmpty(results)) return res.json([]);
        else{
            const DashboardData = results
            for (let i = 0; i < DashboardData.length; i++) {
                DashboardData[i].appointment_date = dayjs(DashboardData[i].appointment_date).format('MMMM D, YYYY, h:mm A');
                DashboardData[i].Created_at = dayjs(DashboardData[i].Created_at).format('MMMM D, YYYY, h:mm A');
            }
            return res.json(DashboardData);
        } 
    } catch(error) {
        console.log(`error in ${fetchDashboardData.name}:`, error );
        return res.json([]);
    }
};

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
    let DoctorID;
    try {
        DoctorID = await UUID_to_ID(DoctorUUID);
    } catch (error) {
        console.log('Error in UUID to ID conversion')
        clearCookies('Doctor', res)
        return res.status(500).json();
    }

    const basic_user_info = 'basic_user_info';
  
    const sql = `SELECT FirstName, LastName, Gender, DOB FROM ${basic_user_info} WHERE User_ID = ?`
    const values = [DoctorID];
    await DB_Operation(fetchPersonalData.name, basic_user_info);

    let PersonalData = {
        FirstName: '',
        LastName: '',
        Gender: '',
        DOB_month: '',
        DOB_day: '',
        DOB_year: ''
    };

    try {
        const [results] = await connection.execute(sql, values);
        if (_.isEmpty(results)) return res.json(PersonalData);
        else {
            let dob = dayjs(results[0].DOB);
            PersonalData = {
                FirstName: results[0].FirstName,
                LastName: results[0].LastName,
                Gender: results[0].Gender,
                DOB_month: dob.format('MMMM'),  // getting month name
                DOB_day: dob.date().toString(),  // getting day
                DOB_year: dob.year().toString()  // getting year
            };
            return res.json(PersonalData);
        }
    } catch(error) {
        console.log(`error in ${fetchPersonalData.name}:`, error);
        return res.json(PersonalData);
    }
};

/** confirmAppointment allows for a doctor to confirm an incoming pt appointment
 *  Sets the Doctor_confirmation_status where the appointment ID is whatever is in the request
 * @param {Cookies} req Contains the appointmentID
 * @param {Array} res Status code (200: success, 400: failure)
 * @returns Status code (200, 400)
 * DOCUMENTATION LAST UPDATED 6/423
 */
export async function confirmAppointment (req, res) {
    const AppointmentID = req.body.AppointmentID;
    const Appointments = 'Appointments'

    const sql = `UPDATE ${Appointments} SET Doctor_confirmation_status = 1 WHERE appointmentsID = ?`
    const values = [AppointmentID];
    try {
        await connection.execute(sql, values);
        return res.status(200).json();
    } catch(error) {
        console.log(`error in confirming appointment ${confirmAppointment.name}:`, error);
        return res.status(400).json();
    }
};

/** fetchAccountDetails retrieves the Doctor's Account Details
 *  Takes the doctor's UUID, and converts to the doctorID.
 *  Starts with an empty list, and appends objects from fetchDoctorAccountData. Each function contains a specific data type (desciriptions, languages, etc)
 * @param {Cookies} req Contains the user's cookies (DoctorUUID)
 * @param {Array} res List with user account details
 * @returns User data.
 * DOCUMENTATION LAST UPDATED 3/16/23
 */
export async function fetchAccountDetails (req, res) {
    const DoctorUUID = req.cookies.DoctorUUID;
    let DoctorID;
    try {
        DoctorID = await UUID_to_ID(DoctorUUID);
    } catch (error) {
        console.log('Error in UUID to ID conversion', error)
        clearCookies('Doctor', res)
        return res.status(500).json();
    }

    console.log('DoctorID',DoctorID)
    
    try {
        let response = [];
        response.push(await FetchDoctorAccountData.FetchDoctorLanguages(DoctorID)); 
        response.push(await FetchDoctorAccountData.FetchDoctorServices(DoctorID));
        response.push(await FetchDoctorAccountData.FetchDoctorSpecialties(DoctorID));
        response.push(await FetchDoctorAccountData.FetchPreVetEducation(DoctorID));
        response.push(await FetchDoctorAccountData.FetchVetEducation(DoctorID));
        response.push(await FetchDoctorAccountData.FetchDoctorAddressData(DoctorID));
        response.push(await FetchDoctorAccountData.FetchDescriptionData(DoctorID)); 
        response.push(await FetchDoctorAccountData.FetchServicedPets(DoctorID));
        response.push(await FetchDoctorAccountData.FetchPubliclyAvailable(DoctorID));
        response.push(await FetchDoctorAccountData.FetchDoctorPictures(DoctorID));
        return res.status(200).json(response);
    } catch(error) {
        console.log('error in accountDetails', error);
        return res.status(400).json([]);
    }
};

/** fetchAccountDetails creates a list of objects contains all of the Lists from the DB
 *  Doctors fill in their personal details using options from these lists.
 * @param {N/A} req 
 * @param {Array} res An Array of objects, filled with all possible list data
 * @returns Objects from List data
 * DOCUMENTATION LAST UPDATED 3/16/23
 */
export async function fetchDoctorLists (req, res) {
    try {
        let response = [];
        response.push(await FetchAllLists.fetchAllLanguages());
        response.push(await FetchAllLists.fetchAllServicesAndCategories());
        response.push(await FetchAllLists.fetchAllSpecialties());
        response.push(await FetchAllLists.fetchAllPreVetSchools());
        response.push(await FetchAllLists.fetchAllPreVetEducationTypes());
        response.push(await FetchAllLists.fetchAllMajors());
        response.push(await FetchAllLists.fetchAllVetSchools());
        response.push(await FetchAllLists.fetchAllVetEducationTypes());
        response.push(await FetchAllLists.fetchAllPets());
        return res.status(200).json(response);
    } catch(error) {
        console.log('error in accountDetails', error);
        return res.status(400).json([]);
    }
};
