import { connection, useDB } from "../../dbAndSecurity/connect.js";
import Crypto from "../../dbAndSecurity/crypto.js";
import { UUID_to_ID } from "../../dbAndSecurity/UUID.js";

/** savePersonalData is self-explanatory in name
 *  First, converts from UUID to ID. Then, checks if any records exist in basic_doctor_info.
 *  If records don't exist, then it inserts the data.
 *  if records do exist, the data is updated. depending on wheather the data is entered successfully or not, it returns true/false
 * @param {String} req Cookie from client 
 * @param {Boolean} res True/False
 * @returns Returns true/false, depending on wheather the data was saved corretly
 *  DOCUMENTATION LAST UPDATED 3/16/23
 */
export async function savePersonalData (req, res){
    const DoctorUUID = req.cookies.DoctorUUID
    const DoctorID = await UUID_to_ID(DoctorUUID, 'Doctor') // converts DoctorUUID to docid
    
    const personalInfo = req.body.personalInfo;
    const encrypted_personalInfo = Crypto.encrypt_single_entry(personalInfo)

    const DB_name = 'DoctorDB';

    const table_name = 'basic_Doctor_info';
    const sql = `SELECT * FROM  ${table_name} WHERE Doctor_ID = ?`
    const values = [DoctorID];
    let results;
    //this is upsert:
    
    await useDB(savePersonalData.name, DB_name, table_name);
    try{
        [results] = await connection.execute(sql, values);
    }catch(error){
        console.log(`error in ${savePersonalData.name}:`, error)
        return res.status(400).json(false);
    }

    if (!results.length){// if no results, then insert.
        const sql1 = `INSERT INTO ${table_name} (FirstName, LastName, Gender, DOB_month, DOB_day, DOB_year, Doctor_ID) VALUES (?,?,?,?,?,?,?)`;
        const values1 = [encrypted_personalInfo.FirstName, encrypted_personalInfo.LastName, encrypted_personalInfo.Gender, encrypted_personalInfo.DOB_month, encrypted_personalInfo.DOB_day, encrypted_personalInfo.DOB_year, DoctorID];
        try{
            await connection.execute(sql1, values1);
            return res.status(200).json(true);
        }catch(error){
            console.log(`error in if ${savePersonalData.name}:`, error);
            return res.status(400).json(false);
        }
    }else{// if there are results, that means that the record exists, and needs to be altered
        const sql2 = `UPDATE ${table_name} SET FirstName = ?, LastName = ?, Gender = ?, DOB_month = ?, DOB_day = ?, DOB_year = ? WHERE Doctor_ID = ?`;
        const values2 = [encrypted_personalInfo.FirstName, encrypted_personalInfo.LastName, encrypted_personalInfo.Gender, encrypted_personalInfo.DOB_month, encrypted_personalInfo.DOB_day, encrypted_personalInfo.DOB_year, DoctorID];
        try{
            await connection.execute(sql2, values2);
            return res.status(200).json(true);
        }catch(error){
            console.log(`error in else ${savePersonalData.name}:`, error);
            return res.status(400).json(false);
        }
    }
};
/** saveDescriptionData is self-explanatory in name
 *  First, converts from UUID to ID. Then, checks if any records exist in descriptions.
 *  If records don't exist, then it inserts the data.
 *  if records do exist, the data is updated. depending on wheather the data is entered successfully or not, it returns true/false
 * @param {String} req Cookie from client 
 * @param {Boolean} res True/False
 * @returns Returns true/false, depending on wheather the data was saved corretly
 *  DOCUMENTATION LAST UPDATED 3/16/23
 */
