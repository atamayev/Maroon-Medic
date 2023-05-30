import { connection, DB_Operation } from "../../dbAndSecurity/connect.js";
import { getUnchangedAddressRecords, getUpdatedAddressRecords } from "../../dbAndSecurity/addressOperations.js";
import { UUID_to_ID } from "../../dbAndSecurity/UUID.js";

/** savePersonalData is self-explanatory in name
 *  First, converts from UUID to ID. Then, checks if any records exist in basic_doctor_info.
 *  If records don't exist, then it inserts the data.
 *  if records do exist, the data is updated. depending on wheather the data is entered successfully or not, it returns 200/400
 * @param {String} req Cookie from client 
 * @param {Boolean} res 200/400
 * @returns Returns 200/400, depending on wheather the data was saved corretly
 *  DOCUMENTATION LAST UPDATED 3/16/23
 */
export async function savePersonalData (req, res){
    const DoctorUUID = req.cookies.DoctorUUID
    const DoctorID = await UUID_to_ID(DoctorUUID) // converts DoctorUUID to docid
    
    const personalInfo = req.body.personalInfo;

    const table_name = 'basic_user_info';
    const sql = `SELECT * FROM  ${table_name} WHERE User_ID = ?`
    const values = [DoctorID];
    let results;
    //this is upsert:
    
    await DB_Operation(savePersonalData.name, table_name);
    try{
        [results] = await connection.execute(sql, values);
    }catch(error){
        console.log(`error in ${savePersonalData.name}:`, error)
        return res.status(400).json();
    }

    const values1 = [personalInfo.FirstName, personalInfo.LastName, personalInfo.Gender, personalInfo.DOB_month, personalInfo.DOB_day, personalInfo.DOB_year, DoctorID];

    if (!results.length){// if no results, then insert.
        const sql1 = `INSERT INTO ${table_name} (FirstName, LastName, Gender, DOB_month, DOB_day, DOB_year, User_ID) VALUES (?,?,?,?,?,?,?)`;
        try{
            await connection.execute(sql1, values1);
            return res.status(200).json();
        }catch(error){
            console.log(`error in if ${savePersonalData.name}:`, error);
            return res.status(400).json();
        }
    }else{// if there are results, that means that the record exists, and needs to be altered
        const sql2 = `UPDATE ${table_name} SET FirstName = ?, LastName = ?, Gender = ?, DOB_month = ?, DOB_day = ?, DOB_year = ? WHERE User_ID = ?`;
        try{
            await connection.execute(sql2, values1);
            return res.status(200).json();
        }catch(error){
            console.log(`error in else ${savePersonalData.name}:`, error);
            return res.status(400).json();
        }
    }
};
/** saveDescriptionData is self-explanatory in name
 *  First, converts from UUID to ID. Then, checks if any records exist in descriptions.
 *  If records don't exist, then it inserts the data.
 *  if records do exist, the data is updated. depending on wheather the data is entered successfully or not, it returns 200/400
 * @param {String} req Cookie from client 
 * @param {Boolean} res 200/400
 * @returns Returns 200/400, depending on wheather the data was saved corretly
 *  DOCUMENTATION LAST UPDATED 3/16/23
 */
