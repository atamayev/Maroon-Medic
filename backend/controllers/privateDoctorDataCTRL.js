import {connection, useDB} from "../dbAndSecurity/connect.js";
import Crypto from "../dbAndSecurity/crypto.js";
import { UUID_to_ID } from "../dbAndSecurity/UUID.js";
import DoctorDBOperations from "../dbAndSecurity/DoctorDBOperations.js";

/** newDoctor registers the inputted user data into basic_Doctor_info table
 *  All necessary information is sent via the request (DocID, firname, lastname, etc.)
 *  This data is encrypted using Crypto, and then inserting into the table.
 * @param {Array} req 
 * @param {Array} res If the user data is successfully added to table, return true. If not, return error--> front end doesn't allow
 * @returns true/error
 */
export async function newDoctor (req, res){
    const DoctorUUID = req.cookies.DoctorUUID
    const DoctorID = await UUID_to_ID(DoctorUUID, 'Doctor') // converts DoctorUUID to docid

    const new_doctor_object = req.body.new_doctor_object

    const table_name = 'basic_Doctor_info'
    const DB_name = 'DoctorDB'
    const encrypted = Crypto.encrypt_single_entry(new_doctor_object)

    const sql = `INSERT INTO ${table_name} (FirstName, LastName, Gender, DOB_month, DOB_day, DOB_year, Doctor_ID) VALUES (?,?,?,?,?,?,?)`;

    const values = [encrypted.FirstName, encrypted.LastName, encrypted.Gender, encrypted.DOB_month, encrypted.DOB_day, encrypted.DOB_year, DoctorID];
    await useDB(newDoctor.name, DB_name, table_name)
    
    try{
        await connection.execute(sql, values)
        return res.status(200).json(true);
    }catch(error){
        console.log(`error in ${newDoctor.name}`,error)
        return res.status(500).json(error);
    }
};

export async function newDoctorConfirmation (req, res){
    const DoctorUUID = req.cookies.DoctorUUID
    const newUserUUID = req.cookies.DoctorNew_User
    if (!newUserUUID){
        return res.status(200).json("Unverified");
    }
    let verified = false;
    const table_name = `DoctorUUID_reference`
    const DB_name = `DoctorDB`;
    const sql = `SELECT * FROM ${table_name} WHERE DoctorUUID = ?`;
    const values = [newUserUUID];
    await useDB(newDoctorConfirmation.name, DB_name, table_name)

    try{
      const [results] = await connection.execute(sql, values)
      if (results.length === 1) {
        verified = true;
      } else {
        verified = false;
        return res.status(500).json("Unverified");
      }
    }catch(error){
      return (`error in ${newDoctorConfirmation.name}:`, error)
    }

    if (DoctorUUID && verified){
        console.log("New User")
        return res.status(200).json("New User");
    }else if (!DoctorUUID && !verified){// makes sure that the user is new.
        console.log("No new Doctor nor UUID")
        return res.status(200).json("No new Doctor nor UUID");
    }else if (DoctorUUID && !verified){
        console.log("UUID but not new Doctor")
        return res.status(200).json("UUID but not new Doctor");
    }else{
        console.log("New Doctor but not UUID")
        return res.status(200).json("New Doctor but not UUID");
    }
};

export async function fetchDashboardData (req, res){
    const DoctorUUID = req.cookies.DoctorUUID
    const DoctorID = await UUID_to_ID(DoctorUUID, 'Doctor') // converts DoctorUUID to docid
    
    const table_name1 = 'Doctor_credentials';
    const table_name2 = 'basic_Doctor_info';
    const DB_name = 'DoctorDB';
  
    const sql = `SELECT email, Created_at, FirstName, LastName, Gender, DOB_month, DOB_day, DOB_year FROM ${table_name1} LEFT JOIN ${table_name2} ON ${table_name1}.DoctorID = ${table_name2}.Doctor_ID WHERE ${table_name1}.DoctorID = ?`
    const values = [DoctorID];
    await useDB(fetchDashboardData.name, DB_name, table_name1)

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
        return (`error in ${fetchDashboardData.name}:`, error)
    }
};

export async function fetchPersonalData (req, res){
    const DoctorUUID = req.cookies.DoctorUUID
    const DoctorID = await UUID_to_ID(DoctorUUID, 'Doctor') // converts DoctorUUID to docid
    
    const table_name = 'basic_Doctor_info';
    const DB_name = 'DoctorDB';
  
    const sql = `SELECT FirstName, LastName, Gender, DOB_month, DOB_day, DOB_year FROM ${table_name} WHERE Doctor_ID = ?`
    const values = [DoctorID];
    await useDB(fetchPersonalData.name, DB_name, table_name)

    try{
        const [results] = await connection.execute(sql, values)
        if (results.length === 0) {
            console.log('User does not exist')
            res.send({});
        } else {
            const decrypted = Crypto.decryptSingle(results[0])
            return res.status(200).json(decrypted);
        }
    }catch(error){
        return (`error in ${fetchPersonalData.name}:`, error)
    }
};

