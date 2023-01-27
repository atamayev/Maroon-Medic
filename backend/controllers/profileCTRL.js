import {connection, useDB} from "../dbAndSecurity/connect.js";
import Crypto from "../dbAndSecurity/crypto.js";
import { jwt_verify } from "./authCTRL.js";

export async function newVet (req, res){
    console.log('req.body',req.body)
    // jwt_verify(req) // fix this

    
    // //Identity Verification: Needs to be exported to diff location
    //     const userId = req.query.userId;
    //     const token = req.cookies.accessToken;
    //     if (!token) return res.status(401).json("Not logged in!");

    //     jwt.verify(token, "secretkey", (err, userInfo) => {
    //     if (err) return res.status(403).json("Token is not valid!");
    //     console.log(userId)});


    const table_name = 'basic_Doctor_info'
    const DB_name = 'DoctorDB'
    const encrypted = Crypto.encrypt_single_entry(req.body)
    console.log('encrypted', encrypted)

    const sql = `INSERT INTO ${table_name} (FirstName, LastName, Gender, DOB_month, DOB_day, DOB_year, Doctor_ID) VALUES (?,?,?,?,?,?, ?)`;
    let DoctorID = 1000002

    //ADD DoctorID
    const values = [encrypted.firstName, encrypted.lastName, encrypted.gender, encrypted.DOBmonth, encrypted.DOBday, encrypted.DOByear, DoctorID];
    await useDB(newVet.name, DB_name, `${table_name}`)
    
    try{
        const [results] = await connection.execute(sql, values)
        return res.status(200).json(results);
    }catch(error){
        console.log(`error in ${newVet.name}`,error)
        return res.status(500).json(error);
    }
}
