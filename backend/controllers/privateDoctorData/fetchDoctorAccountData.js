import {connection, DB_Operation} from "../../dbAndSecurity/connect.js"
import _ from "lodash"

/** FetchDoctorAccountData is fairly self-explanatory
 *  Here, each Doctor's particular data is fetched from the DB.
 *  For the functions with multiple table names, joins are used to match a particular doctor's records with the actual name.
 *  For example, a table might have: {Bob, 3}, {Bob, 7}, and then a mapping table shows that 3 and 7 are actually English and French. This is done to keep the data in the mapping tables as small as possible
 *  DOCUMENTATION LAST UPDATED 6/4/23
 */
export default new class FetchDoctorAccountData {
    async FetchDoctorLanguages (User_ID) {
        const functionName = this.FetchDoctorLanguages.bind(this).name;
        const [language_mapping, language_list] = ['language_mapping', 'language_list'];
    
        const sql = `SELECT ${language_list}.Language_name, ${language_list}.language_listID 
            FROM ${language_list} JOIN ${language_mapping} ON ${language_list}.language_listID = ${language_mapping}.Language_ID 
            WHERE ${language_mapping}.User_ID = ?`;

        const values = [User_ID];
        await DB_Operation(functionName, language_mapping);

        try {
            const [results] = await connection.execute(sql, values);
            return results;
        } catch(error) {
            console.log(`error in ${functionName}:`, error)
            return [];
        }
    };

    async FetchDoctorServices (Doctor_ID) {
        const functionName = this.FetchDoctorServices.bind(this).name;

        const [service_mapping, service_and_category_list] = ['service_mapping', 'service_and_category_list'];
    
        const sql = `SELECT ${service_and_category_list}.Category_name, ${service_and_category_list}.Service_name, ${service_and_category_list}.service_and_category_listID, ${service_mapping}.Service_time, ${service_mapping}.Service_price 
            FROM ${service_and_category_list} JOIN ${service_mapping} ON ${service_and_category_list}.service_and_category_listID = ${service_mapping}.Service_and_Category_ID 
            WHERE ${service_mapping}.Doctor_ID = ?`;

        const values = [Doctor_ID];
        await DB_Operation(functionName, service_mapping);
    
        try {
            const [results] = await connection.execute(sql, values);
            return results;
        } catch(error) {
            console.log(`error in ${functionName}:`, error)
            return [];
        }
    };

    async FetchDoctorSpecialties (Doctor_ID) {
        const functionName = this.FetchDoctorSpecialties.bind(this).name;

        const [specialty_mapping, specialties_list] = ['specialty_mapping', 'specialties_list'];
    
        const sql = `SELECT ${specialties_list}.Organization_name, ${specialties_list}.Specialty_name, ${specialties_list}.specialties_listID 
            FROM ${specialties_list} JOIN ${specialty_mapping} ON ${specialties_list}.specialties_listID = ${specialty_mapping}.specialty_ID 
            WHERE ${specialty_mapping}.Doctor_ID = ?`;

        const values = [Doctor_ID];
        await DB_Operation(functionName, specialty_mapping);
    
        try {
            const [results] = await connection.execute(sql, values);
            return results;
        } catch(error) {
            console.log(`error in ${functionName}:`, error)
            return [];
        }
    };
    
    async FetchPreVetEducation (Doctor_ID) {
        const functionName = this.FetchPreVetEducation.bind(this).name;
        const [pre_vet_education_mapping, pre_vet_school_list, major_list, pre_vet_education_type_list] = ['pre_vet_education_mapping', 'pre_vet_school_list', 'major_list', 'pre_vet_education_type_list' ];
    
        const sql = `SELECT ${pre_vet_school_list}.School_name, ${major_list}.Major_name, ${pre_vet_education_type_list}.Education_type, ${pre_vet_education_mapping}.Start_Date, ${pre_vet_education_mapping}.End_Date, ${pre_vet_education_mapping}.pre_vet_education_mappingID 
            FROM ${pre_vet_education_mapping}, ${pre_vet_school_list}, ${major_list}, ${pre_vet_education_type_list} 
            WHERE ${pre_vet_education_mapping}.School_ID = ${pre_vet_school_list}.pre_vet_school_listID AND ${pre_vet_education_mapping}.Major_ID = ${major_list}.major_listID 
            AND ${pre_vet_education_mapping}.Education_type_ID = ${pre_vet_education_type_list}.pre_vet_education_typeID AND ${pre_vet_education_mapping}.Doctor_ID = ?`;

        const values = [Doctor_ID];
        await DB_Operation(functionName, pre_vet_education_mapping);

        try {
            const [results] = await connection.execute(sql, values);
            const newResults = results.map(obj => ({
                ...obj,
                Start_Date: new Date(obj.Start_Date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
                End_Date: new Date(obj.End_Date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
            }));//Converts the dates to a proper format.
            return newResults
        } catch(error) {
            console.log(`error in ${functionName}:`, error)
            return [];
        }
    };
    
    async FetchVetEducation (Doctor_ID) {
        const functionName = this.FetchVetEducation.bind(this).name;

        const [vet_education_mapping, vet_school_list, vet_education_type_list] = ['vet_education_mapping', 'vet_school_list', 'vet_education_type_list'];
    
        const sql = `SELECT ${vet_school_list}.School_name, ${vet_education_type_list}.Education_type, ${vet_education_mapping}.Start_Date, ${vet_education_mapping}.End_Date, ${vet_education_mapping}.vet_education_mappingID
            FROM ${vet_education_mapping}, ${vet_school_list}, ${vet_education_type_list} 
            WHERE ${vet_education_mapping}.School_ID = ${vet_school_list}.vet_school_listID 
            AND ${vet_education_mapping}.Education_type_ID = ${vet_education_type_list}.vet_education_typeID 
            AND ${vet_education_mapping}.Doctor_ID = ?`;
        
        const values = [Doctor_ID];
        await DB_Operation(functionName, vet_education_mapping);

        try {
            const [results] = await connection.execute(sql, values);
            const newResults = results.map(obj => ({
                ...obj,
                Start_Date: new Date(obj.Start_Date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
                End_Date: new Date(obj.End_Date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
            }));//Converts the dates to a proper format.
            return newResults
        } catch(error) {
            console.log(`error in ${functionName}:`, error)
            return [];
        }
    };
    //Fetch Address Data first finds the addresses associated with a Doctor_ID, and then finds all of the times/days of week associated with each address.
    async FetchDoctorAddressData (Doctor_ID) {
        const functionName = this.FetchDoctorAddressData.bind(this).name;

        const [phone, addresses, booking_availability] =  ['phone', 'addresses', 'booking_availability'];
        
        const sql = `SELECT ${addresses}.addressesID, ${addresses}.address_title, ${addresses}.address_line_1, 
            ${addresses}.address_line_2, ${addresses}.city, ${addresses}.state, ${addresses}.zip, 
            ${addresses}.country, ${addresses}.address_priority, ${addresses}.address_public_status, ${addresses}.instant_book
            FROM ${addresses}
            WHERE ${addresses}.isActive = 1 AND ${addresses}.Doctor_ID = ? `;
        
        const values = [Doctor_ID];

        await DB_Operation(functionName, addresses);
   
        try {
            const [results] = await connection.execute(sql, values);
            
            if (!_.isEmpty(results)) {
                for (let result of results) {
                    const sql1 = `SELECT ${booking_availability}.Day_of_week, ${booking_availability}.Start_time, ${booking_availability}.End_time 
                        FROM ${booking_availability} 
                        WHERE ${booking_availability}.address_ID = ?`;
        
                    const [times] = await connection.execute(sql1, [result.addressesID]);
                    result.times = times;

                    const sql2 = `SELECT ${phone}.Phone, ${phone}.phone_priority 
                        FROM ${phone} 
                        WHERE ${phone}.address_ID = ?`;
        
                    const [phones] = await connection.execute(sql2, [result.addressesID]);
                    if (_.isEmpty(phones)) result.phone = "";
                    else {
                        result.phone = phones[0].phone;
                        result.phone_priority = phones[0].phone_priority;
                    }
                }
            }
            return results;
        } catch(error) {
            console.log(`error in ${functionName}:`, error)
            return [];
        }
    };

    async FetchDescriptionData (Doctor_ID) {
        const functionName = this.FetchDescriptionData.bind(this).name;

        const [descriptions] = ['descriptions'];
    
        const sql = `SELECT Description 
            FROM ${descriptions} 
            WHERE Doctor_ID = ?`;
        
        const values = [Doctor_ID];
        await DB_Operation(functionName, descriptions);

        try {
            const [results] = await connection.execute(sql, values);
            if (_.isEmpty(results)) return {Description: ''};
            else {
                const Description = results[0]
                return (Description);
            }
        } catch(error) {
            console.log(`error in ${functionName}:`, error)
            return {Description: ''};
        }
    };

    async FetchServicedPets (Doctor_ID) {
        const functionName = this.FetchServicedPets.bind(this).name;

        const [pet_mapping, pet_list] = ['pet_mapping', 'pet_list'];
    
        const sql = `SELECT ${pet_list}.pet, ${pet_list}.pet_type, ${pet_list}.pet_listID
            FROM ${pet_list} JOIN ${pet_mapping} ON ${pet_list}.pet_listID = ${pet_mapping}.pet_ID 
            WHERE ${pet_mapping}.Doctor_ID = ?`;
        
        const values = [Doctor_ID];
        await DB_Operation(functionName, pet_mapping);

        try {
            const [results] = await connection.execute(sql, values);
            return results;
        } catch(error) {
            console.log(`error in ${functionName}:`, error)
            return [];
        }
    };
  
    async FetchPubliclyAvailable (Doctor_ID) {
        const functionName = this.FetchDescriptionData.bind(this).name;

        const [Doctor_specific_info] = ['Doctor_specific_info'];
    
        const sql = `SELECT publiclyAvailable, verified 
            FROM ${Doctor_specific_info} 
            WHERE Doctor_ID = ?`;
        
        const values = [Doctor_ID];
        await DB_Operation(functionName, Doctor_specific_info);

        try {
            const [results] = await connection.execute(sql, values);
            if (_.isEmpty(results)) return [{PubliclyAvailable: false}, {Verified: false}];
            else return [{PubliclyAvailable: results[0].publiclyAvailable}, {Verified: results[0].publiclyAvailable}];
        } catch(error) {
            console.log(`error in ${functionName}:`, error);
            return [{PubliclyAvailable: false}, {Verified: false}];
        }
    };

    async FetchDoctorPictures (Doctor_ID) {
        const functionName = this.FetchDoctorPictures.bind(this).name;

        const [pictures] = ['pictures'];
    
        const sql = `SELECT picture_link, picture_number 
            FROM ${pictures} 
            WHERE Doctor_ID = ?`;
        
        const values = [Doctor_ID];
        await DB_Operation(functionName, pictures);
    
        try {
            const [results] = await connection.execute(sql, values);
            return results;
        } catch(error) {
            console.log(`error in ${functionName}:`, error)
            return [];
        }
    };
}();
