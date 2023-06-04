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

/** saveGeneralData saves either Language, Specialty, or Insurance Data
 *  First, converts from UUID to ID. Then, checks if any records exist in the specific mapping with the user's id.
 *  The mapping file is chosen based on the DataType (can either be Specialty, Language, or Insurance)
 *  If results exist in mappping table, then the 'difference' between the existing data in the table, and the new data are found.
 *  If the difference is only that new data were added, then those data are inserted into the table
 *  If the difference is that data that were previously there are now deleted, then those data get deleted from the table (this is done via filtering in the code) 
 *  If there are no results found initially, that means the user never inputed data. The user's new data are inserted.
 * @param {String} req Cookie from client, type of data, list of data (ie list of insurances, languages, or specialties)
 * @param {Boolean} res 200/400
 * @returns Returns 200/400, depending on wheather the data was saved correctly
 *  DOCUMENTATION LAST UPDATED 4/1/23
 */
export async function saveGeneralData (req, res){
    const PatientUUID = req.cookies.PatientUUID;
    const PatientID = await UUID_to_ID(PatientUUID); // converts PatientUUID to docid
    const DataType = req.body.DataType
    const DataTypelower = DataType.charAt(0).toLowerCase() + DataType.slice(1);
    const operationType = req.body.operationType;

    const patientData = req.body.Data; // The Data is an array of the ID of the DataType ([6]), which is a specific Language_ID)

    const table_name = `${DataTypelower}_mapping`;

    await DB_Operation(saveGeneralData.name, table_name);

    if(operationType === 'add'){
        const sql = `INSERT INTO ${table_name} (${DataType}_ID, User_ID) VALUES (?,?)`;
        const values = [patientData, PatientID];
        try{
            await connection.execute(sql, values);
            return res.status(200).json();
        }catch(error){
            console.log(`error in if ${saveGeneralData.name}:`, error);
            return res.status(400).json();
        }
    }else if (operationType = 'delete'){
        const sql = `DELETE FROM ${table_name} WHERE ${DataType}_ID = ? AND User_ID = ?`;
        const values = [patientData, PatientID];
        try{
            await connection.execute(sql, values);
            return res.status(200).json();
        }catch(error){
            console.log(`error in if ${saveGeneralData.name}:`, error);
            return res.status(400).json();
        }
    }else{
        console.log('incorrect operation Type');
        return res.status(400).json();
    }
};

export async function savePetData (req, res){
    const PatientUUID = req.cookies.PatientUUID;
    const PatientID = await UUID_to_ID(PatientUUID); // converts PatientUUID to docid
    const PetData = req.body.PetData
    const operationType = req.body.operationType;//adding, deleting, updating
    console.log(PetData)

    const pet_info = `pet_info`;

    if(operationType === 'add'){
        const sql = `INSERT INTO ${pet_info} (Name, Gender, DOB, Patient_ID, pet_ID, isActive) VALUES (?, ?, ?, ?, ?, ?)`;
        const values = [PetData.Name, PetData.Gender, PetData.DOB, PatientID, PetData.pet_listID, 1];
        try{
            const [result] = await connection.execute(sql, values);
            PetData.pet_infoID = result.insertId;
            return res.status(200).json(PetData);
        }catch(error){
            console.log(`error in if ${savePetData.name}:`, error);
            return res.status(400).json();
        }
    }else if (operationType === 'update'){
        const sql = `UPDATE ${pet_info} SET Name = ?, Gender = ?, DOB = ?, pet_ID = ? WHERE pet_infoID = ?`;
        const values = [PetData.Name, PetData.Gender, PetData.DOB, PetData.pet_listID, PetData.pet_infoID];
        try{
            await connection.execute(sql, values);
            return res.status(200).json();
        }catch(error){
            console.log(`error in if ${savePetData.name}:`, error);
            return res.status(400).json();
        }
    }else if (operationType === 'delete'){
        const sql = `UPDATE ${pet_info} SET isActive = 0 WHERE pet_infoID = ?`;
        const values = [PetData];
        try{
            await connection.execute(sql, values);
            return res.status(200).json();
        }catch(error){
            console.log(`error in if ${savePetData.name}:`, error);
            return res.status(400).json();
        }
    }else{
        console.log('incorrect operation Type');
        return res.status(400).json();
    }
};
