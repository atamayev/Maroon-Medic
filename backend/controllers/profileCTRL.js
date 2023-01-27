import {connection, useDB} from "../dbAndSecurity/connect.js";
import Crypto from "../dbAndSecurity/crypto.js";
import { jwt_verify } from "./authCTRL.js";

export async function newVet (req, res){
    console.log('req.body',req.body)
    const DocID = req.body.DoctorID
    delete req.body.DoctorID;
    console.log('DocID', DocID)
    console.log('req.body', req.body)

    const table_name = 'basic_Doctor_info'
    const DB_name = 'DoctorDB'
    const encrypted = Crypto.encrypt_single_entry(req.body)
    console.log('encrypted', encrypted)

    const sql = `INSERT INTO ${table_name} (FirstName, LastName, Gender, DOB_month, DOB_day, DOB_year, Doctor_ID) VALUES (?,?,?,?,?,?,?)`;

    //ADD DoctorID
    const values = [encrypted.firstName, encrypted.lastName, encrypted.gender, encrypted.DOBmonth, encrypted.DOBday, encrypted.DOByear, DocID];
    await useDB(newVet.name, DB_name, `${table_name}`)
    
    try{
        const [results] = await connection.execute(sql, values)
        return res.status(200).json(results);
    }catch(error){
        console.log(`error in ${newVet.name}`,error)
        return res.status(500).json(error);
    }
}

export async function returnVetPageData (req, res){
    //take in an id, return decrypted necessary fields. will require joining, decrypting
    
}