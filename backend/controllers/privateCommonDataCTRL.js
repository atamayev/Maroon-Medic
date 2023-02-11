import {connection, useDB} from "../dbAndSecurity/connect.js";
import Crypto from "../dbAndSecurity/crypto.js";

export async function  headerData (req, res){ // for both pateints, and docs -- just fetches the name - to set in the dropdown menu
    
}

/** DoctorUUIDtoDoctorID takes in the UUID, and searches for it's complementary DoctorID, returning to user
 * Note, this is practically the same function as DoctorUUID_to_DoctorID in UUID.js. The reason for having two similar functions is that this one returns data to the user, in the form of a JSON
 * DoctorUUID_to_DoctorID in UUID.js is soley a back-end function, used to return the Doctor's UUID as a string.
 * @param {*} req UUID, Type (type = patient or Doctor)
 * @param {*} res JSON
 * @returns Corresponding ID
 */
export async function UUIDtoID (req, res){
    const cookies = req.cookies
    let UUID;
    let table_name;
    let DB_name;
    let sql;

    if("DoctorAccessToken" in cookies){
        UUID = req.cookies.DoctorUUID
        table_name = 'DoctorUUID_reference';
        DB_name = 'DoctorDB';
        sql = `SELECT Doctor_ID FROM ${table_name} WHERE DoctorUUID = ?`;
    }else if("PatientAccessToken" in cookies){
        UUID = req.cookies.PatientUUID;
        table_name = 'PatientUUID_reference';
        DB_name = 'PatientDB';
        sql = `SELECT Patient_ID FROM ${table_name} WHERE PatientUUID = ?`;
    }else{
        return res.send('Invalid User Type') // If Type not Doctor or Patient
    }
    const values = [UUID];
    await useDB(UUIDtoID.name, DB_name, table_name)
    
    try{
        const [results] = await connection.execute(sql, values)
        return res.status(200).json(results)
    }catch(error){
        console.log('error encountered in catching UUIDtoID')
        return res.send('User does not exist')
        // return res.status(500).send({ error: 'proprietaryHomePageData Error' });
    }
};
