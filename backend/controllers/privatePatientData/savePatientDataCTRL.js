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
    
    const patientData = req.body.Data; // The Data is an array of the IDs of the DataType ([1,4,7,12], where each of these is a specific Language_ID)

    const table_name = `${DataTypelower}_mapping`;

    const sql = `SELECT * FROM  ${table_name} WHERE User_ID = ?`
    const values = [PatientID];
    let results;

    await DB_Operation(saveGeneralData.name, table_name);
    try{
        [results] = await connection.execute(sql, values);
    }catch(error){
        console.log(`error in ${saveGeneralData.name}:`, error)
        return res.status(400).json();
    }

    if (results.length > 0) {
        // Patient data already has data in the table
        const oldData = results.map(result => result[`${DataType}_ID`]); //An array of IDs, in the same form as the patientData: ie [1,2,4,5]
        const newData = patientData;

        // Check for changes in data:
        const addedData = newData.filter(data => !oldData.includes(data)); //Filter the newData, check if there is anything new that wasn't in oldData
        const deletedData = oldData.filter(data => !newData.includes(data));

        if (addedData.length > 0) {
            for (let i = 0; i<addedData.length; i++){
                if(addedData[i]){
                    const sql1 = `INSERT INTO ${table_name} (${DataType}_ID, User_ID) VALUES (?,?)`;
                    const values1 = [addedData[i], PatientID];
                    try{
                        await connection.execute(sql1, values1);
                    }catch(error){
                        console.log(`error in if ${saveGeneralData.name}:`, error);
                        return res.status(400).json();
                    }
                }else{
                    console.log(`problem in adding data ${saveGeneralData.name}: field ${i} is null`);
                    return res.status(400).json();    
                }
            }
        }
        if (deletedData.length > 0) {
            for (let i = 0; i<deletedData.length; i++){
                if(deletedData[i]){
                    const sql1 = `DELETE FROM ${table_name} WHERE ${DataType}_ID = ? AND User_ID = ?`;
                    const values1 = [deletedData[i], PatientID];
                    try{
                        await connection.execute(sql1, values1);
                    }catch(error){
                        console.log(`error in if ${saveGeneralData.name}:`, error);
                        return res.status(400).json();
                    }
                }else{
                    console.log(`problem in deleting ${saveGeneralData.name}: field ${i} is null`);
                    return res.status(400).json();    
                }
            }
        }
        return res.status(200).json();
    }
    else if (patientData.length > 0){
        for (let i=0; i<patientData.length; i++){
            if(patientData[i]){
                const sql1 = `INSERT INTO ${table_name} (${DataType}_ID, User_ID) VALUES (?,?)`;
                const values1 = [patientData[i], PatientID];
                try{
                    await connection.execute(sql1, values1);
                }catch(error){
                    console.log(`error in if ${saveGeneralData.name}:`, error);
                    return res.status(400).json();
                }
            }else{
                console.log(`problem in adding data in else ${saveGeneralData.name}: field ${i} is null`);
                return res.status(400).json();   
            }
        }
        return res.status(200).json();
    }
    else{
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

    const sql = `SELECT * FROM  ${pet_info} WHERE Patient_ID = ?`
    const values = [PatientID];
    let results;

    await DB_Operation(savePetData.name, pet_info);
    try{
        [results] = await connection.execute(sql, values);
    }catch(error){
        console.log(`error in ${savePetData.name}:`, error)
        return res.status(400).json();
    }
    if(results.length){
        let addedData = PetData.filter(pet => pet.newPet === true);
        let updatedData = PetData.filter(pet => pet.newPet === false); // this is updated, but also unchanged
        //const deletedData = ;
        //need to find the 
        let returnedData = [];
        if(addedData.length){
            for (let i=0; i<addedData.length; i++){
                if(addedData[i]){
                    const sql1 = `INSERT INTO ${pet_info} (Name, Gender, DOB, Patient_ID, pet_ID, isActive) VALUES (?, ?, ?, ?, ?, ?)`;
                    const values1 = [addedData[i].Name, addedData[i].Gender, addedData[i].DOB, PatientID, addedData[i].pet_listID, 1];
                    try{
                        await connection.execute(sql1, values1);
                        addedData[i].newPet = false;
                        returnedData.push(addedData[i])
                    }catch(error){
                        console.log(`error in if ${savePetData.name}:`, error);
                        return res.status(400).json();
                    }
                }else{
                    console.log(`problem in adding data in else ${savePetData.name}: field ${i} is null`);
                    return res.status(400).json();   
                }
            }
        }else if (updatedData.length){
            for (let i=0; i<updatedData.length; i++){
                if(updatedData[i]){
                    const sql1 = `UPDATE ${pet_info} SET Name = ?, Gender = ?, DOB = ?, pet_ID = ? WHERE Patient_ID = ?`;
                    const values1 = [updatedData[i].Name, updatedData[i].Gender, updatedData[i].DOB, updatedData[i].pet_listID, PatientID];
                    try{
                        await connection.execute(sql1, values1);
                        updatedData[i].newPet = false;
                        returnedData.push(updatedData[i])
                    }catch(error){
                        console.log(`error in if ${savePetData.name}:`, error);
                        return res.status(400).json();
                    }
                }else{
                    console.log(`problem in adding data in else ${savePetData.name}: field ${i} is null`);
                    return res.status(400).json();   
                }
            }
        }
        // else if (deletedData.length){
        //     //Fill this out
        // }
        return res.status(200).json(returnedData);
    }else if (PetData.length){
        for (let i=0; i<PetData.length; i++){
            console.log('PetData',PetData)
            const sql1 = `INSERT INTO ${pet_info} (Name, Gender, DOB, Patient_ID, pet_ID, isActive) VALUES (?, ?, ?, ?, ?, ?)`;
            const values1 = [PetData[i].Name, PetData[i].Gender, PetData[i].DOB, PatientID, PetData[i].pet_listID, 1];
            console.log(values1)
            try{
                await connection.execute(sql1, values1);
                PetData[i].newPet = false;
            }catch(error){
                console.log(`error in if ${savePetData.name}:`, error);
                return res.status(400).json();
            }
        }
        return res.status(200).json(PetData);
    }else{
        return res.status(400).json();
    }
};
