import _ from "lodash"
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat.js"
dayjs.extend(customParseFormat); // extend Day.js with the plugin
import { UUID_to_ID } from "../../db-and-security-and-helper-functions/UUID.js";
import { connection, DB_Operation } from "../../db-and-security-and-helper-functions/connect.js";
import { clearCookies } from "../../db-and-security-and-helper-functions/cookie-operations.js";
import { getUnchangedAddressRecords, getUpdatedAddressRecords } from "../../db-and-security-and-helper-functions/address-operations.js";

/** savePersonalData is self-explanatory in name
 *  First, converts from UUID to ID. Then, checks if any records exist in basic_doctor_info.
 *  If records don't exist, then it inserts the data.
 *  if records do exist, the data is updated. depending on wheather the data is entered successfully or not, it returns 200/400
 * @param {String} req Cookie from client 
 * @param {Boolean} res 200/400
 * @returns Returns 200/400, depending on wheather the data was saved corretly
 *  DOCUMENTATION LAST UPDATED 3/16/23
 */
export async function savePersonalData (req, res) {
    const DoctorUUID = req.cookies.DoctorUUID
    let DoctorID;
    try {
        DoctorID = await UUID_to_ID(DoctorUUID);
    } catch (error) {
        clearCookies(res, 'Doctor')
        return res.status(401).json({ shouldRedirect: true, redirectURL: '/vet-login' }); 
    }

    const personalInfo = req.body.personalInfo;

    const basic_user_info = 'basic_user_info';
    const sql = `SELECT basic_user_infoID FROM  ${basic_user_info} WHERE User_ID = ?`
    const values = [DoctorID];
    let results;
    //this is upsert:
    
    await DB_Operation(savePersonalData.name, basic_user_info);
    try {
        [results] = await connection.execute(sql, values);
    } catch(error) {
        return res.status(400).json();
    }

    // Combine date parts into a single string
    const dateOfBirthStr = `${personalInfo.DOB_month} ${personalInfo.DOB_day} ${personalInfo.DOB_year}`;

    // Convert the string to a Date object and format it
    const dateOfBirth = dayjs(dateOfBirthStr, 'MMMM D YYYY').format('YYYY-MM-DD');
    const values1 = [personalInfo.FirstName, personalInfo.LastName, personalInfo.Gender, dateOfBirth, DoctorID];

    if (_.isEmpty(results)) {// if no results, then insert.
        const sql1 = `INSERT INTO ${basic_user_info} (FirstName, LastName, Gender, DOB, User_ID) VALUES (?, ?, ?, ?, ?)`;
        try {
            await connection.execute(sql1, values1);
            return res.status(200).json();
        } catch(error) {
            return res.status(400).json();
        }
    } else {// if there are results, that means that the record exists, and needs to be altered
        const sql1 = `UPDATE ${basic_user_info} SET FirstName = ?, LastName = ?, Gender = ?, DOB = ? WHERE User_ID = ?`;
        try {
            await connection.execute(sql1, values1);
            return res.status(200).json();
        } catch(error) {
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
export async function saveDescriptionData (req, res) {
    const DoctorUUID = req.cookies.DoctorUUID;
    let DoctorID;
    try {
        DoctorID = await UUID_to_ID(DoctorUUID);
    } catch (error) {
        clearCookies(res, 'Doctor')
        return res.status(401).json({ shouldRedirect: true, redirectURL: '/vet-login' }); 
    }

    const description = req.body.Description;
    const descriptions = 'descriptions';

    const sql = `SELECT descriptionsID FROM  ${descriptions} WHERE Doctor_ID = ?`;
    const values = [DoctorID];
    let results;
    
    await DB_Operation(saveDescriptionData.name, descriptions);
    try {
        [results] = await connection.execute(sql, values);
    } catch(error) {
        return res.status(400).json();
    }
    const values1 = [description.Description, DoctorID];

    if (_.isEmpty(results)) {// if no results, then insert.
        const sql1 = `INSERT INTO ${descriptions} (Description, Doctor_ID) VALUES (?, ?)`;
        try {
            await connection.execute(sql1, values1);
            return res.status(200).json();
        } catch(error) {
            return res.status(400).json();
        }
    } else {// if there are results, that means that the record exists, and needs to be altered
        const sql1 = `UPDATE ${descriptions} SET Description = ? WHERE Doctor_ID = ?`;
        try {
            await connection.execute(sql1, values1);
            return res.status(200).json();
        } catch(error) {
            return res.status(400).json();
        }
    }
};

/** saveGeneralData saves either Language, Pet, or Specialty Data
 *  First, converts from DoctorUUID to DoctorID. Then, performs operations depending on the operationType
 *  Need to set the userID or DoctorID because Languages are used by both Doctors and Patients (and the foreign key is thus User_ID)
 *  The mapping file is chosen based on the DataType (can either be Specialty, or Language)
 * @param {String} req Cookie from client, type of data, list of data (ie list of languages, or specialties)
 * @param {Boolean} res 200/400
 * @returns Returns 200/400, depending on wheather the data was saved correctly
 *  DOCUMENTATION LAST UPDATED 6/423
 */
export async function saveGeneralData (req, res) {
    const DoctorUUID = req.cookies.DoctorUUID;
    let DoctorID;
    try {
        DoctorID = await UUID_to_ID(DoctorUUID);
    } catch (error) {
        clearCookies(res, 'Doctor')
        return res.status(401).json({ shouldRedirect: true, redirectURL: '/vet-login' }); 
    }

    const DataType = req.body.DataType
    const operationType = req.body.operationType;
    const DataTypelower = DataType.charAt(0).toLowerCase() + DataType.slice(1);

    let UserIDorDoctorID;

    if (DataTypelower === 'language') UserIDorDoctorID = 'User_ID'
    else UserIDorDoctorID = 'Doctor_ID'

    const doctorData = req.body.Data; // The Data is an array of the ID of the DataType ([6]), which is a specific Language_ID)

    const table_name = `${DataTypelower}_mapping`;

    await DB_Operation(saveGeneralData.name, table_name);

    if (operationType === 'add') {
        const sql = `INSERT INTO ${table_name} (${DataType}_ID, ${UserIDorDoctorID}) VALUES (?, ?)`;
        const values = [doctorData, DoctorID];
        
        try {
            await connection.execute(sql, values);
            return res.status(200).json();
        } catch(error) {
            return res.status(400).json();
        }
    } else if (operationType === 'delete') {
        const sql = `DELETE FROM ${table_name} WHERE ${DataType}_ID = ? AND ${UserIDorDoctorID} = ?`;
        const values = [doctorData, DoctorID];
        try {
            await connection.execute(sql, values);
            return res.status(200).json();
        } catch(error) {
            return res.status(400).json();
        }
    } else {
        return res.status(400).json();
    }
};

/** saveServicesData saves the services that a doctor offers
 *  First, converts from DoctorUUID to DoctorID. 
 *  Searches the DB for existing service data.
 *  Finds the difference between the incoming data and the saved data. Inserts/deletes/updates accordingly
 * @param {String} req Cookie from client, list of Servicesdata
 * @param {Boolean} res 200/400
 * @returns Returns 200/400, depending on wheather the data was saved correctly
 *  DOCUMENTATION LAST UPDATED 6/423
 */
export async function saveServicesData (req, res) {
    const DoctorUUID = req.cookies.DoctorUUID;
    let DoctorID;
    try {
        DoctorID = await UUID_to_ID(DoctorUUID);
    } catch (error) {
        clearCookies(res, 'Doctor')
        return res.status(401).json({ shouldRedirect: true, redirectURL: '/vet-login' }); 
    }
    
    const ServicesData = req.body.ServicesData; //Array of Objects
    
    const service_mapping = `service_mapping`;

    const sql = `SELECT Service_and_Category_ID FROM  ${service_mapping} WHERE Doctor_ID = ?`
    const values = [DoctorID];
    let results;

    await DB_Operation(saveServicesData.name, service_mapping);
    try {
        [results] = await connection.execute(sql, values);
    } catch(error) {
        return res.status(400).json();
    }

    if (!_.isEmpty(results)) {
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
                if (matchingResult.Service_time !== service.Service_time || matchingResult.Service_price !== service.Service_price) updatedData.push(service);
            }
        });//Checks which results and ServicesData have the same IDs, but some other field has changed (ie. price, time). Adds those objects to updatedData

        if (!_.isEmpty(addedData)) {
            for (let i = 0; i<addedData.length; i++) {
                const sql = `INSERT INTO ${service_mapping} (Service_and_Category_ID, Service_time, Service_price, Doctor_ID) VALUES (?, ?, ?, ?)`;
                const values = [addedData[i].service_and_category_listID, addedData[i].Service_time, addedData[i].Service_price, DoctorID];
                try {
                    await connection.execute(sql, values);
                } catch(error) {
                    return res.status(400).json();
                }
            }
        }
        if (!_.isEmpty(deletedData)) {
            for (let i = 0; i<deletedData.length; i++) {
                const sql = `DELETE FROM ${service_mapping} WHERE Service_and_Category_ID = ? AND Doctor_ID = ?`;
                const values = [deletedData[i].Service_and_Category_ID, DoctorID];
                try {
                    await connection.execute(sql, values);
                } catch(error) {
                    return res.status(400).json();
                }
            }
        }
        if (!_.isEmpty(updatedData)) {
            for (let i = 0; i<updatedData.length; i++) {
                const sql = `UPDATE ${service_mapping} SET Service_time = ?, Service_price = ? WHERE Service_and_Category_ID = ? AND Doctor_ID = ?`;
                const values = [updatedData[i].Service_time, updatedData[i].Service_price, updatedData[i].service_and_category_listID, DoctorID];
                try {
                    await connection.execute(sql, values);
                } catch(error) {
                    return res.status(400).json();
                }
            }
        }
        return res.status(200).json();
    } else if (!_.isEmpty(ServicesData)) {
        for (let i=0; i<ServicesData.length; i++) {
            const sql = `INSERT INTO ${service_mapping} (Service_and_Category_ID, Service_time, Service_price, Doctor_ID) VALUES (?, ?, ?, ?)`;
            const values = [ServicesData[i].service_and_category_listID, ServicesData[i].Service_time, ServicesData[i].Service_price, DoctorID];
            try {
                await connection.execute(sql, values);
            } catch(error) {
                return res.status(400).json();
            }
        }
        return res.status(200).json();
    } else {
        //NO new data or queried results from DB.
        return res.status(400).json()
    }
};

