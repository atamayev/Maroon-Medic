import { connection, useDB } from "../../dbAndSecurity/connect.js";
import Crypto from "../../dbAndSecurity/crypto.js";
import { UUID_to_ID } from "../../dbAndSecurity/UUID.js";


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

export async function saveLanguageData (req, res){
    const DoctorUUID = req.cookies.DoctorUUID;
    const DoctorID = await UUID_to_ID(DoctorUUID, 'Doctor'); // converts DoctorUUID to docid
    
    const spokenLanguages = req.body.Languages;

    const DB_name = 'DoctorDB';
    const table_name = 'language_mapping';

    const sql = `SELECT * FROM  ${table_name} WHERE Doctor_ID = ?`
    const values = [DoctorID];
    let results;
    
    await useDB(saveLanguageData.name, DB_name, table_name);
    try{
        [results] = await connection.execute(sql, values);
    }catch(error){
        console.log(`error in ${saveLanguageData.name}:`, error)
        return res.status(400).json(false);
    }

    if (results.length > 0) {
        // Doctor already has spoken languages in the database
        const oldLanguages = results.map(result => result.Language_ID); // old languages are the languages queried from the table^
        const newLanguages = spokenLanguages;

        // Check for changes in spoken languages
        const addedLanguages = newLanguages.filter(language => !oldLanguages.includes(language));
        const deletedLanguages = oldLanguages.filter(language => !newLanguages.includes(language));

        if (addedLanguages.length > 0) {
            console.log('adding languages')
            for (let i = 0; i<addedLanguages.length; i++){
                const sql1 = `INSERT INTO ${table_name} (Language_ID, Doctor_ID) VALUES (?,?)`;
                const values1 = [addedLanguages[i], DoctorID];
                try{
                    await connection.execute(sql1, values1);
                }catch(error){
                    console.log(`error in if ${saveLanguageData.name}:`, error);
                    return res.status(400).json(false);
                }
            }
            return res.status(200).json(true);
        }  
        else if (deletedLanguages.length > 0) {
            console.log('deleting languages')
            for (let i = 0; i<deletedLanguages.length; i++){
                const sql1 = `DELETE FROM ${table_name} WHERE Language_ID = ? AND Doctor_ID = ?`;
                const values1 = [deletedLanguages[i], DoctorID];
                try{
                    await connection.execute(sql1, values1);
                }catch(error){
                    console.log(`error in if ${saveLanguageData.name}:`, error);
                    return res.status(400).json(false);
                }
            }
            return res.status(200).json(true);
        }
      }
      else{
        console.log('adding languages in else')
        for (let i=0; i<spokenLanguages.length; i++){
            const sql1 = `INSERT INTO ${table_name} (Language_ID, Doctor_ID) VALUES (?,?)`;
            const values1 = [spokenLanguages[i], DoctorID];
            try{
                await connection.execute(sql1, values1);
            }catch(error){
                console.log(`error in if ${saveLanguageData.name}:`, error);
                return res.status(400).json(false);
            }
        }
        return res.status(200).json(true);
      }
};
