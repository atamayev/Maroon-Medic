import {connection, useDB} from "./connect.js"
import Crypto from "./crypto.js";

export default new class FetchDoctorData{
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
                console.log(results);
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
    
        const sql = `SELECT ${table_name2}.Category_name, ${table_name2}.Service_name FROM ${table_name2} JOIN ${table_name1} ON ${table_name2}.service_and_category_listID = ${table_name1}.service_mapping_ID WHERE ${table_name1}.Doctor_ID = ?`;
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
    
    async FetchDoctorAddressData (DoctorID){
        const functionName = this.FetchDoctorAddressData.bind(this).name;

        const table_name1 = 'phone_numbers';
        const table_name2 = 'Doctor_addresses';
        const DB_name = 'DoctorDB';
        const sql = `SELECT ${table_name2}.address_line_1, ${table_name2}.address_line_2, ${table_name2}.city, ${table_name2}.state, ${table_name2}.zip, ${table_name2}.country, ${table_name1}.Phone FROM ${table_name2}, ${table_name1} WHERE ${table_name2}.addresses_ID = ${table_name1}.Address_ID AND ${table_name2}.Doctor_ID = ?`;
    
        const values = [DoctorID];
        await useDB(functionName, DB_name, table_name1);
    
        try{
            const [results] = await connection.execute(sql, values);
            if (results.length === 0) {
                console.log('DoctorAddressData Data does not exist');
                return [];
            } else {
                const decrypted = Crypto.decryptSingle(results[0]);
                return (decrypted);
            }
        }catch(error){
            return (`error in ${functionName}:`, error);
        }
    };
    
    async FetchDoctorCertifications (DoctorID){
        const functionName = this.FetchDoctorCertifications.bind(this).name;

        const table_name1 = 'specialty_mapping';
        const table_name2 = 'specialties_list'
        const DB_name = 'DoctorDB';
    
        const sql = `SELECT ${table_name2}.Organization_name, ${table_name2}.Specialty_name FROM ${table_name2} JOIN ${table_name1} ON ${table_name2}.specialties_listID = ${table_name1}.specialty_mappingID WHERE ${table_name1}.Doctor_ID = ?`;
        const values = [DoctorID];
        await useDB(functionName, DB_name, table_name1);
    
        try{
            const [results] = await connection.execute(sql, values);
            if (results.length === 0) {
                console.log('DoctorCertifications Data does not exist');
                return [];
            } else {
                return (results);
            }
        }catch(error){
            return (`error in ${functionName}:`, error);
        }
    };
    
    async FetchDoctorInsurances (DoctorID){
        const functionName = this.FetchDoctorInsurances.bind(this).name;

        const table_name1 = 'insurance_mapping';
        const table_name2 = 'insurance_list'
        const DB_name = 'DoctorDB';
    
        const sql = `SELECT ${table_name2}.Insurance_name FROM ${table_name2} JOIN ${table_name1} ON ${table_name2}.insurance_listID = ${table_name1}.Insurance_ID WHERE ${table_name1}.Doctor_ID = ?`;
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
    
    async FetchDoctorEducation (DoctorID){
        const functionName = this.FetchDoctorEducation.bind(this).name;

        const table_name1 = 'education_mapping';
        const table_name2 = 'school_list'
        const table_name3 = 'major_list'
        const table_name4 = 'education_type_list'
    
        const DB_name = 'DoctorDB';
    
        const sql = `SELECT ${table_name2}.School_name, ${table_name3}.Major_name, ${table_name4}.Education_type, ${table_name1}.Start_Date, ${table_name1}.End_Date FROM ${table_name1}, ${table_name2}, ${table_name3}, ${table_name4} WHERE ${table_name1}.School_ID = ${table_name2}.school_listID AND ${table_name1}.Major_ID = ${table_name3}.major_listID AND ${table_name1}.Education_type_ID = ${table_name4}.education_typeID AND ${table_name1}.Doctor_ID = ?`;
        const values = [DoctorID];
        await useDB(functionName, DB_name, table_name1);
    
        try{
            const [results] = await connection.execute(sql, values);
            if (results.length === 0) {
                console.log('DoctorEducation Data does not exist');
                return [];
            } else {
                return (results);
            }
        }catch(error){
            return (`error in ${functionName}:`, error);
        }
    };
}();
