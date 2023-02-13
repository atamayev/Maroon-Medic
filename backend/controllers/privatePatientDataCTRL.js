import {connection, useDB} from "../dbAndSecurity/connect.js";
import Crypto from "../dbAndSecurity/crypto.js";
import { UUID_to_ID } from "../dbAndSecurity/UUID.js";
// all of the functions to add pt data, and pull it for necessary components on pt dashboard

export async function newPatient (req, res){
    // console.log('req.body',req.body)
    const PatientID = req.body.PatientID
    delete req.body.PatientID;

    const table_name = 'basic_Patient_info'
    const DB_name = 'PatientDB'
    const encrypted = Crypto.encrypt_single_entry(req.body)

    const sql = `INSERT INTO ${table_name} (FirstName, LastName, Gender, DOB_month, DOB_day, DOB_year, Patient_ID) VALUES (?,?,?,?,?,?,?)`;

    const values = [encrypted.firstName, encrypted.lastName, encrypted.gender, encrypted.DOBmonth, encrypted.DOBday, encrypted.DOByear, PatientID];
    await useDB(newPatient.name, DB_name, table_name)
    
    try{
        await connection.execute(sql, values)
        return res.status(200).json(true);
    }catch(error){
        console.log(`error in ${newPatient.name}`,error)
        return res.status(500).json(error);
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