export async function saveDescriptionData (req, res){
    const DoctorUUID = req.cookies.DoctorUUID;
    const DoctorID = await UUID_to_ID(DoctorUUID, 'Doctor'); // converts DoctorUUID to docid
    
    const description = req.body.Description;
    const encrypted_description = Crypto.encrypt_single_entry(description);

    const table_name = 'descriptions';
    const DB_name = 'DoctorDB';

    const sql = `SELECT * FROM  ${table_name} WHERE Doctor_ID = ?`;
    const values = [DoctorID];
    let results;
    
    await useDB(saveDescriptionData.name, DB_name, table_name);
    try{
        [results] = await connection.execute(sql, values);
    }catch(error){
        console.log(`error in ${saveDescriptionData.name}:`, error);
        return res.status(400).json(false);
    }

    if (!results.length){// if no results, then insert.
        const sql1 = `INSERT INTO ${table_name} (Description, Doctor_ID) VALUES (?,?)`;
        const values1 = [encrypted_description.Description, DoctorID];
        try{
            console.log('values1',values1)
            await connection.execute(sql1, values1);
            return res.status(200).json(true);
        }catch(error){
            console.log(`error in if ${saveDescriptionData.name}:`, error);
            return res.status(400).json(false);
        }
    }else{// if there are results, that means that the record exists, and needs to be altered
        const sql2 = `UPDATE ${table_name} SET Description = ? WHERE Doctor_ID = ?`;
        const values2 = [encrypted_description.Description, DoctorID];
        try{
            await connection.execute(sql2, values2);
            return res.status(200).json(true);
        }catch(error){
            console.log(`error in else ${saveDescriptionData.name}:`, error);
            return res.status(400).json(false);
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
 * @param {Boolean} res True/False
 * @returns Returns true/false, depending on wheather the data was saved correctly
 *  DOCUMENTATION LAST UPDATED 4/1/23
 */
export async function saveGeneralData (req, res){
    const DoctorUUID = req.cookies.DoctorUUID;
    const DoctorID = await UUID_to_ID(DoctorUUID, 'Doctor'); // converts DoctorUUID to docid
    const DataType = req.body.DataType
    const DataTypelower = DataType.charAt(0).toLowerCase() + DataType.slice(1);
    
    const doctorData = req.body.Data; // The Data is an array of the IDs of the DataType ([1,4,7,12], where each of these is a specific Language_ID)
    console.log('doctorData',doctorData)

    const DB_name = 'DoctorDB';
    const table_name = `${DataTypelower}_mapping`;

    const sql = `SELECT * FROM  ${table_name} WHERE Doctor_ID = ?`
    const values = [DoctorID];
    let results;

    await useDB(saveGeneralData.name, DB_name, table_name);
    try{
        [results] = await connection.execute(sql, values);
    }catch(error){
        console.log(`error in ${saveGeneralData.name}:`, error)
        return res.status(400).json(false);
    }
    console.log('results',results)

    if (results.length > 0) {
        // Doctor already has data in the table
        const oldData = results.map(result => result[`${DataType}_ID`]); //An array of IDs, in the same form as the doctorData: ie [1,2,4,5]
        console.log('oldData',oldData)
        const newData = doctorData;

        // Check for changes in data:
        const addedData = newData.filter(data => !oldData.includes(data)); //Filter the newData, check if there is anything new that wasn't in oldData
        const deletedData = oldData.filter(data => !newData.includes(data));

        if (addedData.length > 0) {
            console.log('adding data')
            for (let i = 0; i<addedData.length; i++){
                if(addedData[i]){
                    const sql1 = `INSERT INTO ${table_name} (${DataType}_ID, Doctor_ID) VALUES (?,?)`;
                    const values1 = [addedData[i], DoctorID];
                    try{
                        await connection.execute(sql1, values1);
                    }catch(error){
                        console.log(`error in if ${saveGeneralData.name}:`, error);
                        return res.status(400).json(false);
                    }
                }else{
                    console.log(`problem in adding data ${saveGeneralData.name}: field ${i} is null`);
                    return res.status(400).json(false);    
                }
            }
        }
        if (deletedData.length > 0) {
            console.log('deleting data')
            for (let i = 0; i<deletedData.length; i++){
                if(deletedData[i]){
                    const sql1 = `DELETE FROM ${table_name} WHERE ${DataType}_ID = ? AND Doctor_ID = ?`;
                    const values1 = [deletedData[i], DoctorID];
                    try{
                        await connection.execute(sql1, values1);
                    }catch(error){
                        console.log(`error in if ${saveGeneralData.name}:`, error);
                        return res.status(400).json(false);
                    }
                }else{
                    console.log(`problem in deleting ${saveGeneralData.name}: field ${i} is null`);
                    return res.status(400).json(false);    
                }
            }
        }
        return res.status(200).json(true);
      }
      else if (doctorData.length > 0){
        console.log('adding data in else')
        for (let i=0; i<doctorData.length; i++){
            if(doctorData[i]){
                const sql1 = `INSERT INTO ${table_name} (${DataType}_ID, Doctor_ID) VALUES (?,?)`;
                const values1 = [doctorData[i], DoctorID];
                try{
                    await connection.execute(sql1, values1);
                }catch(error){
                    console.log(`error in if ${saveGeneralData.name}:`, error);
                    return res.status(400).json(false);
                }
            }else{
                console.log(`problem in adding data in else ${saveGeneralData.name}: field ${i} is null`);
                return res.status(400).json(false);   
            }
        }
        return res.status(200).json(true);
      }
      else{
        console.log('elsed')
        return res.status(400).json(false)
      }
};

export async function saveEducationData (req, res){
    const DoctorUUID = req.cookies.DoctorUUID;
    const DoctorID = await UUID_to_ID(DoctorUUID, 'Doctor'); // converts DoctorUUID to docid
    const EducationType = req.body.EducationType;//'pre_vet' or 'vet'
    const EducationData = req.body.EducationData; // array of arrays, to make comparing to sql easier.
    console.log('EducationData from body request', EducationData)

    const DB_name = 'DoctorDB';
    const table_name = `${EducationType}_education_mapping`;

    const sql = `SELECT * FROM  ${table_name} WHERE Doctor_ID = ?`
    const values = [DoctorID];
    let formattedResults;

    await useDB(saveEducationData.name, DB_name, table_name);
    try{
        const [results] = await connection.execute(sql, values);
        formattedResults = results.map(obj => ({
            ...obj,
            Start_Date: new Date(obj.Start_Date).toISOString().slice(0,10),
            End_Date: new Date(obj.End_Date).toISOString().slice(0,10)
          }));//Converts the dates from SQL to a proper format.
    }catch(error){
        console.log(`error in ${saveEducationData.name}:`, error)
        return res.status(400).json(false);
    }

    if (formattedResults.length > 0) {
        // Doctor already has data in the table
        // will be comparing array of arrays to array of arrays.
        const oldEducationData = formattedResults.map(obj => Object.values(obj).slice(1, -1));// Changes the results into an array of arrays, of the same form as EducationData
        console.log('oldEducationData as an array of arrays',oldEducationData)
        const newEducationData = EducationData;

        // Check for changes in data:
        const addedData = newEducationData.filter(arr1 => !oldEducationData.some(arr2 => JSON.stringify(arr1) === JSON.stringify(arr2)));
        const deletedData = oldEducationData.filter(arr1 => !newEducationData.some(arr2 => JSON.stringify(arr1) === JSON.stringify(arr2)));

        console.log('addedData', addedData);
        console.log('deletedData', deletedData)

        if (addedData.length > 0) {
            console.log('addedData.length',addedData.length)
            console.log('adding data')
            let sql1;
            let values1;
            for (let i = 0; i<addedData.length; i++){
                if(EducationType === 'pre_vet'){
                    sql1 = `INSERT INTO ${table_name} (School_ID, Major_ID, Education_type_ID, Start_Date, End_Date, Doctor_ID) VALUES (?,?,?,?,?,?)`;
                    values1 = [addedData[i][0], addedData[i][1], addedData[i][2], addedData[i][3], addedData[i][4], DoctorID];    
                }else if (EducationType === 'vet'){
                    //Needs confirmation: is addedData[i][3] correct?
                    sql1 = `INSERT INTO ${table_name} (School_ID, Education_type_ID, Start_Date, End_Date, Doctor_ID) VALUES (?,?,?,?,?)`;
                    values1 = [addedData[i][0], addedData[i][1], addedData[i][2], addedData[i][3], DoctorID];     
                }else{
                    console.log(`error in if ${saveEducationData.name}:`, error);
                    return res.status(400).json(false);
                }

                try{
                    await connection.execute(sql1, values1);
                    console.log('successfuly added')
                }catch(error){
                    console.log(`error in if ${saveEducationData.name}:`, error);
                    return res.status(400).json(false);
                }
            }
        } 
        if (deletedData.length > 0) {
            console.log('deletedData.length',deletedData.length)
            console.log('deleting data')
            let sql2;
            let values2;
            for (let i = 0; i<deletedData.length; i++){
                if(EducationType === 'pre_vet'){
                    sql2 = `DELETE FROM ${table_name} WHERE School_ID = ? AND Major_ID = ? AND Education_type_ID = ? AND Doctor_ID = ?`;
                    // MAKE SURE THAT DOCTOR_ID IS INCLUDED IN DELETED DATA
                    values2 = [deletedData[i][0], deletedData[i][1], deletedData[i][2], DoctorID];
                }else if (EducationType === 'vet'){
                    sql2 = `DELETE FROM ${table_name} WHERE School_ID = ? AND Education_type_ID = ? AND Doctor_ID = ?`;
                    values2 = [deletedData[i][0], deletedData[i][1], DoctorID];    
                }else{
                    console.log(`error in if ${saveEducationData.name}:`, error);
                    return res.status(400).json(false);
                }
  
                try{
                    await connection.execute(sql2, values2);
                }catch(error){
                    console.log(`error in if ${saveEducationData.name}:`, error);
                    return res.status(400).json(false);
                }
            }
        }
        return res.status(200).json(true);
      }
      else if (EducationData.length > 0){
        //Can only get into here if formatted results.length not >0: no results from the DB - adding completely new data
        console.log('adding data in else')
        let sql3;
        let values3;
        for (let i=0; i<EducationData.length; i++){
            if(EducationType === 'pre_vet'){
                sql3 = `INSERT INTO ${table_name} (School_ID, Major_ID, Education_type_ID, Start_Date, End_Date, Doctor_ID) VALUES (?,?,?,?,?,?)`;
                values3 = [EducationData[i][0], EducationData[i][1], EducationData[i][2], EducationData[i][3], EducationData[i][4], DoctorID];
            }else if (EducationType === 'vet'){
                //Needs confirmation: is addedData[i][3] correct?
                sql3 = `INSERT INTO ${table_name} (School_ID, Education_type_ID, Start_Date, End_Date, Doctor_ID) VALUES (?,?,?,?,?)`;
                values3 = [addedData[i][0], addedData[i][1], addedData[i][2], addedData[i][3], DoctorID];     
            }else{
                console.log(`error in if ${saveEducationData.name}:`, error);
                return res.status(400).json(false);
            }
            try{
                console.log(values3)
                await connection.execute(sql3, values3);
            }catch(error){
                console.log(`error in if ${saveEducationData.name}:`, error);
                return res.status(400).json(false);
            }
        }
        return res.status(200).json(true);
      }
      else{
        //NO new data or queried results from DB.
        console.log('elsed')
        return res.status(400).json(false)
    }
};

/** savePublicAvailibilityData is a Doctor-controlled function that allows them to say wheather or not they want their profile accessible to patients
 *  First, converts from UUID to ID. Then, updates the doctor's avalibility to whatever they did on the front-end. The request is only allowed to happen if the new availiblty status is dfferent from the old one.
 * @param {String} req Cookie from client, PublicAvailibility status
 * @param {Boolean} res 
 * @returns Empty json
 *  DOCUMENTATION LAST UPDATED 3/16/23
 */
export async function savePublicAvailibilityData (req, res){
    const DoctorUUID = req.cookies.DoctorUUID;
    const DoctorID = await UUID_to_ID(DoctorUUID, 'Doctor'); // converts DoctorUUID to docid
    
    const publicAvailibility = req.body.PublicAvailibility;
    const table_name = 'Doctor_credentials';
    const DB_name = 'DoctorDB';

    const sql = `UPDATE ${table_name} SET publiclyAvailable = ? WHERE DoctorID = ?`;
    const values = [publicAvailibility, DoctorID];

    await useDB(savePublicAvailibilityData.name, DB_name, table_name);
    try{
        await connection.execute(sql, values);
        return res.status(200).json();
    }catch(error){
        console.log(`error in ${savePublicAvailibilityData.name}:`, error);
        return res.status(400).json();
    }
};
