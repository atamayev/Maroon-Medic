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
      console.log(results);
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
    // await useDB(dashboardData.name, DB_name, table_name2)

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
    const encrypted_personalInfo = Crypto.encrypt_single_entry(personalInfo)

    const DB_name = 'DoctorDB';

    const table_name = 'basic_Doctor_info';
    const sql = `SELECT * FROM  ${table_name} WHERE Doctor_ID = ?`
    const values = [DoctorID];
    let results;
    
    await useDB(savePersonalData.name, DB_name, table_name);
    try{
        [results] = await connection.execute(sql, values);
    }catch(error){
        console.log(`error in ${savePersonalData.name}:`, error)
        return res.status(200).json(false);
    }

    if (!results.length){// if no results, then insert.
        const sql1 = `INSERT INTO ${table_name} (FirstName, LastName, Gender, DOB_month, DOB_day, DOB_year, Doctor_ID) VALUES (?,?,?,?,?,?,?)`;
        const values1 = [encrypted_personalInfo.FirstName, encrypted_personalInfo.LastName, encrypted_personalInfo.Gender, encrypted_personalInfo.DOB_month, encrypted_personalInfo.DOB_day, encrypted_personalInfo.DOB_year, DoctorID];
        try{
            await connection.execute(sql1, values1);
            return res.status(200).json(true);
        }catch(error){
            console.log(`error in if ${savePersonalData.name}:`, error);
            return res.status(200).json(false);
        }
    }else{// if there are results, that means that the record exists, and needs to be altered
        const sql2 = `UPDATE ${table_name} SET FirstName = ?, LastName = ?, Gender = ?, DOB_month = ?, DOB_day = ?, DOB_year = ? WHERE Doctor_ID = ?`;
        const values2 = [encrypted_personalInfo.FirstName, encrypted_personalInfo.LastName, encrypted_personalInfo.Gender, encrypted_personalInfo.DOB_month, encrypted_personalInfo.DOB_day, encrypted_personalInfo.DOB_year, DoctorID];
        try{
            await connection.execute(sql2, values2);
            return res.status(200).json(true);
        }catch(error){
            console.log(`error in else ${savePersonalData.name}:`, error);
            return res.status(200).json(false);
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
        return res.status(200).json(false);
    }

    if (!results.length){// if no results, then insert.
        const sql1 = `INSERT INTO ${table_name} (Description, Doctor_ID) VALUES (?,?)`;
        const values1 = [encrypted_description.Description, DoctorID];
        try{
            await connection.execute(sql1, values1);
            return res.status(200).json(true);
        }catch(error){
            console.log(`error in if ${saveDescriptionData.name}:`, error);
            return res.status(200).json(false);
        }
    }else{// if there are results, that means that the record exists, and needs to be altered
        const sql2 = `UPDATE ${table_name} SET Description = ? WHERE Doctor_ID = ?`;
        const values2 = [encrypted_description.Description, DoctorID];
        try{
            await connection.execute(sql2, values2);
            return res.status(200).json(true);
        }catch(error){
            console.log(`error in else ${saveDescriptionData.name}:`, error);
            return res.status(200).json(false);
        }
    }
};

// export async function accountDetails (req, res){
//     const DoctorUUID = req.cookies.DoctorUUID;
//     const DoctorID = await UUID_to_ID(DoctorUUID, 'Doctor');
//     let response = [];

//     try{
//         response.push(await DoctorDBOperations.FetchDescriptionData(DoctorID)); 
//         response.push(await DoctorDBOperations.FetchDoctorLanguages(DoctorID)); 
//         response.push(await DoctorDBOperations.FetchDoctorPictures(DoctorID));
//         response.push(await DoctorDBOperations.FetchDoctorServices(DoctorID));
//         response.push(await DoctorDBOperations.FetchDoctorAddressData(DoctorID));
//         response.push(await DoctorDBOperations.FetchDoctorCertifications(DoctorID));
//         response.push(await DoctorDBOperations.FetchDoctorInsurances(DoctorID));
//         response.push(await DoctorDBOperations.FetchDoctorEducation(DoctorID));
//         return res.status(200).json(response);
//     }catch(error){
//         console.log('error in accountDetails', error);
//         const emptyResponse = [];
//         return res.status(200).json(emptyResponse);
//     }
// };

export async function fetchAccountDetails(req, res){
    const DoctorUUID = req.cookies.DoctorUUID;
    const DoctorID = await UUID_to_ID(DoctorUUID, 'Doctor');
    const table_name = 'basic_Doctor_info';
    const DB_name = 'DoctorDB'

    const sql = `SELECT
	bdi.Doctor_ID, bdi.FirstName, bdi.LastName,
    sl2.School_name, ml.Major_name, etl.Education_type, em.Start_Date, em.End_Date, 
    il.Insurance_name, 
    sl1.Organization_name, sl1.Specialty_name, 
    pn.Phone, da.address_line_1, da.address_line_2, da.city, da.state, da.zip, da.country,
    scl3.Category_name, scl3.Service_name, sm1.Service_time, sm1.Service_price,
    d.Description,
    ll.language_name,
    p.picture_link, 
    p.picture_number

    FROM ${table_name} bdi

    JOIN pictures p ON bdi.Doctor_ID = p.Doctor_ID

    JOIN language_mapping lm ON bdi.Doctor_ID = lm.Doctor_ID
    JOIN language_list ll ON lm.language_mappingID = ll.language_listID

    JOIN descriptions d ON bdi.Doctor_ID = d.Doctor_ID

    JOIN service_mapping sm1 ON bdi.Doctor_ID = sm1.Doctor_ID
    JOIN service_and_category_list scl3 ON sm1.service_mapping_ID = scl3.service_and_category_listID

    JOIN Doctor_addresses da ON bdi.Doctor_ID = da.Doctor_ID
    JOIN phone_numbers pn ON da.addresses_ID = pn.Address_ID

    JOIN specialty_mapping sm2 ON bdi.Doctor_ID = sm2.Doctor_ID
    JOIN specialties_list sl1 ON sm2.Specialty_ID = sl1.specialties_listID

    JOIN education_mapping em ON bdi.Doctor_ID = em.Doctor_ID
    JOIN school_list sl2 ON em.School_ID = sl2.school_listID 
    JOIN major_list ml ON em.Major_ID = ml.major_listID
    JOIN education_type_list etl ON em.Education_type_ID = etl.education_typeID 

    JOIN insurance_mapping im ON bdi.Doctor_ID = im.Doctor_ID
    JOIN insurance_list il ON im.Insurance_ID = il.insurance_listID

    WHERE bdi.Doctor_ID = ?`;

    const values = [DoctorID];
    await useDB(fetchAccountDetails.name, DB_name, table_name)

    try{
        const [results] = await connection.execute(sql, values);
        console.log(results);
        return res.status(200).json(results);
    }catch(error){
        console.log('error in accountDetails', error);
        const emptyResponse = [];
        return res.status(200).json(emptyResponse);  
    }
};

export async function fetchAllLanguages (req, res){
    const DoctorID = req.body.DoctorID
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