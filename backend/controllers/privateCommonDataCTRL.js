import {connection, useDB} from "../dbAndSecurity/connect.js";
import Crypto from "../dbAndSecurity/crypto.js";
import { UUID_to_ID } from "../dbAndSecurity/UUID.js";

export async function headerData (req, res){ // for both pateints, and docs -- just fetches the name - to set in the dropdown menu
    const cookies = req.cookies
    let UUID;
    let ID;
    let table_name1;
    let table_name2;
    let DB_name;
    let sql;

    if("DoctorAccessToken" in cookies){
        UUID = req.cookies.DoctorUUID
        ID = await UUID_to_ID(UUID, 'Doctor')
        table_name1 = 'Doctor_credentials';
        table_name2 = 'basic_Doctor_info';
        DB_name = 'DoctorDB';
        sql = `SELECT ${table_name2}.FirstName FROM ${table_name2} JOIN ${table_name1} ON ${table_name2}.Doctor_ID = ${table_name1}.DoctorID WHERE ${table_name1}.DoctorID = ?`
    }
    // // Commenting out for now because basic patient info DNE
    else if("PatientAccessToken" in cookies){
        UUID = req.cookies.PatientUUID
        ID = await UUID_to_ID(UUID, 'Patient')
        table_name1 = 'Patient_credentials';
        table_name2 = 'basic_Patient_info';
        DB_name = 'PatientDB';
        sql = `SELECT ${table_name2}.FirstName FROM ${table_name2} JOIN ${table_name1} ON ${table_name2}.Patient_ID = ${table_name1}.PatientID WHERE ${table_name1}.PatientID = ?`
    }
    else{
        return res.send('Invalid User Type') // If Type not Doctor or Patient
    }
    const values = [ID];
    await useDB(headerData.name, DB_name, table_name1)
    
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
        console.log('error encountered in catching UUIDtoID')
        return res.send('User does not exist')
        // return res.status(500).send({ error: 'proprietaryHomePageData Error' });
    }
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

export async function checkUUID (req, res){
    const cookies = req.cookies
    let UUID;
    let table_name;
    let DB_name;
    let sql;
    let response = {
        isValid: false,
        cookieValue: '',
        type: ''
    };

    if("DoctorAccessToken" in cookies){
        UUID = req.cookies.DoctorUUID
        table_name = 'DoctorUUID_reference';
        DB_name = 'DoctorDB';
        sql = `SELECT * FROM ${table_name} WHERE DoctorUUID = ?`;
        response.type = 'Doctor';
    }else if("PatientAccessToken" in cookies){
        UUID = req.cookies.PatientUUID;
        table_name = 'PatientUUID_reference';
        DB_name = 'PatientDB';
        sql = `SELECT * FROM ${table_name} WHERE PatientUUID = ?`;
        response.type = 'Patient';
    }else{
        return res.send('Invalid User Type') // If Type not Doctor or Patient
    }
    const values = [UUID];
    await useDB(checkUUID.name, DB_name, table_name)
    
    try{
        const [results] = await connection.execute(sql, values)
        // console.log('results',results)
        if(results.length === 1){
            response.isValid = true;
            response.cookieValue = UUID;
            return res.status(200).json(response);
        }
        else{
            console.log('Invalid UUID')
            return res.status(500).json(error);     
        }
    }catch(error){
        console.log('error encountered in catching checkUUID')
        return res.status(500).json(error);
    }
};
