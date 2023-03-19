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

/**  NEEDS UPDATING. SEE CHANGES ON 3/19. SAME APPLIED TO INSURANCE
 * saveLanguageData is self-explanatory in name
 *  First, converts from UUID to ID. Then, checks if any records exist in language_mapping with the user's id.
 *  If results exist in language_mapping, then the 'difference' between the existing languages in the db, and the new languages are found.
 *  If the difference is only that new languages were added, then those languages are inserted into the db
 *  If the difference is that languages that were previously there are now deleted, then those languages get deleted from the DB (this is done via filtering in the code) 
 *  If there are no results found initially, that means the user never inputed languages. The user's new languages are inserted.
 * @param {String} req Cookie from client, language list
 * @param {Boolean} res True/False
 * @returns Returns true/false, depending on wheather the data was saved correctly
 *  DOCUMENTATION LAST UPDATED 3/16/23
 */
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
      else if (spokenLanguages.length > 0){
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
      }else{
        console.log('elsed')
        return res.status(200).json(true)
      }
};

/** saveInsuranceData is self-explanatory in name
 *  First, converts from UUID to ID. Then, checks if any records exist in insurance_mapping with the user's id.
 *  If results exist in insurance_mapping, then the 'difference' between the existing insurances in the db, and the new insurances are found.
 *  If the difference is only that new insurances were added, then those insurances are inserted into the db
 *  If the difference is that insurances that were previously there are now deleted, then those insurances get deleted from the DB (this is done via filtering in the code) 
 *  If there are no results found initially, that means the user never inputed insurances. The user's new insurances are inserted.
 * @param {String} req Cookie from client, insurance list
 * @param {Boolean} res True/False
 * @returns Returns true/false, depending on wheather the data was saved correctly
 *  DOCUMENTATION LAST UPDATED 3/16/23
 */
export async function saveInsuranceData (req, res){
    const DoctorUUID = req.cookies.DoctorUUID;
    const DoctorID = await UUID_to_ID(DoctorUUID, 'Doctor'); // converts DoctorUUID to docid
    
    const acceptedInsurances = req.body.Insurances;
    console.log('acceptedInsurances',acceptedInsurances)

    const DB_name = 'DoctorDB';
    const table_name = 'insurance_mapping';

    const sql = `SELECT * FROM  ${table_name} WHERE Doctor_ID = ?`
    const values = [DoctorID];
    let results;
    
    await useDB(saveInsuranceData.name, DB_name, table_name);
    try{
        [results] = await connection.execute(sql, values);
    }catch(error){
        console.log(`error in ${saveInsuranceData.name}:`, error)
        return res.status(400).json(false);
    }

    if (results.length > 0) {
        // Doctor already has spoken insurances in the database
        const oldInsurances = results.map(result => result.Insurance_ID); // old insurances are the insurances queried from the table^
        const newInsurances = acceptedInsurances;

        // Check for changes in spoken insurances
        const addedInsurances = newInsurances.filter(insurance => !oldInsurances.includes(insurance));
        const deletedInsurances = oldInsurances.filter(insurance => !newInsurances.includes(insurance));

        if (addedInsurances.length > 0) {
            console.log(addedInsurances)
            console.log('adding insurances')
            for (let i = 0; i<addedInsurances.length; i++){
                const sql1 = `INSERT INTO ${table_name} (Insurance_ID, Doctor_ID) VALUES (?,?)`;
                const values1 = [addedInsurances[i], DoctorID];
                try{
                    await connection.execute(sql1, values1);
                }catch(error){
                    console.log(`error in if ${saveInsuranceData.name}:`, error);
                    return res.status(400).json(false);
                }
            }
            return res.status(200).json(true);
        }  
        else if (deletedInsurances.length > 0) {
            console.log('deleting insurances')
            for (let i = 0; i<deletedInsurances.length; i++){
                const sql1 = `DELETE FROM ${table_name} WHERE Insurance_ID = ? AND Doctor_ID = ?`;
                const values1 = [deletedInsurances[i], DoctorID];
                try{
                    await connection.execute(sql1, values1);
                }catch(error){
                    console.log(`error in if ${saveInsuranceData.name}:`, error);
                    return res.status(400).json(false);
                }
            }
            return res.status(200).json(true);
        }
      }
      else if (acceptedInsurances.length > 0){
        console.log('adding insurances in else')
        for (let i=0; i<acceptedInsurances.length; i++){
            const sql1 = `INSERT INTO ${table_name} (Insurance_ID, Doctor_ID) VALUES (?,?)`;
            const values1 = [acceptedInsurances[i], DoctorID];
            try{
                await connection.execute(sql1, values1);
            }catch(error){
                console.log(`error in if ${saveInsuranceData.name}:`, error);
                return res.status(400).json(false);
            }
        }
        return res.status(200).json(true);
      }else{
        console.log('elsed')
        return res.status(200).json(true)
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