export async function saveDescriptionData (req, res){
    const DoctorUUID = req.cookies.DoctorUUID;
    const DoctorID = await UUID_to_ID(DoctorUUID); // converts DoctorUUID to docid
    
    const description = req.body.Description;
    const table_name = 'descriptions';

    const sql = `SELECT * FROM  ${table_name} WHERE Doctor_ID = ?`;
    const values = [DoctorID];
    let results;
    
    await DB_Operation(saveDescriptionData.name, table_name);
    try{
        [results] = await connection.execute(sql, values);
    }catch(error){
        console.log(`error in ${saveDescriptionData.name}:`, error);
        return res.status(400).json();
    }
    const values1 = [description.Description, DoctorID];

    if (!results.length){// if no results, then insert.
        const sql1 = `INSERT INTO ${table_name} (Description, Doctor_ID) VALUES (?,?)`;
        try{
            await connection.execute(sql1, values1);
            return res.status(200).json();
        }catch(error){
            console.log(`error in if ${saveDescriptionData.name}:`, error);
            return res.status(400).json();
        }
    }else{// if there are results, that means that the record exists, and needs to be altered
        const sql2 = `UPDATE ${table_name} SET Description = ? WHERE Doctor_ID = ?`;
        try{
            await connection.execute(sql2, values1);
            return res.status(200).json();
        }catch(error){
            console.log(`error in else ${saveDescriptionData.name}:`, error);
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
    const DoctorUUID = req.cookies.DoctorUUID;
    const DoctorID = await UUID_to_ID(DoctorUUID); // converts DoctorUUID to docid
    const DataType = req.body.DataType
    const DataTypelower = DataType.charAt(0).toLowerCase() + DataType.slice(1);
    
    const doctorData = req.body.Data; // The Data is an array of the IDs of the DataType ([1,4,7,12], where each of these is a specific Language_ID)

    const table_name = `${DataTypelower}_mapping`;

    const sql = `SELECT * FROM  ${table_name} WHERE User_ID = ?`
    const values = [DoctorID];
    let results;

    await DB_Operation(saveGeneralData.name, table_name);
    try{
        [results] = await connection.execute(sql, values);
    }catch(error){
        console.log(`error in ${saveGeneralData.name}:`, error)
        return res.status(400).json();
    }

    if (results.length > 0) {
        // Doctor already has data in the table
        const oldData = results.map(result => result[`${DataType}_ID`]); //An array of IDs, in the same form as the doctorData: ie [1,2,4,5]
        const newData = doctorData;

        // Check for changes in data:
        const addedData = newData.filter(data => !oldData.includes(data)); //Filter the newData, check if there is anything new that wasn't in oldData
        const deletedData = oldData.filter(data => !newData.includes(data));

        if (addedData.length > 0) {
            for (let i = 0; i<addedData.length; i++){
                if(addedData[i]){
                    const sql1 = `INSERT INTO ${table_name} (${DataType}_ID, User_ID) VALUES (?,?)`;
                    const values1 = [addedData[i], DoctorID];
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
                    const values1 = [deletedData[i], DoctorID];
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
        return res.status(200).json().json();
      }
    else if (doctorData.length > 0){
        for (let i=0; i<doctorData.length; i++){
            if(doctorData[i]){
                const sql1 = `INSERT INTO ${table_name} (${DataType}_ID, User_ID) VALUES (?,?)`;
                const values1 = [doctorData[i], DoctorID];
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

export async function saveServicesData (req, res){
    const DoctorUUID = req.cookies.DoctorUUID;
    const DoctorID = await UUID_to_ID(DoctorUUID); // converts DoctorUUID to docid
    const ServicesData = req.body.ServicesData; //Array of Objects
    
    const table_name = `service_mapping`;

    const sql = `SELECT * FROM  ${table_name} WHERE Doctor_ID = ?`
    const values = [DoctorID];
    let results;

    await DB_Operation(saveServicesData.name, table_name);
    try{
        [results] = await connection.execute(sql, values);
    }catch(error){
        console.log(`error in ${saveServicesData.name}:`, error)
        return res.status(400).json();
    }

    if (results.length > 0 ){
        // Doctor already has data in the table
        const newServicesData = ServicesData;

        const resultIDs = new Set(results.map(result => result.Service_and_Category_ID));//Extracts the Service_and_Category_ID from the DB results

        const addedData = newServicesData.filter(service => !resultIDs.has(service.service_and_category_listID));// Extracts the IDs that are in newServices that are not in resultsIDs

        const serviceIDs = new Set(newServicesData.map(service => service.service_and_category_listID));

        const deletedData = results.filter(result => !serviceIDs.has(result.Service_and_Category_ID));//Checks for IDs that are in results, but not in ServicesData (these will be deleted)
        
        const updatedData = [];

        ServicesData.forEach(service => {
            const matchingResult = results.find(result => result.Service_and_Category_ID === service.service_and_category_listID);

            if (matchingResult) {
                if (matchingResult.Service_time !== service.Service_time || matchingResult.Service_price !== service.Service_price) {
                    updatedData.push(service);
                }
            }
        });//Checks which results and ServicesData have the same IDs, but some other field has changed (ie. price, time). Adds those objects to updatedData

        if(addedData.length > 0){
            for (let i = 0; i<addedData.length; i++){
                // console.log('addedData[i]',addedData[i])
                let sql1 = `INSERT INTO ${table_name} (Service_and_Category_ID, Service_time, Service_price, Doctor_ID) VALUES (?,?,?,?)`;
                let values1 = [addedData[i].service_and_category_listID, addedData[i].Service_time, addedData[i].Service_price, DoctorID];
                try{
                    await connection.execute(sql1, values1);
                }catch(error){
                    console.log(`error in if ${saveServicesData.name}:`, error);
                    return res.status(400).json();
                }
            }
        }
        if(deletedData.length > 0){
            for (let i = 0; i<deletedData.length; i++){
                let sql2 = `DELETE FROM ${table_name} WHERE Service_and_Category_ID = ? AND Doctor_ID = ?`;
                let values2 = [deletedData[i].Service_and_Category_ID, DoctorID];
                try{
                    await connection.execute(sql2, values2);
                }catch(error){
                    console.log(`error in if ${saveServicesData.name}:`, error);
                    return res.status(400).json();
                }
            }
        }
        if(updatedData.length > 0){
            for (let i = 0; i<updatedData.length; i++){
                let sql2 = `UPDATE ${table_name} SET Service_time = ?, Service_price = ? WHERE Service_and_Category_ID = ? AND Doctor_ID = ?`;
                let values2 = [updatedData[i].Service_time, updatedData[i].Service_price, updatedData[i].service_and_category_listID, DoctorID];
                try{
                    await connection.execute(sql2, values2);
                }catch(error){
                    console.log(`error in if ${saveServicesData.name}:`, error);
                    return res.status(400).json();
                }
            }
        }
        return res.status(200).json();
    }else if (ServicesData.length > 0){
        //Can only get into here if formatted results.length not >0: no results from the DB - adding completely new data
        for (let i=0; i<ServicesData.length; i++){
            let sql3 = `INSERT INTO ${table_name} (Service_and_Category_ID, Service_time, Service_price, Doctor_ID) VALUES (?,?,?,?)`;
            let values3 = [ServicesData[i].service_and_category_listID, ServicesData[i].Service_time, ServicesData[i].Service_price, DoctorID];
            try{
                await connection.execute(sql3, values3);
            }catch(error){
                console.log(`error in if ${saveServicesData.name}:`, error);
                return res.status(400).json();
            }
        }
        return res.status(200).json();
    }else{
        //NO new data or queried results from DB.
        return res.status(400).json()
    }
};

export async function saveEducationData (req, res){
    const DoctorUUID = req.cookies.DoctorUUID;
    const DoctorID = await UUID_to_ID(DoctorUUID); // converts DoctorUUID to docid
    const EducationType = req.body.EducationType;//'pre_vet' or 'vet'
    const EducationData = req.body.EducationData; // array of arrays, to make comparing to sql easier.: ie: [[ 13, 56, 7, '1923-01-01', '1923-01-01' ],[ 698, 13, 9, '1923-01-01', '1923-01-01' ]]
    
    const table_name = `${EducationType}_education_mapping`;

    const sql = `SELECT * FROM  ${table_name} WHERE Doctor_ID = ?`
    const values = [DoctorID];
    let formattedResults;

    await DB_Operation(saveEducationData.name, table_name);
    try{
        const [results] = await connection.execute(sql, values);
        formattedResults = results.map(obj => ({
            ...obj,
            Start_Date: new Date(obj.Start_Date).toISOString().slice(0,10),
            End_Date: new Date(obj.End_Date).toISOString().slice(0,10)
          }));//Converts the dates from SQL to a proper format.
    }catch(error){
        console.log(`error in ${saveEducationData.name}:`, error)
        return res.status(400).json();
    }

    if (formattedResults.length > 0) {
        // Doctor already has data in the table
        // will be comparing array of arrays to array of arrays.
        const oldEducationData = formattedResults.map(obj => Object.values(obj).slice(1, -1));// Changes the results into an array of arrays, of the same form as EducationData
        const newEducationData = EducationData;

        // Check for changes in data:
        const addedData = newEducationData.filter(arr1 => !oldEducationData.some(arr2 => JSON.stringify(arr1) === JSON.stringify(arr2)));
        const deletedData = oldEducationData.filter(arr1 => !newEducationData.some(arr2 => JSON.stringify(arr1) === JSON.stringify(arr2)));

        if (addedData.length > 0) {
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
                    console.log(`Education_type not defined ${saveEducationData.name}`);
                    return res.status(400).json();
                }

                try{
                    await connection.execute(sql1, values1);
                }catch(error){
                    console.log(`error in if ${saveEducationData.name}:`, error);
                    return res.status(400).json();
                }
            }
        } 
        if (deletedData.length > 0) {
            let sql2;
            let values2;
            for (let i = 0; i<deletedData.length; i++){
                if(EducationType === 'pre_vet'){
                    sql2 = `DELETE FROM ${table_name} WHERE School_ID = ? AND Major_ID = ? AND Education_type_ID = ? AND Doctor_ID = ?`;
                    values2 = [deletedData[i][0], deletedData[i][1], deletedData[i][2], DoctorID];
                }else if (EducationType === 'vet'){
                    sql2 = `DELETE FROM ${table_name} WHERE School_ID = ? AND Education_type_ID = ? AND Doctor_ID = ?`;
                    values2 = [deletedData[i][0], deletedData[i][1], DoctorID];    
                }else{
                    console.log(`Education_type not defined ${saveEducationData.name}`);
                    return res.status(400).json();
                }
  
                try{
                    await connection.execute(sql2, values2);
                }catch(error){
                    console.log(`error in if ${saveEducationData.name}:`, error);
                    return res.status(400).json();
                }
            }
        }
        return res.status(200).json();
      }
      else if (EducationData.length > 0){
        //Can only get into here if formatted results.length not >0: no results from the DB - adding completely new data
        let sql3;
        let values3;
        for (let i=0; i<EducationData.length; i++){
            if(EducationType === 'pre_vet'){
                sql3 = `INSERT INTO ${table_name} (School_ID, Major_ID, Education_type_ID, Start_Date, End_Date, Doctor_ID) VALUES (?,?,?,?,?,?)`;
                values3 = [EducationData[i][0], EducationData[i][1], EducationData[i][2], EducationData[i][3], EducationData[i][4], DoctorID];
            }else if (EducationType === 'vet'){
                //Needs confirmation: is addedData[i][3] correct?
                sql3 = `INSERT INTO ${table_name} (School_ID, Education_type_ID, Start_Date, End_Date, Doctor_ID) VALUES (?,?,?,?,?)`;
                values3 = [EducationData[i][0], EducationData[i][1], EducationData[i][2], EducationData[i][3], DoctorID];
            }else{
                console.log(`Education_type not defined ${saveEducationData.name}`);
                return res.status(400).json();
            }
            try{
                await connection.execute(sql3, values3);
            }catch(error){
                console.log(`error in if ${saveEducationData.name}:`, error);
                return res.status(400).json();
            }
        }
        return res.status(200).json();
      }
      else{
        //NO new data or queried results from DB.
        return res.status(400).json()
    }
};

export async function saveAddressData (req, res){
    const DoctorUUID = req.cookies.DoctorUUID;
    const DoctorID = await UUID_to_ID(DoctorUUID); // converts DoctorUUID to docid
    
    const AddressData = req.body.AddressData;
    const TimesData = req.body.Times;

    const table_name1 = 'addresses';
    const table_name2 = 'phone'; 
    const table_name3 = 'booking_availability';

    const sql = `SELECT * FROM ${table_name1} JOIN ${table_name2} ON ${table_name1}.addressesID = ${table_name2}.address_ID WHERE ${table_name1}.Doctor_ID = ?`;
    const values = [DoctorID];
    let Address_results;

    await DB_Operation(saveAddressData.name, table_name1);
    try{
        [Address_results] = await connection.execute(sql, values);
    }catch(error){
        console.log(`error in ${saveAddressData.name}:`, error)
        return res.status(400).json();
    }
    if (Address_results.length) {
        const newData = AddressData;
        // Check for changes in data:
        
        //Filter the newData, check if there are any objects whose addressesID is null. Null addressesID means the data is new
        const addedData = newData.filter(data => data.addressesID === 0);

        //Extracts just the IDs of the data that was in the DB, but is not in the new incoming Data
        const deletedData = Address_results
            .filter(result => !newData.some(data => data.addressesID === result.addressesID))
            .map(result => result.addressesID);
        
        const updatedData = getUpdatedAddressRecords(newData, Address_results)

        const unchangedData = getUnchangedAddressRecords(newData, Address_results);

        let returnedData = unchangedData; //initialize the data to return with the data that hasn't changed.

        if (addedData.length > 0) {
            for (let i = 0; i<addedData.length; i++){
                const sql1 = `INSERT INTO ${table_name1} (address_title, address_line_1, address_line_2, city, state, zip, country, address_public_status, address_priority, Doctor_ID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
                const values1 = [addedData[i].address_title, addedData[i].address_line_1, addedData[i].address_line_2, addedData[i].city, addedData[i].state, addedData[i].zip, addedData[i].country, addedData[i].address_public_status, addedData[i].address_priority, DoctorID];
                let insert_results;
                try{
                    [insert_results] = await connection.execute(sql1, values1);
                }catch(error){
                    console.log(`error in adding address data ${saveAddressData.name}:`, error);
                    return res.status(400).json();
                }
                
                const sql2 = `INSERT INTO ${table_name2} (Phone, phone_priority, address_ID) VALUES (?, ?, ?)`
                const values2 = [addedData[i].phone, addedData[i].phone_priority, insert_results.insertId];
                try{
                    await connection.execute(sql2, values2);
                }catch(error){
                    console.log(`error in inserting phone info ${saveAddressData.name}:`, error);
                    return res.status(400);  
                }
                addedData[i].addressesID = insert_results.insertId;
                returnedData.push(addedData[i])
            }
        }
        if (deletedData.length) {
            for (let i = 0; i<deletedData.length; i++){
                //Automatically deletes data in the phone number table, since the two are linked via a cascade
                const sql1 = `DELETE FROM ${table_name1} WHERE addressesID = ?`;
                const values1 = [deletedData[i]];
                try{
                    await connection.execute(sql1, values1);
                }catch(error){
                    console.log(`error in deleting address data ${saveAddressData.name}:`, error);
                    return res.status(400).json();
                }
            }
        }
        if(updatedData.length){
            for (let i = 0; i<updatedData.length; i++){
                const sql1 = `UPDATE ${table_name1} SET address_title = ?, address_line_1 = ?, address_line_2 = ?, city = ?, state = ?, zip = ?, country = ?, address_public_status = ? WHERE addressesID = ?`;
                const values1 = [updatedData[i].address_title, updatedData[i].address_line_1, updatedData[i].address_line_2, updatedData[i].city, updatedData[i].state, updatedData[i].zip, updatedData[i].country, updatedData[i].address_public_status, updatedData[i].addressesID];
                try{
                    await connection.execute(sql1, values1);
                }catch(error){
                    console.log(`error in updatedData address data ${saveAddressData.name}:`, error);
                    return res.status(400).json();
                }
                const sql2 = `UPDATE ${table_name2} SET Phone = ? WHERE address_ID = ?`;
                const values2 = [updatedData[i].phone, updatedData[i].addressesID];
                try{
                    await connection.execute(sql2, values2);
                }catch(error){
                    console.log(`error in updatedData phone address data ${saveAddressData.name}:`, error);
                    return res.status(400).json();
                }
                returnedData.push(updatedData[i])
            }
        }
        //After all address operations are complete, do the TimeData Operations:
        if(returnedData.length){
            // go into each element of the returnedData array.
            //for for the ith element in returnedData, find the corresponding times objects in TimesData (will be the ith element in the TimesData array)
            //compare each of the objects in that TimesData element to all of the data that a select * for that 
            //Select * from timedata table where addressID=returnedData[i].AddressID.
            //see which data is new, and which data is deleted. will be re-declaring addedTimeData, deletedTimeData inside of a loop (that iterates over all the address_IDs)
            //the addedData/deletedData will act inside of a loop, length of addedTimeDAta/deletedTimeData
            for(let i =0; i<returnedData.length; i++){
                const returnedDataData = returnedData[i];
                const corespondingTimeData = TimesData[i];

                const sql = `SELECT * FROM ${table_name3} WHERE ${table_name3}.address_ID = ? AND ${table_name3}.Doctor_ID = ?`;
                const values = [returnedDataData.addressesID, DoctorID];
                let timeDataResults;

                await DB_Operation(saveAddressData.name, table_name1);
                try{
                    [timeDataResults] = await connection.execute(sql, values);
                }catch(error){
                    console.log(`error in tiem data results${saveAddressData.name}:`, error)
                    return res.status(400).json();
                }

                let oldDataDict = Object.fromEntries(timeDataResults.map(item => [item.Day_of_week, item]));
                let newDataDict = Object.fromEntries(corespondingTimeData.map(item => [item.Day_of_week, item]));

                let addedTimeData = Object.values(newDataDict).filter(item => !(item.Day_of_week in oldDataDict));
                let deletedTimeData = Object.values(oldDataDict).filter(item => !(item.Day_of_week in newDataDict));

                let updatedTimeData = Object.values(newDataDict).filter(item => {
                    return (item.Day_of_week in oldDataDict) && 
                      (item.Start_time !== oldDataDict[item.Day_of_week].Start_time || 
                      item.End_time !== oldDataDict[item.Day_of_week].End_time);
                });

                if(addedTimeData.length){
                    for (let j = 0; j<addedTimeData.length; j++){
                        if(addedTimeData[j]){
                            const sql3 = `INSERT INTO ${table_name3} (Day_of_week, Start_time, End_time, address_ID, Doctor_ID) VALUES (?, ?, ?, ?, ?)`;
                            const values3 = [addedTimeData[j].Day_of_week, addedTimeData[j].Start_time, addedTimeData[j].End_time, returnedDataData.addressesID, DoctorID]
                            try{
                                await connection.execute(sql3, values3);
                            }catch(error){
                                console.log(`error in inserting phone info ${saveAddressData.name}:`, error);
                                return res.status(400);  
                            }
                        }
                    }
                }
                if(deletedTimeData.length){
                    for (let j = 0; j<deletedTimeData.length; j++){
                        if(deletedTimeData[j]){
                            const sql3 = `DELETE FROM ${table_name3} WHERE Day_of_week = ? AND Start_time = ? AND End_time = ?`;
                            const values3 = [deletedTimeData[j].Day_of_week, deletedTimeData[j].Start_time, deletedTimeData[j].End_time]
                            try{
                                await connection.execute(sql3, values3);
                            }catch(error){
                                console.log(`error in DELETING time info ${saveAddressData.name}:`, error);
                                return res.status(400);  
                            }
                        }
                    }
                }
                if(updatedTimeData.length){
                    for (let j = 0; j<updatedTimeData.length; j++){
                        if(updatedTimeData[j]){
                            const sql3 = `UPDATE ${table_name3} SET Start_time = ?, End_time = ? WHERE Day_of_week = ? AND address_ID = ?`;
                            const values3 = [updatedTimeData[j].Start_time, updatedTimeData[j].End_time, updatedTimeData[j].Day_of_week, returnedDataData.addressesID]
                            try{
                                await connection.execute(sql3, values3);
                            }catch(error){
                                console.log(`error in updating time info ${saveAddressData.name}:`, error);
                                return res.status(400);  
                            }
                        }
                    }
                }
            }
            return res.status(200).json(returnedData);
        }else{
            //if no addresses:
            return res.status(200).json([])
        }
    } else if (AddressData.length > 0){
        for (let i=0; i<AddressData.length; i++){
            const sql = `INSERT INTO ${table_name1} (address_title, address_line_1, address_line_2, city, state, zip, country, address_public_status, address_priority, Doctor_ID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            const values = [AddressData[i].address_title, AddressData[i].address_line_1, AddressData[i].address_line_2, AddressData[i].city, AddressData[i].state, AddressData[i].zip, AddressData[i].country, AddressData[i].address_public_status, AddressData[i].address_priority, DoctorID];
            let insert_results;
            try{
                [insert_results] = await connection.execute(sql, values);
            }catch(error){
                console.log(`error in adding address data ${saveAddressData.name}:`, error);
                return res.status(400);
            }

            const sql1 = `INSERT INTO ${table_name2} (Phone, phone_priority, address_ID) VALUES (?, ?, ?)`
            const values1 = [AddressData[i].phone, AddressData[i].phone_priority, insert_results.insertId];
            try{
                await connection.execute(sql1, values1);
            }catch(error){
                console.log(`error in inserting phone info ${saveAddressData.name}:`, error);
                return res.status(400);
            }

            if(TimesData[i].length){//Makes sure that there is Time Data to save
                for(let j = 0; j<TimesData.length;j++){
                    const sql2 = `INSERT INTO ${table_name3} (Day_of_week, Start_time, End_time, address_ID, Doctor_ID) VALUES (?, ?, ?, ?, ?)`;
                    const values2 = [TimesData[i][j].Day_of_week, TimesData[i][j].Start_time, TimesData[i][j].End_time, insert_results.insertId, DoctorID]
                    try{
                        await connection.execute(sql2, values2);
                    }catch(error){
                        console.log(`error in inserting phone info ${saveAddressData.name}:`, error);
                        return res.status(400);  
                    }
                }
            }
            AddressData[i].addressesID = insert_results.insertId;
        }
        return res.status(200).json(AddressData);
    }
    else{
        return res.status(400)
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
    const DoctorID = await UUID_to_ID(DoctorUUID); // converts DoctorUUID to docid
    
    const publicAvailibility = req.body.PublicAvailibility;
    const table_name = 'Doctor_specific_info';

    const sql = `UPDATE ${table_name} SET publiclyAvailable = ? WHERE Doctor_ID = ?`;
    const values = [publicAvailibility, DoctorID];

    await DB_Operation(savePublicAvailibilityData.name, table_name);
    try{
        await connection.execute(sql, values);
        return res.status(200).json();
    }catch(error){
        console.log(`error in ${savePublicAvailibilityData.name}:`, error);
        return res.status(400).json();
    }
};
