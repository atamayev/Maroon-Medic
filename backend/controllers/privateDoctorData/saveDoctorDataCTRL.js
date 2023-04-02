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
            console.log('values2',values2)
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
    
    const doctorData = req.body.Data;

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

    if (results.length > 0) {
        // Doctor already has data in the table
        const oldData = results.map(result => result[`${DataType}_ID`]); // old data are the data queried from the table^
        const newData = doctorData;

        // Check for changes in data:
        const addedData = newData.filter(data => !oldData.includes(data));
        const deletedData = oldData.filter(data => !newData.includes(data));

        if (addedData.length > 0) {
            console.log('adding data')
            for (let i = 0; i<addedData.length; i++){
                const sql1 = `INSERT INTO ${table_name} (${DataType}_ID, Doctor_ID) VALUES (?,?)`;
                const values1 = [addedData[i], DoctorID];
                try{
                    await connection.execute(sql1, values1);
                }catch(error){
                    console.log(`error in if ${saveGeneralData.name}:`, error);
                    return res.status(400).json(false);
                }
            }
        }  
        if (deletedData.length > 0) {
            console.log('deleting data')
            for (let i = 0; i<deletedData.length; i++){
                const sql1 = `DELETE FROM ${table_name} WHERE ${DataType}_ID = ? AND Doctor_ID = ?`;
                const values1 = [deletedData[i], DoctorID];
                try{
                    await connection.execute(sql1, values1);
                }catch(error){
                    console.log(`error in if ${saveGeneralData.name}:`, error);
                    return res.status(400).json(false);
                }
            }
        }
        return res.status(200).json(true);
      }
      else if (doctorData.length > 0){
        console.log('adding data in else')
        for (let i=0; i<doctorData.length; i++){
            const sql1 = `INSERT INTO ${table_name} (${DataType}_ID, Doctor_ID) VALUES (?,?)`;
            const values1 = [doctorData[i], DoctorID];
            try{
                await connection.execute(sql1, values1);
            }catch(error){
                console.log(`error in if ${saveGeneralData.name}:`, error);
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
    const DataType = req.body.DataType
    const doctorData = req.body.Data;

    const DB_name = 'DoctorDB';
    const table_name = `${DataType}_mapping`;

    const sql = `SELECT * FROM  ${table_name} WHERE Doctor_ID = ?`
    const values = [DoctorID];
    let results;

    await useDB(saveEducationData.name, DB_name, table_name);
    try{
        [results] = await connection.execute(sql, values);
    }catch(error){
        console.log(`error in ${saveEducationData.name}:`, error)
        return res.status(400).json(false);
    }

    // DEPENDING ON WHEATHER OR NOT IT IS PREVET OR VET, CHANGE THE SQL. SHOULD BE ADDING DIFFERENT NUMBER OF COLUMNS

    if (results.length > 0) {
        // Doctor already has data in the table
        const oldData = results.map(result => result[`${DataType}_ID`]); // old data are the data queried from the table^
        const newData = doctorData;

        // Check for changes in data:
        const addedData = newData.filter(data => !oldData.includes(data));
        const deletedData = oldData.filter(data => !newData.includes(data));

        if (addedData.length > 0) {
            console.log('adding data')
            for (let i = 0; i<addedData.length; i++){
                const sql1 = `INSERT INTO ${table_name} (${DataType}_ID, Doctor_ID) VALUES (?,?)`;
                const values1 = [addedData[i], DoctorID];
                try{
                    await connection.execute(sql1, values1);
                }catch(error){
                    console.log(`error in if ${saveEducationData.name}:`, error);
                    return res.status(400).json(false);
                }
            }
        }  
        if (deletedData.length > 0) {
            console.log('deleting data')
            for (let i = 0; i<deletedData.length; i++){
                const sql1 = `DELETE FROM ${table_name} WHERE ${DataType}_ID = ? AND Doctor_ID = ?`;
                const values1 = [deletedData[i], DoctorID];
                try{
                    await connection.execute(sql1, values1);
                }catch(error){
                    console.log(`error in if ${saveEducationData.name}:`, error);
                    return res.status(400).json(false);
                }
            }
        }
        return res.status(200).json(true);
      }
      else if (doctorData.length > 0){
        console.log('adding data in else')
        for (let i=0; i<doctorData.length; i++){
            const sql1 = `INSERT INTO ${table_name} (${DataType}_ID, Doctor_ID) VALUES (?,?)`;
            const values1 = [doctorData[i], DoctorID];
            try{
                await connection.execute(sql1, values1);
            }catch(error){
                console.log(`error in if ${saveEducationData.name}:`, error);
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
