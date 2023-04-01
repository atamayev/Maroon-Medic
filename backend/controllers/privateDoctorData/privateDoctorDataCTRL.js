import {connection, useDB} from "../../dbAndSecurity/connect.js";
import Crypto from "../../dbAndSecurity/crypto.js";
import { UUID_to_ID } from "../../dbAndSecurity/UUID.js";
import FetchDoctorAccountData from "./fetchDoctorAccountData.js";
import FetchAllDoctorLists from "./fetchAllDoctorLists.js";

/** newDoctor registers the inputted user data into basic_Doctor_info table
 *  All necessary information is sent via the request (DoctorUUID, firname, lastname, etc.)
 *  This data is encrypted using Crypto, and then inserting into the table.
 * @param {Array} req 
 * @param {Array} res If the user data is successfully added to table, return true. If not, return error--> front end doesn't allow
 * @returns true/error
 * DOCUMENTATION LAST UPDATED 3/16/23
 */
export async function newDoctor (req, res){
    const DoctorUUID = req.cookies.DoctorUUID
    const DoctorID = await UUID_to_ID(DoctorUUID, 'Doctor') // converts DoctorUUID to docid

    const new_doctor_object = req.body.new_doctor_object

    const table_name = 'basic_Doctor_info'
    const DB_name = 'DoctorDB'
    const encrypted = Crypto.encrypt_single_entry(new_doctor_object)

    const sql = `INSERT INTO ${table_name} (FirstName, LastName, Gender, DOB_month, DOB_day, DOB_year, Doctor_ID) VALUES (?,?,?,?,?,?,?)`;

    const values = [encrypted.FirstName, encrypted.LastName, encrypted.Gender, encrypted.DOB_month, encrypted.DOB_day, encrypted.DOB_year, DoctorID];
    await useDB(newDoctor.name, DB_name, table_name)
    
    try{
        await connection.execute(sql, values)
        return res.status(200).json(true);
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
    const table_name = `DoctorUUID_reference`
    const DB_name = `DoctorDB`;
    const sql = `SELECT * FROM ${table_name} WHERE DoctorUUID = ?`;
    let values = [newDoctorUUID];
    await useDB(newDoctorConfirmation.name, DB_name, table_name)

    try{
      const [results] = await connection.execute(sql, values)
      values = [existingDoctorUUID]
      const [results1] = await connection.execute(sql, values)

      if (results.length === 1 && results1.length ===1) {
        Doctor_permission = true;
        return res.status(200).json(Doctor_permission);
      } else {
        doctor_statusObj.is_new_doctor = false;
        return res.status(500).json(Doctor_permission);
      }
    }catch(error){
        console.log(`error in ${newDoctorConfirmation.name}:`, error)
        doctor_statusObj.is_new_doctor = false;
        return res.status(500).json(Doctor_permission);
    }
};

/** fetchDashboardData retrieves the Doctor's dashboard data. Currently dummy.
 *  Takes the doctor's UUID, and converts to the doctorID. Then, joins necessary tables to retrieve dashboard data
 * @param {Cookies} req Contains the user's cookies (DoctorUUID)
 * @param {Array} res Decrypted, or error
 * @returns Decrypted user data.
 * DOCUMENTATION LAST UPDATED 3/16/23
 */
export async function fetchDashboardData (req, res){
    const DoctorUUID = req.cookies.DoctorUUID
    const DoctorID = await UUID_to_ID(DoctorUUID, 'Doctor') // converts DoctorUUID to docid
    
    const table_name1 = 'Doctor_credentials';
    const table_name2 = 'basic_Doctor_info';
    const DB_name = 'DoctorDB';
  
    const sql = `SELECT email, FirstName, LastName, Gender, DOB_month, DOB_day, DOB_year FROM ${table_name1} LEFT JOIN ${table_name2} ON ${table_name1}.DoctorID = ${table_name2}.Doctor_ID WHERE ${table_name1}.DoctorID = ?`
    const values = [DoctorID];
    await useDB(fetchDashboardData.name, DB_name, table_name1)

    try{
        const [results] = await connection.execute(sql, values)
        if (results.length === 0) {
            console.log('User does not exist')
            res.send('User does not exist');
        } else {
            const decrypted = Crypto.decryptSingle(results[0])
            return res.status(200).json(decrypted);
        }
    }catch(error){
        return (`error in ${fetchDashboardData.name}:`, error)
    }
};

/** fetchPersonalData retrieves the Doctor's personal data.
 *  Currently almost identical to dashboard
 *  Takes the doctor's UUID, and converts to the doctorID. Then, joins necessary tables to retrieve dashboard data
 * @param {Cookies} req Contains the user's cookies (DoctorUUID)
 * @param {Array} res Decrypted, or error
 * @returns Decrypted user data.
 * DOCUMENTATION LAST UPDATED 3/16/23
 */
export async function fetchPersonalData (req, res){
    const DoctorUUID = req.cookies.DoctorUUID
    const DoctorID = await UUID_to_ID(DoctorUUID, 'Doctor') // converts DoctorUUID to docid
    
    const table_name = 'basic_Doctor_info';
    const DB_name = 'DoctorDB';
  
    const sql = `SELECT FirstName, LastName, Gender, DOB_month, DOB_day, DOB_year FROM ${table_name} WHERE Doctor_ID = ?`
    const values = [DoctorID];
    await useDB(fetchPersonalData.name, DB_name, table_name)

    try{
        const [results] = await connection.execute(sql, values)
        if (results.length === 0) {
            console.log('User does not exist')
            res.send({});
        } else {
            const decrypted = Crypto.decryptSingle(results[0])
            return res.status(200).json(decrypted);
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
 * @returns Decrypted user data.
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
