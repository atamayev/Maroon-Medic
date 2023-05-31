import {connection, DB_Operation} from "../../dbAndSecurity/connect.js";
import { UUID_to_ID } from "../../dbAndSecurity/UUID.js";
import FetchDoctorAccountData from "./fetchDoctorAccountData.js";
import FetchAllDoctorLists from "./fetchAllDoctorLists.js";
import moment from "moment";

/** newDoctor registers the inputted user data into basic_Doctor_info table
 *  All necessary information is sent via the request (DoctorUUID, firname, lastname, etc.)
 * @param {Array} req 
 * @param {Array} res If the user data is successfully added to table, return true. If not, return error--> front end doesn't allow
 * @returns true/error
 * DOCUMENTATION LAST UPDATED 3/16/23
 */
export async function newDoctor (req, res){
    const DoctorUUID = req.cookies.DoctorUUID
    const User_ID = await UUID_to_ID(DoctorUUID) // converts DoctorUUID to docid

    const new_doctor_object = req.body.new_doctor_object

    const basic_user_info = 'basic_user_info'
    const sql = `INSERT INTO ${basic_user_info} (FirstName, LastName, Gender, DOB_month, DOB_day, DOB_year, User_ID) VALUES (?,?,?,?,?,?,?)`;

    const values = [new_doctor_object.FirstName, new_doctor_object.LastName, new_doctor_object.Gender, new_doctor_object.DOB_month, new_doctor_object.DOB_day, new_doctor_object.DOB_year, User_ID];    
    await DB_Operation(newDoctor.name, basic_user_info)
    
    try{
        await connection.execute(sql, values)
        return res.status(200).json();
    }catch(error){
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
export async function newDoctorConfirmation (req, res){
    let Doctor_permission = false;
    const newDoctorUUID = req.cookies.DoctorNew_User
    const existingDoctorUUID = req.cookies.DoctorUUID

    if (!newDoctorUUID || !existingDoctorUUID) return res.json(Doctor_permission);

    const UUID_reference = 'UUID_reference';
    const sql = `SELECT UUID_referenceID FROM ${UUID_reference} WHERE UUID = ?`;
    const values1 = [newDoctorUUID];
    const values2 = [existingDoctorUUID];
    await DB_Operation(newDoctorConfirmation.name, UUID_reference)

    try{
      const [results1] = await connection.execute(sql, values1)
      const [results2] = await connection.execute(sql, values2)

        if (results1.length === 1 && results2.length === 1) {
            Doctor_permission = true;
            return res.json(Doctor_permission);
        }
        else return res.json(Doctor_permission);
    }catch(error){
        console.log(`error in ${newDoctorConfirmation.name}:`, error)
        return res.json(Doctor_permission);
    }
};

/** fetchDashboardData retrieves the Doctor's dashboard data. Currently dummy.
 *  Takes the doctor's UUID, and converts to the doctorID. Then, joins necessary tables to retrieve dashboard data
 * @param {Cookies} req Contains the user's cookies (DoctorUUID)
 * @param {Array} res User data, or error
 * @returns User data.
 * DOCUMENTATION LAST UPDATED 3/16/23
 */
export async function fetchDashboardData (req, res){
    const DoctorUUID = req.cookies.DoctorUUID
    const DoctorID = await UUID_to_ID(DoctorUUID);
    const [Appointments, service_and_category_list, addresses, basic_user_info] = 
        ['Appointments', 'service_and_category_list', 'addresses', 'basic_user_info'];

    const sql = `SELECT 
            ${Appointments}.AppointmentsID, ${Appointments}.appointment_date, ${Appointments}.patient_message, ${Appointments}.Doctor_confirmation_status, ${Appointments}.Created_at,
            ${service_and_category_list}.Category_name, ${service_and_category_list}.Service_name, 
            ${addresses}.address_title, ${addresses}.address_line_1, ${addresses}.address_line_2, ${addresses}.city, ${addresses}.state, ${addresses}.zip, ${addresses}.country,
            ${basic_user_info}.FirstName AS Patient_FirstName, ${basic_user_info}.LastName AS Patient_FirstName
        FROM ${Appointments}
            INNER JOIN ${service_and_category_list} ON ${Appointments}.${service_and_category_list}_ID = ${service_and_category_list}.${service_and_category_list}ID
            INNER JOIN ${addresses} ON ${Appointments}.${addresses}_ID = ${addresses}.${addresses}ID AND ${addresses}.Doctor_ID = ${Appointments}.Doctor_ID
            INNER JOIN ${basic_user_info} ON ${Appointments}.Patient_ID = ${basic_user_info}.User_ID
        WHERE
            ${Appointments}.Doctor_ID = ?`;

    const values = [DoctorID];
    await DB_Operation(fetchDashboardData.name, Appointments);

    try{
        const [results] = await connection.execute(sql, values)
        if (results.length === 0) return res.json([]);
        else{
            const DashboardData = results
            for (let i = 0; i < DashboardData.length; i++){
                DashboardData[i].appointment_date = moment(DashboardData[i].appointment_date).format('MMMM Do, YYYY, h:mm A');
                DashboardData[i].Created_at = moment(DashboardData[i].Created_at).format('MMMM Do, YYYY, h:mm A');                
            }
            return res.json(DashboardData);
        } 
    }catch(error){
        console.log(`error in ${fetchDashboardData.name}:`, error );
        return res.json([]);
    }
};

/** fetchPersonalData retrieves the Doctor's personal data.
 *  Currently almost identical to dashboard
 *  Takes the doctor's UUID, and converts to the doctorID. Then, joins necessary tables to retrieve dashboard data
 * @param {Cookies} req Contains the user's cookies (DoctorUUID)
 * @param {Array} res User data, or error
 * @returns User data.
 * DOCUMENTATION LAST UPDATED 3/16/23
 */
export async function fetchPersonalData (req, res){
    const DoctorUUID = req.cookies.DoctorUUID
    const DoctorID = await UUID_to_ID(DoctorUUID) // converts DoctorUUID to docid
    
    const basic_user_info = 'basic_user_info';
  
    const sql = `SELECT FirstName, LastName, Gender, DOB_month, DOB_day, DOB_year FROM ${basic_user_info} WHERE User_ID = ?`
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

    try{
        const [results] = await connection.execute(sql, values);
        if (results.length === 0) return res.json(PersonalData);
        else {
            PersonalData = results[0];
            return res.json(PersonalData);
        }
    }catch(error){
        console.log(`error in ${fetchPersonalData.name}:`, error);
        return res.json(PersonalData);
    }
};

export async function confirmAppointment (req, res){
    const AppointmentID = req.body.AppointmentID;
    const Appointments = 'Appointments'

    const sql1 = `UPDATE ${Appointments} SET Doctor_confirmation_status = 1 WHERE appointmentsID = ?`
    const values = [AppointmentID];
    try{
        await connection.execute(sql1, values);
        return res.status(200).json();
    }catch(error){
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
export async function fetchAccountDetails (req, res){
    const DoctorUUID = req.cookies.DoctorUUID;
    const DoctorID = await UUID_to_ID(DoctorUUID, 'Doctor');
    let response = [];
    try{
        response.push(await FetchDoctorAccountData.FetchDoctorInsurances(DoctorID));
        response.push(await FetchDoctorAccountData.FetchDoctorLanguages(DoctorID)); 
        response.push(await FetchDoctorAccountData.FetchDoctorServices(DoctorID));
        response.push(await FetchDoctorAccountData.FetchDoctorSpecialties(DoctorID));
        response.push(await FetchDoctorAccountData.FetchPreVetEducation(DoctorID));
        response.push(await FetchDoctorAccountData.FetchVetEducation(DoctorID));
        response.push(await FetchDoctorAccountData.FetchDoctorAddressData(DoctorID));
        response.push(await FetchDoctorAccountData.FetchDescriptionData(DoctorID)); 
        response.push(await FetchDoctorAccountData.FetchDoctorPictures(DoctorID));
        response.push(await FetchDoctorAccountData.FetchPubliclyAvailable(DoctorID));
        return res.status(200).json(response);
    }catch(error){
        console.log('error in accountDetails', error);
        const emptyResponse = [];
        return res.status(400).json(emptyResponse);
    }
};

/** fetchAccountDetails creates a list of objects contains all of the Lists from the DB
 *  Doctors fill in their personal details using options from these lists.
 * @param {N/A} req 
 * @param {Array} res An Array of objects, filled with all possible list data
 * @returns Objects from List data
 * DOCUMENTATION LAST UPDATED 3/16/23
 */
export async function FetchDoctorLists (req, res){
    try{
        let response = [];
        response.push(await FetchAllDoctorLists.fetchAllInsurances());
        response.push(await FetchAllDoctorLists.fetchAllLanguages());
        response.push(await FetchAllDoctorLists.fetchAllServicesAndCategories());
        response.push(await FetchAllDoctorLists.fetchAllSpecialties());
        response.push(await FetchAllDoctorLists.fetchAllPreVetSchools());
        response.push(await FetchAllDoctorLists.fetchAllPreVetEducationTypes());
        response.push(await FetchAllDoctorLists.fetchAllMajors());
        response.push(await FetchAllDoctorLists.fetchAllVetSchools());
        response.push(await FetchAllDoctorLists.fetchAllVetEducationTypes());
        return res.status(200).json(response);
    }catch(error){
        console.log('error in accountDetails', error);
        const emptyResponse = [];
        return res.status(400).json(emptyResponse);
    }
};
