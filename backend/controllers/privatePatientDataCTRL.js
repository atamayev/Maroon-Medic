import {connection, useDB} from "../dbAndSecurity/connect.js";
import Crypto from "../dbAndSecurity/crypto.js";
import { UUID_to_ID } from "../dbAndSecurity/UUID.js";
// all of the functions to add pt data, and pull it for necessary components on pt dashboard

export async function newPatient (req, res){
    // console.log('req.body',req.body)
    const PatientID = req.body.PatientID
    const new_patient_object = req.body.new_patient_object

    const table_name = 'basic_Patient_info'
    const DB_name = 'PatientDB'
    const encrypted = Crypto.encrypt_single_entry(new_patient_object)

    const sql = `INSERT INTO ${table_name} (FirstName, LastName, Gender, DOB_month, DOB_day, DOB_year, Patient_ID) VALUES (?,?,?,?,?,?,?)`;

    const values = [encrypted.FirstName, encrypted.LastName, encrypted.Gender, encrypted.DOB_month, encrypted.DOB_day, encrypted.DOB_year, PatientID];
    await useDB(newPatient.name, DB_name, table_name)
    
    try{
        await connection.execute(sql, values)
        return res.status(200).json(true);
    }catch(error){
        console.log(`error in ${newPatient.name}`,error)
        return res.status(500).json(error);
    }
};

export async function newPatientConfirmation (req, res){
    const PatientUUID = req.cookies.PatientUUID
    const newUserUUID = req.cookies.PatientNew_User
    if (!newUserUUID){
        return res.status(200).json("Unverified");
    }
    let verified = false;
    const table_name = `PatientUUID_reference`
    const DB_name = `PatientDB`;
    const sql = `SELECT * FROM ${table_name} WHERE PatientUUID = ?`;
    const values = [newUserUUID];
    await useDB(newPatientConfirmation.name, DB_name, table_name)

    try{
      const [results] = await connection.execute(sql, values)
      console.log(results);
      if (results.length === 1) {
        verified = true;
      } else {
        verified = false;
        return res.status(500).json("Unverified");
      }
    }catch(error){
      return (`error in ${newPatientConfirmation.name}:`, error)
    }

    if (PatientUUID && verified){
        console.log("New User")
        return res.status(200).json("New User");
    }else if (!PatientUUID && !verified){// makes sure that the user is new.
        console.log("No new Patient nor UUID")
        return res.status(200).json("No new Patient nor UUID");
    }else if (PatientUUID && !verified){
        console.log("UUID but not new Patient")
        return res.status(200).json("UUID but not new Patient");
    }else{
        console.log("New Patient but not UUID")
        return res.status(200).json("New Patient but not UUID");
    }
};

export async function dashboardData (req, res){
    const PatientUUID = req.cookies.PatientUUID
    const PatientID = await UUID_to_ID(PatientUUID, 'Patient') // converts PatientUUID to docid
    
    const table_name1 = 'Patient_credentials';
    const table_name2 = 'basic_Patient_info';
    const DB_name = 'PatientDB';
  
    const sql = `SELECT email, Created_at, FirstName, LastName, Gender, DOB_month, DOB_day, DOB_year FROM ${table_name1} LEFT JOIN ${table_name2} ON ${table_name1}.PatientID = ${table_name2}.Patient_ID WHERE ${table_name1}.PatientID = ?`
    const values = [PatientID];
    await useDB(dashboardData.name, DB_name, table_name1)
    // await useDB(dashboardData.name, DB_name, table_name2)

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
        return (`error in ${dashboardData.name}:`, error)
    }
};

export async function personalData (req, res){
    const PatientUUID = req.cookies.PatientUUID
    const PatientID = await UUID_to_ID(PatientUUID, 'Patient') // converts PatientUUID to docid
    
    const table_name = 'basic_Patient_info';
    const DB_name = 'PatientDB';
  
    const sql = `SELECT FirstName, LastName, Gender, DOB_month, DOB_day, DOB_year FROM ${table_name} WHERE Patient_ID = ?`
    const values = [PatientID];
    await useDB(personalData.name, DB_name, table_name)

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
        return (`error in ${personalData.name}:`, error)
    }
};