/** saveEducationData is self-explanatory in name
 *  First, converts from DoctorUUID to DoctorID. Then, performs operations depending on the operationType
 *  Depending on wheather the operationType is add or delete, different operations are performed (INSERT vs DELETE)
 * @param {String} req Cookie from client, type of education data, operationType (add or delete), EducationData (ie pre-vet or vet)
 * @param {Boolean} res 200/400
 * @returns Returns 200/400, depending on wheather the data was saved correctly
 *  DOCUMENTATION LAST UPDATED 6/423
 */
export async function saveEducationData (req, res) {
    const DoctorUUID = req.cookies.DoctorUUID;
    let DoctorID;
    try {
        DoctorID = await UUID_to_ID(DoctorUUID);
    } catch (error) {
        clearCookies(res, 'Doctor')
        return res.status(401).json({ shouldRedirect: true, redirectURL: '/vet-login' }); 
    }

    const EducationData = req.body.EducationData; // array of arrays, to make comparing to sql easier.: ie: [[ 13, 56, 7, '1923-01-01', '1923-01-01' ],[ 698, 13, 9, '1923-01-01', '1923-01-01' ]]
    const EducationType = req.body.EducationType;//'pre_vet' or 'vet'
    const operationType = req.body.operationType;

    const table_name = `${EducationType}_education_mapping`;
    let sql;
    let values;

    await DB_Operation(saveEducationData.name, table_name);
    if (operationType === 'add') {
        if (EducationType === 'pre_vet') {
            sql = `INSERT INTO ${table_name} (School_ID, Major_ID, Education_type_ID, Start_Date, End_Date, Doctor_ID) VALUES (?, ?, ?, ?, ?, ?)`;
            values = [EducationData.School_ID, EducationData.Major_ID, EducationData.Education_type_ID, EducationData.Start_date, EducationData.End_date, DoctorID];    
        } else if (EducationType === 'vet') {
            sql = `INSERT INTO ${table_name} (School_ID, Education_type_ID, Start_Date, End_Date, Doctor_ID) VALUES (?, ?, ?, ?, ?)`;
            values = [EducationData.School_ID, EducationData.Education_type_ID, EducationData.Start_date, EducationData.End_date, DoctorID];    
        } else {
            return res.status(400).json();
        }
    } else if (operationType === 'delete') {
        values = [EducationData];
        if (EducationType === 'pre_vet') sql = `DELETE FROM ${table_name} WHERE pre_vet_education_mappingID = ?`;
        else if (EducationType === 'vet') sql = `DELETE FROM ${table_name} WHERE vet_education_mappingID = ?`;
        else {
            return res.status(400).json();
        }
    } else {
        return res.status(400).json();
    }
    
    try {
        const [response] = await connection.execute(sql, values);
        return res.status(200).json(response.insertId);
    } catch (error) {
        return res.status(400).json();
    }    
};

