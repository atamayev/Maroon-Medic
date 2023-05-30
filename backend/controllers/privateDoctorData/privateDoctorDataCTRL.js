import {connection, DB_Operation} from "../../dbAndSecurity/connect.js";
import { UUID_to_ID } from "../../dbAndSecurity/UUID.js";
import FetchDoctorAccountData from "./fetchDoctorAccountData.js";
import FetchAllDoctorLists from "./fetchAllDoctorLists.js";

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

    const table_name = 'basic_user_info'
    const sql = `INSERT INTO ${table_name} (FirstName, LastName, Gender, DOB_month, DOB_day, DOB_year, User_ID) VALUES (?,?,?,?,?,?,?)`;

    const values = [new_doctor_object.FirstName, new_doctor_object.LastName, new_doctor_object.Gender, new_doctor_object.DOB_month, new_doctor_object.DOB_day, new_doctor_object.DOB_year, User_ID];    await DB_Operation(newDoctor.name, table_name)
    
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

    if (!newDoctorUUID || !existingDoctorUUID){
        return res.status(200).json(Doctor_permission);
    }
    const table_name = 'UUID_reference';
    const sql = `SELECT UUID_referenceID FROM ${table_name} WHERE UUID = ?`;
    const values1 = [newDoctorUUID];
    const values2 = [existingDoctorUUID];
    await DB_Operation(newDoctorConfirmation.name, table_name)

    try{
      const [results1] = await connection.execute(sql, values1)
      const [results2] = await connection.execute(sql, values2)

        if (results1.length === 1 && results2.length === 1) {
            Doctor_permission = true;
            return res.status(200).json(Doctor_permission);
        }
        else {
            return res.status(500).json(Doctor_permission);
        }
    }catch(error){
        console.log(`error in ${newDoctorConfirmation.name}:`, error)
        return res.status(500).json(Doctor_permission);
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
    
    const table_name1 = 'Credentials';
    const table_name2 = 'basic_user_info';
  
    const sql = `SELECT email, FirstName, LastName, Gender, DOB_month, DOB_day, DOB_year FROM ${table_name1} LEFT JOIN ${table_name2} ON ${table_name1}.UserID = ${table_name2}.User_ID WHERE ${table_name1}.UserID = ?`
    const values = [DoctorID];
    await DB_Operation(fetchDashboardData.name, table_name1)

    try{
        const [results] = await connection.execute(sql, values)
        if (results.length === 0) {
            console.log('User does not exist')
            return res.status(400).json('User does not exist');
        } else {
            const DashboardData = results[0]
            return res.status(200).json(DashboardData);
        }
    }catch(error){
        return res.status(400).json(`error in ${fetchDashboardData.name}:`, error)
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
    
    const table_name = 'basic_user_info';
  
    const sql = `SELECT FirstName, LastName, Gender, DOB_month, DOB_day, DOB_year FROM ${table_name} WHERE User_ID = ?`
    const values = [DoctorID];
    await DB_Operation(fetchPersonalData.name, table_name)
    let PersonalData = {};

    try{
        const [results] = await connection.execute(sql, values)
        if (results.length === 0) {
            return res.send(PersonalData);
        } else {
            PersonalData = results[0];
            return res.status(200).json(PersonalData);
        }
    }catch(error){
        return (`error in ${fetchPersonalData.name}:`, error)
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
