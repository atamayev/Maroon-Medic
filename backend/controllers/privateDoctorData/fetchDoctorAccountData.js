import {connection, useDB} from "../../dbAndSecurity/connect.js"
import Crypto from "../../dbAndSecurity/crypto.js";

/** FetchDoctorAccountData is fairly self-explanatory
 *  Here, each Doctor's particular data is fetched from the DB.
 *  For the functions with multiple table names, joins are used to match a particular doctor's records with the actual name.
 *  For example, a table might have: {Bob, 3}, {Bob, 7}, and then a mapping table shows that 3 and 7 are actually English and French. This is done to keep the data in the mapping tables as small as possible
 *  DOCUMENTATION LAST UPDATED 3/16/23
 */
export default new class FetchDoctorAccountData{
    async FetchDoctorInsurances (DoctorID){
        const functionName = this.FetchDoctorInsurances.bind(this).name;

        const table_name1 = 'insurance_mapping';
        const table_name2 = 'insurance_list'
        const DB_name = 'DoctorDB';
    
        const sql = `SELECT ${table_name2}.Insurance_name, ${table_name2}.insurance_listID FROM ${table_name2} JOIN ${table_name1} ON ${table_name2}.insurance_listID = ${table_name1}.Insurance_ID WHERE ${table_name1}.Doctor_ID = ?`;
        const values = [DoctorID];
        await useDB(functionName, DB_name, table_name1);
    
        try{
            const [results] = await connection.execute(sql, values);
            if (results.length === 0) {
                console.log('DoctorInsurances Data does not exist');
                return [];
            } else {
                return (results);
            }
        }catch(error){
            return (`error in ${functionName}:`, error);
        }
    };

    async FetchDoctorLanguages (DoctorID){
        const functionName = this.FetchDoctorLanguages.bind(this).name;

        const table_name1 = 'language_mapping';
        const table_name2 = 'language_list'
        const DB_name = 'DoctorDB';
    
        const sql = `SELECT ${table_name2}.Language_name, ${table_name2}.language_listID FROM ${table_name2} JOIN ${table_name1} ON ${table_name2}.language_listID = ${table_name1}.Language_ID WHERE ${table_name1}.Doctor_ID = ?`;
        const values = [DoctorID];
        await useDB(functionName, DB_name, table_name1);
    
        try{
            const [results] = await connection.execute(sql, values);
            if (results.length === 0) {
                console.log('DoctorLanguages Data does not exist');
                return [];
            } else {
                return (results);
            }
        }catch(error){
            return (`error in ${functionName}:`, error);
        }
    };

    async FetchDoctorServices (DoctorID){
        const functionName = this.FetchDoctorServices.bind(this).name;

        const table_name1 = 'service_mapping';
        const table_name2 = 'service_and_category_list';
        const DB_name = 'DoctorDB';
    
        const sql = `SELECT ${table_name2}.Category_name, ${table_name2}.Service_name, ${table_name1}.service_mapping_ID, ${table_name1}.Service_time, ${table_name1}.Service_price FROM ${table_name2} JOIN ${table_name1} ON ${table_name2}.service_and_category_listID = ${table_name1}.service_mapping_ID WHERE ${table_name1}.Doctor_ID = ?`;
        const values = [DoctorID];
        await useDB(functionName, DB_name, table_name1);
    
        try{
            const [results] = await connection.execute(sql, values);
            if (results.length === 0) {
                console.log('DoctorServices Data does not exist');
                return [];
            } else {
                return (results);
            }
        }catch(error){
            return (`error in ${functionName}:`, error);
        }
    };

    async FetchDoctorSpecialties (DoctorID){
        const functionName = this.FetchDoctorSpecialties.bind(this).name;

        const table_name1 = 'specialty_mapping';
        const table_name2 = 'specialties_list'
        const DB_name = 'DoctorDB';
    
        const sql = `SELECT ${table_name2}.Organization_name, ${table_name2}.Specialty_name, ${table_name2}.specialties_listID FROM ${table_name2} JOIN ${table_name1} ON ${table_name2}.specialties_listID = ${table_name1}.specialty_mappingID WHERE ${table_name1}.Doctor_ID = ?`;
        const values = [DoctorID];
        await useDB(functionName, DB_name, table_name1);
    
        try{
            const [results] = await connection.execute(sql, values);
            if (results.length === 0) {
                console.log('DoctorSpecialties Data does not exist');
                return [];
            } else {
                return (results);
            }
        }catch(error){
            return (`error in ${functionName}:`, error);
        }
    };
    
    async FetchPreVetEducation (DoctorID){
        const functionName = this.FetchPreVetEducation.bind(this).name;

        const table_name1 = 'pre_vet_education_mapping';
        const table_name2 = 'pre_vet_school_list'
        const table_name3 = 'major_list'
        const table_name4 = 'pre_vet_education_type_list'
    
        const DB_name = 'DoctorDB';
    
        const sql = `SELECT ${table_name2}.School_name, ${table_name3}.Major_name, ${table_name4}.Education_type, ${table_name1}.Start_Date, ${table_name1}.End_Date FROM ${table_name1}, ${table_name2}, ${table_name3}, ${table_name4} WHERE ${table_name1}.School_ID = ${table_name2}.pre_vet_school_listID AND ${table_name1}.Major_ID = ${table_name3}.major_listID AND ${table_name1}.Education_type_ID = ${table_name4}.pre_vet_education_typeID AND ${table_name1}.Doctor_ID = ?`;
        const values = [DoctorID];
        await useDB(functionName, DB_name, table_name1);

        try{
            const [results] = await connection.execute(sql, values);
            if (results.length === 0) {
                console.log('PreVetEducation Data does not exist');
                return [];
            } else {
                const newResults = results.map(obj => ({
                    ...obj,
                    Start_Date: new Date(obj.Start_Date).toISOString().slice(0,10),
                    End_Date: new Date(obj.End_Date).toISOString().slice(0,10)
                  }));//Converts the dates to a proper format.
                return (newResults);
            }
        }catch(error){
            return (`error in ${functionName}:`, error);
        }
    };

    async FetchVetEducation (DoctorID){
        const functionName = this.FetchVetEducation.bind(this).name;

        const table_name1 = 'vet_education_mapping';
        const table_name2 = 'vet_school_list'
        const table_name3 = 'vet_education_type_list'
    
        const DB_name = 'DoctorDB';
    
        const sql = `SELECT ${table_name2}.School_name, ${table_name3}.Education_type, ${table_name1}.Start_Date, ${table_name1}.End_Date FROM ${table_name1}, ${table_name2}, ${table_name3} WHERE ${table_name1}.School_ID = ${table_name2}.vet_school_listID AND ${table_name1}.Education_type_ID = ${table_name3}.vet_education_typeID AND ${table_name1}.Doctor_ID = ?`;
        const values = [DoctorID];
        await useDB(functionName, DB_name, table_name1);

        try{
            const [results] = await connection.execute(sql, values);
            if (results.length === 0) {
                console.log('VetEducation Data does not exist');
                return [];
            } else {
                const newResults = results.map(obj => ({
                    ...obj,
                    Start_Date: new Date(obj.Start_Date).toISOString().slice(0,10),
                    End_Date: new Date(obj.End_Date).toISOString().slice(0,10)
                  }));//Converts the dates to a proper format.
                return (newResults);
            }
        }catch(error){
            return (`error in ${functionName}:`, error);
        }
    };

    async FetchDoctorAddressData (DoctorID){
        const functionName = this.FetchDoctorAddressData.bind(this).name;

        const table_name1 = 'phone_numbers';
        const table_name2 = 'Doctor_addresses';
        const DB_name = 'DoctorDB';
        const sql = `SELECT ${table_name2}.addresses_ID, ${table_name2}.address_title, ${table_name2}.address_line_1, ${table_name2}.address_line_2, ${table_name2}.city, ${table_name2}.state, ${table_name2}.zip, ${table_name2}.country, ${table_name1}.phone FROM ${table_name2}, ${table_name1} WHERE ${table_name2}.addresses_ID = ${table_name1}.address_ID AND ${table_name2}.Doctor_ID = ?`;
    
        const values = [DoctorID];
        await useDB(functionName, DB_name, table_name1);
    
        try{
            const [results] = await connection.execute(sql, values);
            if (results.length === 0) {
                console.log('DoctorAddressData Data does not exist');
                return [];
            } else {
                // const decrypted = Crypto.decryptSingle(results[0]);
                // return (decrypted);
                return (results);
            }
        }catch(error){
            return (`error in ${functionName}:`, error);
        }
    };

    async FetchDescriptionData (DoctorID){
        const functionName = this.FetchDescriptionData.bind(this).name;

        const table_name = 'descriptions';
        const DB_name = 'DoctorDB';
    
        const sql = `SELECT Description FROM ${table_name} WHERE Doctor_ID = ?`;
        const values = [DoctorID];
        await useDB(functionName, DB_name, table_name);

        try{
            const [results] = await connection.execute(sql, values);
            if (results.length === 0) {
                console.log('DescriptionData does not exist');
                return {Description: ''};
            } else {
                const decrypted = Crypto.decryptSingle(results[0]);
                return (decrypted);
            }
        }catch(error){
            return (`error in ${functionName}:`, error);
        }
    };

    async FetchDoctorPictures (DoctorID){
        const functionName = this.FetchDoctorPictures.bind(this).name;

        const table_name = 'pictures';
        const DB_name = 'DoctorDB';
    
        const sql = `SELECT picture_link, picture_number FROM ${table_name} WHERE Doctor_ID = ?`;
        const values = [DoctorID];
        await useDB(functionName, DB_name, table_name);
    
        try{
            const [results] = await connection.execute(sql, values);// will need to return a list of picture links, and picture number (which one is first, second, etc.)
            
            if (results.length === 0) {
                console.log('DoctorPictures Data does not exist');
                return [];
            } else {
                //console.log(results);
                return (results);
            }
        }catch(error){
            return (`error in ${functionName}:`, error);
        }
    };
   
    async FetchPubliclyAvailable (DoctorID){
        const functionName = this.FetchDescriptionData.bind(this).name;

        const table_name = 'Doctor_credentials';
        const DB_name = 'DoctorDB';
    
        const sql = `SELECT publiclyAvailable, verified FROM ${table_name} WHERE DoctorID = ?`;
        const values = [DoctorID];
        await useDB(functionName, DB_name, table_name);

        try{
            const [results] = await connection.execute(sql, values);
            if (results.length === 0) {
                console.log('FetchPubliclyAvailable does not exist');
                return [{PubliclyAvailable: false}, {Verified: false}];
            } else {
                console.log('true')
                return [{PubliclyAvailable: results[0].publiclyAvailable}, {Verified: results[0].publiclyAvailable}];
            }
        }catch(error){
            console.log(`error in ${functionName}`, error)
            return (`error in ${functionName}:`, error);
        }
    };
}();