export async function savePersonalData (req, res){
    const DoctorUUID = req.cookies.DoctorUUID
    const DoctorID = await UUID_to_ID(DoctorUUID, 'Doctor') // converts DoctorUUID to docid
    
    const personalInfo = req.body.personalInfo;
    // console.log('personalInfo',personalInfo)
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
  
        // there was a map command in ChatGPT which didn't require a for loop, not sure if it would work
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

export async function fetchAccountDetails (req, res){
    const DoctorUUID = req.cookies.DoctorUUID;
    const DoctorID = await UUID_to_ID(DoctorUUID, 'Doctor');
    let response = [];

    try{
        response.push(await DoctorDBOperations.FetchDescriptionData(DoctorID)); 
        response.push(await DoctorDBOperations.FetchDoctorLanguages(DoctorID)); 
        response.push(await DoctorDBOperations.FetchDoctorPictures(DoctorID));
        response.push(await DoctorDBOperations.FetchDoctorServices(DoctorID));
        response.push(await DoctorDBOperations.FetchDoctorAddressData(DoctorID));
        response.push(await DoctorDBOperations.FetchDoctorCertifications(DoctorID));
        response.push(await DoctorDBOperations.FetchDoctorInsurances(DoctorID));
        response.push(await DoctorDBOperations.FetchDoctorEducation(DoctorID));
        console.log('response:', response)
        return res.status(200).json(response);
    }catch(error){
        console.log('error in accountDetails', error);
        const emptyResponse = [];
        return res.status(200).json(emptyResponse);
    }
};

export async function fetchAllLanguages (req, res){
    const table_name = 'language_list'
    const DB_name = 'DoctorDB'
    const sql = `SELECT Language_name, language_listID FROM ${table_name}`;
    await useDB(fetchAllLanguages.name, DB_name, table_name)
    
    try{
        const [results] = await connection.execute(sql)
        return res.status(200).json(results);
    }catch(error){
        console.log(`error in ${fetchAllLanguages.name}`,error)
        return res.status(500).json(error);
    }
};

export async function fetchAllSpecialties (req, res){
    const table_name = 'specialties_list'
    const DB_name = 'DoctorDB'
    const sql = `SELECT Organization_name, Specialty_name FROM ${table_name}`;
    await useDB(fetchAllSpecialties.name, DB_name, table_name)
    
    try{
        const [results] = await connection.execute(sql)
        return res.status(200).json(results);
    }catch(error){
        console.log(`error in ${fetchAllSpecialties.name}`,error)
        return res.status(500).json(error);
    }
};

export async function fetchAllServicesAndCategories (req, res){
    const table_name = 'service_and_category_list'
    const DB_name = 'DoctorDB'
    const sql = `SELECT Service_name, Category_name FROM ${table_name}`;
    await useDB(fetchAllServicesAndCategories.name, DB_name, table_name)
    
    try{
        const [results] = await connection.execute(sql)
        return res.status(200).json(results);
    }catch(error){
        console.log(`error in ${fetchAllServicesAndCategories.name}`,error)
        return res.status(500).json(error);
    }
};

export async function fetchAllSchools (req, res){
    const table_name = 'school_list'
    const DB_name = 'DoctorDB'
    const sql = `SELECT School_name FROM ${table_name}`;
    await useDB(fetchAllSchools.name, DB_name, table_name)
    
    try{
        const [results] = await connection.execute(sql)
        return res.status(200).json(results);
    }catch(error){
        console.log(`error in ${fetchAllSchools.name}`,error)
        return res.status(500).json(error);
    }
};

export async function fetchAllMajors (req, res){
    const table_name = 'major_list'
    const DB_name = 'DoctorDB'
    const sql = `SELECT Major_name FROM ${table_name}`;
    await useDB(fetchAllMajors.name, DB_name, table_name)
    
    try{
        const [results] = await connection.execute(sql)
        return res.status(200).json(results);
    }catch(error){
        console.log(`error in ${fetchAllMajors.name}`,error)
        return res.status(500).json(error);
    }
};

export async function fetchAllInsurances (req, res){
    const table_name = 'insurance_list'
    const DB_name = 'DoctorDB'
    const sql = `SELECT Insurance_name FROM ${table_name}`;
    await useDB(fetchAllInsurances.name, DB_name, table_name)
    
    try{
        const [results] = await connection.execute(sql)
        return res.status(200).json(results);
    }catch(error){
        console.log(`error in ${fetchAllInsurances.name}`,error)
        return res.status(500).json(error);
    }
};

export async function fetchAllEducationTypes (req, res){
    const table_name = 'education_type_list'
    const DB_name = 'DoctorDB'
    const sql = `SELECT Education_type FROM ${table_name}`;
    await useDB(fetchAllEducationTypes.name, DB_name, table_name)
    
    try{
        const [results] = await connection.execute(sql)
        return res.status(200).json(results);
    }catch(error){
        console.log(`error in ${fetchAllEducationTypes.name}`,error)
        return res.status(500).json(error);
    }
};

