import {connection, useDB} from "../dbAndSecurity/connect.js";
import Crypto from "../dbAndSecurity/crypto.js";
import { UUID_to_ID } from "../dbAndSecurity/UUID.js";
/** newDoctor registers the inputted user data into basic_Doctor_info table
 *  All necessary information is sent via the request (DocID, firname, lastname, etc.)
 *  This data is encrypted using Crypto, and then inserting into the table.
 * @param {Array} req 
 * @param {Array} res If the user data is successfully added to table, return true. If not, return error--> front end doesn't allow
 * @returns true/error
 */
export async function newDoctor (req, res){
    const DoctorID = req.body.DoctorID
    delete req.body.DoctorID; // deleted so its not encrypted (useless to encrypt)

    const table_name = 'basic_Doctor_info'
    const DB_name = 'DoctorDB'
    const encrypted = Crypto.encrypt_single_entry(req.body)

    const sql = `INSERT INTO ${table_name} (FirstName, LastName, Gender, DOB_month, DOB_day, DOB_year, Doctor_ID) VALUES (?,?,?,?,?,?,?)`;

    const values = [encrypted.firstName, encrypted.lastName, encrypted.gender, encrypted.DOBmonth, encrypted.DOBday, encrypted.DOByear, DoctorID];
    await useDB(newDoctor.name, DB_name, table_name)
    
    try{
        await connection.execute(sql, values)
        return res.status(200).json(true);
    }catch(error){
        console.log(`error in ${newDoctor.name}`,error)
        return res.status(500).json(error);
    }
}

export async function dashboardData (req, res){
    const DoctorUUID = req.cookies.DoctorUUID
    const DoctorID = await UUID_to_ID(DoctorUUID, 'Doctor') // converts DoctorUUID to docid
    
    const table_name1 = 'Doctor_credentials';
    const table_name2 = 'basic_Doctor_info';
    const DB_name = 'DoctorDB';
  
    const sql = `SELECT email, Created_at, FirstName, LastName, Gender, DOB_month, DOB_day, DOB_year FROM ${table_name1} LEFT JOIN ${table_name2} ON ${table_name1}.DoctorID = ${table_name2}.Doctor_ID WHERE ${table_name1}.DoctorID = ?`
    const values = [DoctorID];
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
    const DoctorUUID = req.cookies.DoctorUUID
    const DoctorID = await UUID_to_ID(DoctorUUID, 'Doctor') // converts DoctorUUID to docid
    
    const table_name = 'basic_Doctor_info';
    const DB_name = 'DoctorDB';
  
    const sql = `SELECT FirstName, LastName, Gender, DOB_month, DOB_day, DOB_year FROM ${table_name} WHERE Doctor_ID = ?`
    const values = [DoctorID];
    await useDB(personalData.name, DB_name, table_name)

    try{
        const [results] = await connection.execute(sql, values)
        if (results.length === 0) {
            console.log('User does not exist')
            res.send({});
        } else {
            const decrypted = Crypto.decryptSingle(results[0])
            console.log(decrypted)
            return res.status(200).json(decrypted);
        }
    }catch(error){
        return (`error in ${personalData.name}:`, error)
    }
};

export async function savePersonalData (req, res){
    const DoctorUUID = req.cookies.DoctorUUID
    const DoctorID = await UUID_to_ID(DoctorUUID, 'Doctor') // converts DoctorUUID to docid
    
    const personalInfo = req.body.personalInfo;
    const encrypted_personalInfo = Crypto.encrypt_single_entry(personalInfo)

    const DB_name = 'DoctorDB';

    const table_name = 'basic_Doctor_info';
    const sql = `INSERT INTO ${table_name} (FirstName, LastName, Gender, DOB_month, DOB_day, DOB_year, Doctor_ID) VALUES (?,?,?,?,?,?,?) ON DUPLICATE KEY UPDATE FirstName = ?, LastName = ?, Gender = ?, DOB_month = ?, DOB_day = ?, DOB_year = ?`;
   
    const values = [encrypted_personalInfo.FirstName, encrypted_personalInfo.LastName, encrypted_personalInfo.Gender, encrypted_personalInfo.DOB_month, encrypted_personalInfo.DOB_day, encrypted_personalInfo.DOB_year, DoctorID, encrypted_personalInfo.FirstName, encrypted_personalInfo.LastName, encrypted_personalInfo.Gender, encrypted_personalInfo.DOB_month, encrypted_personalInfo.DOB_day, encrypted_personalInfo.DOB_year ];
    await useDB(savePersonalData.name, DB_name, table_name)

    try{
        await connection.execute(sql, values);
        return res.status(200).json(true);
    }catch(error){
        console.log(`error in ${savePersonalData.name}:`, error)
        return res.status(200).json(false);
    }

};
