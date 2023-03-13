import {connection, useDB} from "../../dbAndSecurity/connect.js";
import Crypto from "../../dbAndSecurity/crypto.js";
import { UUID_to_ID } from "../../dbAndSecurity/UUID.js";
import FetchDoctorData from "./DoctorDBOperations.js";

/** newDoctor registers the inputted user data into basic_Doctor_info table
 *  All necessary information is sent via the request (DocID, firname, lastname, etc.)
 *  This data is encrypted using Crypto, and then inserting into the table.
 * @param {Array} req 
 * @param {Array} res If the user data is successfully added to table, return true. If not, return error--> front end doesn't allow
 * @returns true/error
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

export async function newDoctorConfirmation (req, res){
    const DoctorUUID = req.cookies.DoctorUUID
    const newUserUUID = req.cookies.DoctorNew_User
    if (!newUserUUID){
        return res.status(200).json("Unverified");
    }
    let verified = false;
    const table_name = `DoctorUUID_reference`
    const DB_name = `DoctorDB`;
    const sql = `SELECT * FROM ${table_name} WHERE DoctorUUID = ?`;
    const values = [newUserUUID];
    await useDB(newDoctorConfirmation.name, DB_name, table_name)

    try{
      const [results] = await connection.execute(sql, values)
      if (results.length === 1) {
        verified = true;
      } else {
        verified = false;
        return res.status(500).json("Unverified");
      }
    }catch(error){
      return (`error in ${newDoctorConfirmation.name}:`, error)
    }

    if (DoctorUUID && verified){
        console.log("New User")
        return res.status(200).json("New User");
    }else if (!DoctorUUID && !verified){// makes sure that the user is new.
        console.log("No new Doctor nor UUID")
        return res.status(200).json("No new Doctor nor UUID");
    }else if (DoctorUUID && !verified){
        console.log("UUID but not new Doctor")
        return res.status(200).json("UUID but not new Doctor");
    }else{
        console.log("New Doctor but not UUID")
        return res.status(200).json("New Doctor but not UUID");
    }
};

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

export async function fetchAccountDetails (req, res){
    const DoctorUUID = req.cookies.DoctorUUID;
    const DoctorID = await UUID_to_ID(DoctorUUID, 'Doctor');
    let response = [];

    try{
        response.push(await FetchDoctorData.FetchDescriptionData(DoctorID)); 
        response.push(await FetchDoctorData.FetchDoctorLanguages(DoctorID)); 
        response.push(await FetchDoctorData.FetchDoctorPictures(DoctorID));
        response.push(await FetchDoctorData.FetchDoctorServices(DoctorID));
        response.push(await FetchDoctorData.FetchDoctorAddressData(DoctorID));
        response.push(await FetchDoctorData.FetchDoctorCertifications(DoctorID));
        response.push(await FetchDoctorData.FetchDoctorInsurances(DoctorID));
        response.push(await FetchDoctorData.FetchDoctorEducation(DoctorID));
        response.push(await FetchDoctorData.FetchPubliclyAvailable(DoctorID));
        return res.status(200).json(response);
    }catch(error){
        console.log('error in accountDetails', error);
        const emptyResponse = [];
        return res.status(200).json(emptyResponse);
    }
};