/** saveAddressData saves address, phone, and booking availbility data.
 *  This is essentially three functions in one, since we have to operate on addresses, phones, and booking availiblity
 *  First, checks if any address data already exists. If it doesn't, then just add the incoming data, no need to update/delete
 *  If there exists saved data, need to determine if any of the past data has changed, or if data is just being added.
 *  Filters are created which find which of the incoming data is new, updated, unchanged, or deleted (relative to the savedData)
 *  After address/phone data are updated/added/deleted, we move on to operating on times. 
 *  For each of the objects in the data that will be returned, we determine if the time data needs to be added, updated, or deleted.
 *  After time operations are completed, the address data is returned to the client, to assign IDs to each of the addresses (so that when saving again, can know which addresses are new)
 *  New addresses have their addressesID as 0
 * @param {Array} req Cookie from client, AddressData, TimesData
 * @param {Array} res 200/400, address data
 * @returns Returns 200/400, depending on wheather the data was saved correctly. Also returns the address and times data
 *  DOCUMENTATION LAST UPDATED 6/423
 */
export async function saveAddressData (req, res) {
    const DoctorUUID = req.cookies.DoctorUUID;
    let DoctorID;
    try {
        DoctorID = await UUID_to_ID(DoctorUUID);
    } catch (error) {
        clearCookies(res, 'Doctor')
        return res.status(401).json({ shouldRedirect: true, redirectURL: '/vet-login' }); 
    }

    const AddressData = req.body.AddressData;
    const TimesData = req.body.Times;
    const [addresses, phone, booking_availability] = ['addresses', 'phone', 'booking_availability'];

    const sql = `SELECT addressesID FROM ${addresses} WHERE ${addresses}.isActive = 1 AND ${addresses}.Doctor_ID = ?`;
    const values = [DoctorID];
    let Address_results;

    await DB_Operation(saveAddressData.name, addresses);
    try {
        [Address_results] = await connection.execute(sql, values);
    } catch(error) {
        return res.status(400).json();
    }

    if (!_.isEmpty(Address_results)) {
        for (let Address_result of Address_results) {
            const sql2 = `SELECT ${phone}.Phone, ${phone}.phone_priority 
            FROM ${phone} 
            WHERE ${phone}.address_ID = ?`;

            const [phones] = await connection.execute(sql2, [Address_result.addressesID]);
            if (_.isEmpty(phones)) Address_result.phone = "";
            else Address_result.phone = phones[0];
        };
        const newData = AddressData;
        // Check for changes in data:
        
        //Filter the newData, check if there are any objects whose addressesID is null. Null addressesID means the data is new
        const addedData = newData.filter(data => data.addressesID === 0);

        //Extracts just the IDs of the data that was in the DB, but is not in the new incoming Data
        const deletedData = Address_results
            .filter(result => !newData.some(data => data.addressesID === result.addressesID))
            .map(result => result.addressesID);
        
        const updatedData = getUpdatedAddressRecords(newData, Address_results);

        const unchangedData = getUnchangedAddressRecords(newData, Address_results);

        let returnedData = unchangedData; //initialize the data to return with the data that hasn't changed.

        if (!_.isEmpty(addedData)) {
            for (let i = 0; i<addedData.length; i++) {
                const sql = `INSERT INTO ${addresses} 
                    (address_title, address_line_1, address_line_2, city, state, zip, country, address_public_status, address_priority, instant_book, isActive, Doctor_ID) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
                const values = [addedData[i].address_title, addedData[i].address_line_1, addedData[i].address_line_2, addedData[i].city, addedData[i].state, addedData[i].zip, addedData[i].country, addedData[i].address_public_status, addedData[i].address_priority, addedData[i].instant_book, 1, DoctorID];
                let insert_results;
                try {
                    [insert_results] = await connection.execute(sql, values);
                } catch(error) {
                    return res.status(400).json();
                }

                if (addedData[i].phone) {
                    const sql = `INSERT INTO ${phone} (Phone, phone_priority, address_ID) VALUES (?, ?, ?)`
                    const values = [addedData[i].phone, addedData[i].phone_priority, insert_results.insertId];
                    try {
                        await connection.execute(sql, values);
                    } catch(error) {
                        return res.status(400);  
                    }
                }
                addedData[i].addressesID = insert_results.insertId;
                returnedData.push(addedData[i])
            }
        }
        if (!_.isEmpty(deletedData)) {
            for (let i = 0; i<deletedData.length; i++) {
                //Automatically deletes data in the phone number table, since the two are linked via a cascade
                const sql = `UPDATE ${addresses} SET isActive = 0 WHERE addressesID = ?`;
                const values = [deletedData[i]];
                try {
                    await connection.execute(sql, values);
                } catch(error) {
                    return res.status(400).json();
                }
            }
        }
        if (!_.isEmpty(updatedData)) {
            for (let i = 0; i<updatedData.length; i++) {
                const sql1 = `UPDATE ${addresses} 
                    SET address_title = ?, address_line_1 = ?, address_line_2 = ?, city = ?, state = ?, zip = ?, country = ?, address_public_status = ?, instant_book = ?
                    WHERE addressesID = ?`;
                const values1 = [updatedData[i].address_title, updatedData[i].address_line_1, updatedData[i].address_line_2, updatedData[i].city, updatedData[i].state, updatedData[i].zip, updatedData[i].country, updatedData[i].address_public_status, updatedData[i].instant_book, updatedData[i].addressesID];
                try {
                    await connection.execute(sql1, values1);
                } catch(error) {
                    return res.status(400).json();
                }

                const sql2 = `SELECT phone_numbersID FROM ${phone} where address_ID = ?`;
                const values2 = [updatedData[i].addressesID];
                let results;

                try {
                    [results] = await connection.execute(sql2, values2);
                } catch(error) {
                    return res.status(400).json();
                }
                if (!_.isEmpty(results)) {
                    if (updatedData[i].phone) {
                        const sql = `UPDATE ${phone} SET phone = ? WHERE address_ID = ?`;
                        const values = [updatedData[i].phone, updatedData[i].addressesID];
                        try {
                            await connection.execute(sql, values);
                        } catch(error) {
                            return res.status(400).json();
                        }
                    }
                } else {
                    const sql = `INSERT INTO ${phone} (Phone, phone_priority, address_ID) VALUES (?, ?, ?)`;
                    const values = [updatedData[i].phone, 0, updatedData[i].addressesID];//need to figure out why phone_priority not in updatedData
                    try {
                        await connection.execute(sql, values);
                    } catch(error) {
                        return res.status(400).json();
                    }     
                }
                returnedData.push(updatedData[i])
            }
        }
        //After all address operations are complete, do the TimeData Operations:
        if (!_.isEmpty(returnedData)) {
            // go into each element of the returnedData array.
            //for for the ith element in returnedData, find the corresponding times objects in TimesData (will be the ith element in the TimesData array)
            //compare each of the objects in that TimesData element to all of the data that a select Day_of_week, Start_time, End_time for that 
            //Select Day_of_week, Start_time, End_time from timedata table where addressID=returnedData[i].AddressID.
            //see which data is new, and which data is deleted. will be re-declaring addedTimeData, deletedTimeData inside of a loop (that iterates over all the address_IDs)
            //the addedData/deletedData will act inside of a loop, length of addedTimeDAta/deletedTimeData
            for(let i = 0; i<returnedData.length; i++) {
                const returnedDataData = returnedData[i];
                const corespondingTimeData = TimesData[i];

                const sql = `SELECT Day_of_week, Start_time, End_time FROM ${booking_availability} WHERE ${booking_availability}.address_ID = ? AND ${booking_availability}.Doctor_ID = ?`;
                const values = [returnedDataData.addressesID, DoctorID];
                let timeDataResults;

                await DB_Operation(saveAddressData.name, addresses);
                try {
                    [timeDataResults] = await connection.execute(sql, values);
                } catch(error) {
                    return res.status(400).json();
                }

                const oldDataDict = Object.fromEntries(timeDataResults.map(item => [item.Day_of_week, item]));
                const newDataDict = Object.fromEntries(corespondingTimeData.map(item => [item.Day_of_week, item]));

                const addedTimeData = Object.values(newDataDict).filter(item => !(item.Day_of_week in oldDataDict));
                const deletedTimeData = Object.values(oldDataDict).filter(item => !(item.Day_of_week in newDataDict));

                const updatedTimeData = Object.values(newDataDict).filter(item => {
                    return (item.Day_of_week in oldDataDict) && 
                      (item.Start_time !== oldDataDict[item.Day_of_week].Start_time || 
                      item.End_time !== oldDataDict[item.Day_of_week].End_time);
                });

                if (!_.isEmpty(addedTimeData)) {
                    for (let j = 0; j<addedTimeData.length; j++) {
                        if (addedTimeData[j]) {
                            const sql = `INSERT INTO ${booking_availability} (Day_of_week, Start_time, End_time, address_ID, Doctor_ID) VALUES (?, ?, ?, ?, ?)`;
                            const values = [addedTimeData[j].Day_of_week, addedTimeData[j].Start_time, addedTimeData[j].End_time, returnedDataData.addressesID, DoctorID]
                            try {
                                await connection.execute(sql, values);
                            } catch(error) {
                                return res.status(400).json();  
                            }
                        }
                    }
                }
                if (!_.isEmpty(deletedTimeData)) {
                    for (let j = 0; j<deletedTimeData.length; j++) {
                        if (deletedTimeData[j]) {
                            const sql = `DELETE FROM ${booking_availability} WHERE Day_of_week = ? AND Start_time = ? AND End_time = ?`;
                            const values = [deletedTimeData[j].Day_of_week, deletedTimeData[j].Start_time, deletedTimeData[j].End_time]
                            try {
                                await connection.execute(sql, values);
                            } catch(error) {
                                return res.status(400).json();  
                            }
                        }
                    }
                }
                if (!_.isEmpty(updatedTimeData)) {
                    for (let j = 0; j<updatedTimeData.length; j++) {
                        if (updatedTimeData[j]) {
                            const sql = `UPDATE ${booking_availability} SET Start_time = ?, End_time = ? WHERE Day_of_week = ? AND address_ID = ?`;
                            const values = [updatedTimeData[j].Start_time, updatedTimeData[j].End_time, updatedTimeData[j].Day_of_week, returnedDataData.addressesID]
                            try {
                                await connection.execute(sql, values);
                            } catch(error) {
                                return res.status(400).json();  
                            }
                        }
                    }
                }
            }
            return res.status(200).json(returnedData);
        } else {
            //if no addresses:
            return res.status(200).json([])
        }
    } else if (!_.isEmpty(AddressData)) {
        for (let i=0; i<AddressData.length; i++) {
            const sql = `INSERT INTO ${addresses} 
                (address_title, address_line_1, address_line_2, city, state, zip, country, address_public_status, address_priority, instant_book, isActive, Doctor_ID) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            const values = [AddressData[i].address_title, AddressData[i].address_line_1, AddressData[i].address_line_2, AddressData[i].city, AddressData[i].state, AddressData[i].zip, AddressData[i].country, AddressData[i].address_public_status, AddressData[i].address_priority, AddressData[i].instant_book, 1, DoctorID];
            let insert_results;
            try {
                [insert_results] = await connection.execute(sql, values);
            } catch(error) {
                return res.status(400).json();
            }

            if (AddressData[i].phone) {
                const sql = `INSERT INTO ${phone} (Phone, phone_priority, address_ID) VALUES (?, ?, ?)`
                const values = [AddressData[i].phone, AddressData[i].phone_priority, insert_results.insertId];
                try {
                    await connection.execute(sql, values);
                } catch(error) {
                    return res.status(400).json();
                }
            }
            if (!_.isEmpty(TimesData[i])) {//Makes sure that there is Time Data to save
                for(let j = 0; j<TimesData.length;j++) {
                    const sql = `INSERT INTO ${booking_availability} (Day_of_week, Start_time, End_time, address_ID, Doctor_ID) VALUES (?, ?, ?, ?, ?)`;
                    const values = [TimesData[i][j].Day_of_week, TimesData[i][j].Start_time, TimesData[i][j].End_time, insert_results.insertId, DoctorID];
                    try {
                        await connection.execute(sql, values);
                    } catch(error) {
                        return res.status(400).json();  
                    }
                }
            }
            AddressData[i].addressesID = insert_results.insertId;
        }
        return res.status(200).json(AddressData);
    }
    else{
        return res.status(400).json();
    }
};

/** savePublicAvailibilityData is a Doctor-controlled function that allows them to say wheather or not they want their profile accessible to patients
 *  First, converts from UUID to ID. Then, updates the doctor's avalibility to whatever they did on the front-end. The request is only allowed to happen if the new availiblty status is dfferent from the old one.
 * @param {String} req Cookie from client, PublicAvailibility status
 * @param {Boolean} res 200 or 400
 * @returns status code 200 or 400
 *  DOCUMENTATION LAST UPDATED 3/16/23
 */
export async function savePublicAvailibilityData (req, res) {
    const DoctorUUID = req.cookies.DoctorUUID;
    let DoctorID;
    try {
        DoctorID = await UUID_to_ID(DoctorUUID);
    } catch (error) {
        clearCookies(res, 'Doctor')
        return res.status(401).json({ shouldRedirect: true, redirectURL: '/vet-login' }); 
    }
    
    const publicAvailibility = req.body.PublicAvailibility;
    const Doctor_specific_info = 'Doctor_specific_info';

    const sql = `UPDATE ${Doctor_specific_info} SET publiclyAvailable = ? WHERE Doctor_ID = ?`;
    const values = [publicAvailibility, DoctorID];

    await DB_Operation(savePublicAvailibilityData.name, Doctor_specific_info);
    try {
        await connection.execute(sql, values);
        return res.status(200).json();
    } catch(error) {
        return res.status(400).json();
    }
};
