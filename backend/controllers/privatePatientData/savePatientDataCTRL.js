import {connection, DB_Operation} from "../../dbAndSecurity/connect.js";
import { UUID_to_ID } from "../../dbAndSecurity/UUID.js";
import moment from "moment";

export async function savePersonalData (req, res){
    const PatientUUID = req.cookies.PatientUUID
    const PatientID = await UUID_to_ID(PatientUUID) // converts PatientUUID to PatientID
    
    const personalInfo = req.body.personalInfo;

    const basic_user_info = 'basic_user_info';
    const sql = `SELECT * FROM  ${basic_user_info} WHERE User_ID = ?`
    const values = [PatientID];
    let results;
    
    await DB_Operation(savePersonalData.name, basic_user_info);
    try{
        [results] = await connection.execute(sql, values);
    }catch(error){
        console.log(`error in ${savePersonalData.name}:`, error)
        return res.status(400).json();
    }

    const dateOfBirth = moment(`${personalInfo.DOB_month} ${personalInfo.DOB_day} ${personalInfo.DOB_year}`, 'MMMM D YYYY').format('YYYY-MM-DD');

    const values1 = [personalInfo.FirstName, personalInfo.LastName, personalInfo.Gender, dateOfBirth, PatientID];

    if (!results.length){// if no results, then insert.
        const sql1 = `INSERT INTO ${basic_user_info} (FirstName, LastName, Gender, DOB, User_ID) VALUES (?,?,?,?,?)`;
        try{
            await connection.execute(sql1, values1);
            return res.status(200).json();
        }catch(error){
            console.log(`error in if ${savePersonalData.name}:`, error);
            return res.status(400).json();
        }
    }else{// if there are results, that means that the record exists, and needs to be altered
        const sql2 = `UPDATE ${basic_user_info} SET FirstName = ?, LastName = ?, Gender = ?, DOB = ? WHERE User_ID = ?`;
        try{
            await connection.execute(sql2, values1);
            return res.status(200).json();
        }catch(error){
            console.log(`error in else ${savePersonalData.name}:`, error);
            return res.status(400).json();
        }
    }
};
