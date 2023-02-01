import {connection, useDB} from "../dbAndSecurity/connect.js";
import Crypto from "../dbAndSecurity/crypto.js";
import { UUID_to_DoctorID } from "../dbAndSecurity/UUID.js";
/** newVet registers the inputted user data into basic_Doctor_info table
 *  All necessary information is sent via the request (DocID, firname, lastname, etc.)
 *  This data is encrypted using Crypto, and then inserting into the table.
 * @param {Array} req 
 * @param {Array} res If the user data is successfully added to table, return true. If not, return error--> front end doesn't allow
 * @returns true/error
 */
export async function newVet (req, res){
    console.log('req.body',req.body)
    const DocID = req.body.DoctorID
    delete req.body.DoctorID;

    const table_name = 'basic_Doctor_info'
    const DB_name = 'DoctorDB'
    const encrypted = Crypto.encrypt_single_entry(req.body)

    const sql = `INSERT INTO ${table_name} (FirstName, LastName, Gender, DOB_month, DOB_day, DOB_year, Doctor_ID) VALUES (?,?,?,?,?,?,?)`;

    const values = [encrypted.firstName, encrypted.lastName, encrypted.gender, encrypted.DOBmonth, encrypted.DOBday, encrypted.DOByear, DocID];
    await useDB(newVet.name, DB_name, `${table_name}`)
    
    try{
        await connection.execute(sql, values)
        return res.status(200).json(true);
    }catch(error){
        console.log(`error in ${newVet.name}`,error)
        return res.status(500).json(error);
    }
}

export async function dashboardData (req, res){
    const UUID = req.cookies.UUID
    const DoctorID = await UUID_to_DoctorID(UUID)
    
}
