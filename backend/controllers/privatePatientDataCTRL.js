import {connection, DB_Operation} from "../dbAndSecurity/connect.js";
import Crypto from "../dbAndSecurity/crypto.js";
import { UUID_to_ID } from "../dbAndSecurity/UUID.js";
// all of the functions to add pt data, and pull it for necessary components on pt dashboard

/** newPatient registers the inputted user data into basic_Patient_info table
 *  All necessary information is sent via the request (PatientUUID, firname, lastname, etc.)
 *  This data is encrypted using Crypto, and then inserting into the table.
 * @param {Array} req 
 * @param {Array} res If the user data is successfully added to table, return true. If not, return error--> front end doesn't allow
 * @returns true/error
 * DOCUMENTATION LAST UPDATED 3/16/23
 */
export async function newPatient (req, res){
    const PatientUUID = req.cookies.PatientUUID
    const User_ID = await UUID_to_ID(PatientUUID) // converts PatientUUID to docid
    
    const new_patient_object = req.body.new_patient_object

    const table_name = 'basic_user_info'
    const encrypted = Crypto.encrypt_single_entry(new_patient_object)

    const sql = `INSERT INTO ${table_name} (FirstName, LastName, Gender, DOB_month, DOB_day, DOB_year, User_ID) VALUES (?,?,?,?,?,?,?)`;

    const values = [encrypted.FirstName, encrypted.LastName, encrypted.Gender, encrypted.DOB_month, encrypted.DOB_day, encrypted.DOB_year, User_ID];
    await DB_Operation(newPatient.name, table_name)
    
    try{
        await connection.execute(sql, values)
        return res.status(200).json();
    }catch(error){
        console.log(`error in ${newPatient.name}`,error)
        return res.status(500).json(error);
    }
};

/** newPatientConfirmation makes sure that the user on the site is a new Patient
 *  If newPatientUUID or the regular PatientUUID don't exist, returns false.
 *  If both the PatientUUID and newPatientUUID exist in DB, then returns true, else returns false.
 * @param {Array} req 
 * @param {Array} res If the user data is successfully found in the table to table, return true. If not, return false --> front-end re-directs to register page
 * @returns true/false
 * DOCUMENTATION LAST UPDATED 3/16/23
 */
export async function newPatientConfirmation (req, res){
    let Patient_permission = false;
    const newPatientUUID = req.cookies.PatientNew_User
    const existingPatientUUID = req.cookies.PatientUUID

    if (!newPatientUUID || !existingPatientUUID){
        return res.status(200).json(Patient_permission);
    }
    const table_name = 'UUID_reference';
    const sql = `SELECT UUID_referenceID FROM ${table_name} WHERE UUID = ?`;
    let values1 = [newPatientUUID];
    let values2 = [existingPatientUUID];
    await DB_Operation(newPatientConfirmation.name, table_name)

    try{
        const [results1] = await connection.execute(sql, values1)
        const [results2] = await connection.execute(sql, values2)

        if (results1.length === 1 && results2.length === 1) {
            Patient_permission = true;
            return res.status(200).json(Patient_permission);
        } else {
            Patient_statusObj.is_new_Patient = false;
            return res.status(500).json(Patient_permission);
        }
    }catch(error){
        console.log(`error in ${newPatientConfirmation.name}:`, error)
        Patient_statusObj.is_new_Patient = false;
        return res.status(500).json(Patient_permission);
    }
};

/** fetchDashboardData retrieves the Patient's dashboard data. Currently dummy.
 *  Takes the Patient's UUID, and converts to the PatientID. Then, joins necessary tables to retrieve dashboard data
 * @param {Cookies} req Contains the user's cookies (PatientUUID)
 * @param {Array} res Decrypted, or error
 * @returns Decrypted user data.
 * DOCUMENTATION LAST UPDATED 3/16/23
 */
export async function fetchDashboardData (req, res){
    const PatientUUID = req.cookies.PatientUUID
    const PatientID = await UUID_to_ID(PatientUUID) // converts PatientUUID to docid
    
    const table_name1 = 'Credentials';
    const table_name2 = 'basic_user_info';
  
    const sql = `SELECT email, FirstName, LastName, Gender, DOB_month, DOB_day, DOB_year FROM ${table_name1} LEFT JOIN ${table_name2} ON ${table_name1}.UserID = ${table_name2}.User_ID WHERE ${table_name1}.UserID = ?`
    const values = [PatientID];
    await DB_Operation(fetchDashboardData.name, table_name1)

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

/** fetchPersonalData retrieves the Patient's personal data.
 *  Currently almost identical to dashboard
 *  Takes the Patient's UUID, and converts to the PatientID. Then, joins necessary tables to retrieve dashboard data
 * @param {Cookies} req Contains the user's cookies (PatientUUID)
 * @param {Array} res Decrypted, or error
 * @returns Decrypted user data.
 * DOCUMENTATION LAST UPDATED 3/16/23
 */
export async function fetchPersonalData (req, res){
    const PatientUUID = req.cookies.PatientUUID
    const PatientID = await UUID_to_ID(PatientUUID) // converts PatientUUID to docid
    
    const table_name = 'basic_user_info';
  
    const sql = `SELECT FirstName, LastName, Gender, DOB_month, DOB_day, DOB_year FROM ${table_name} WHERE User_ID = ?`
    const values = [PatientID];
    await DB_Operation(fetchPersonalData.name, table_name)

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

export async function savePersonalData (req, res){
    const PatientUUID = req.cookies.PatientUUID
    const PatientID = await UUID_to_ID(PatientUUID) // converts PatientUUID to PatientID
    
    const personalInfo = req.body.personalInfo;
    const encrypted_personalInfo = Crypto.encrypt_single_entry(personalInfo)

    const table_name = 'basic_user_info';
    const sql = `SELECT * FROM  ${table_name} WHERE User_ID = ?`
    const values = [PatientID];
    let results;
    
    await DB_Operation(savePersonalData.name, table_name);
    try{
        [results] = await connection.execute(sql, values);
    }catch(error){
        console.log(`error in ${savePersonalData.name}:`, error)
        return res.status(200).json(false);
    }

    if (!results.length){// if no results, then insert.
        const sql1 = `INSERT INTO ${table_name} (FirstName, LastName, Gender, DOB_month, DOB_day, DOB_year, User_ID) VALUES (?,?,?,?,?,?,?)`;
        const values1 = [encrypted_personalInfo.FirstName, encrypted_personalInfo.LastName, encrypted_personalInfo.Gender, encrypted_personalInfo.DOB_month, encrypted_personalInfo.DOB_day, encrypted_personalInfo.DOB_year, PatientID];
        try{
            await connection.execute(sql1, values1);
            return res.status(200).json(true);
        }catch(error){
            console.log(`error in if ${savePersonalData.name}:`, error);
            return res.status(200).json(false);
        }
    }else{// if there are results, that means that the record exists, and needs to be altered
        const sql2 = `UPDATE ${table_name} SET FirstName = ?, LastName = ?, Gender = ?, DOB_month = ?, DOB_day = ?, DOB_year = ? WHERE User_ID = ?`;
        const values2 = [encrypted_personalInfo.FirstName, encrypted_personalInfo.LastName, encrypted_personalInfo.Gender, encrypted_personalInfo.DOB_month, encrypted_personalInfo.DOB_day, encrypted_personalInfo.DOB_year, PatientID];
        try{
            await connection.execute(sql2, values2);
            return res.status(200).json(true);
        }catch(error){
            console.log(`error in else ${savePersonalData.name}:`, error);
            return res.status(200).json(false);
        }
    }
};
