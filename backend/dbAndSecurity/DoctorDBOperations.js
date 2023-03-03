import {connection, useDB} from "./connect.js"
import Crypto from "./crypto.js";

export default new class DoctorDBOperations{
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
                console.log('User does not exist');
                return {};
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
    
        const sql = `SELECT ${table_name2}.Language_name FROM ${table_name2} JOIN ${table_name1} ON ${table_name2}.language_listID = ${table_name1}.Language_ID WHERE ${table_name1}.Doctor_ID = ?`;
        const values = [DoctorID];
        await useDB(functionName, DB_name, table_name1);
    
        try{
            const [results] = await connection.execute(sql, values);
            if (results.length === 0) {
                console.log('User does not exist');
                return {};
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
                console.log('User does not exist');
                return {};
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
        const table_name2 = 'service_list';
        const DB_name = 'DoctorDB';
    
        const sql = `SELECT ${table_name2}.Service_name FROM ${table_name2} JOIN ${table_name1} ON ${table_name2}.service_listID = ${table_name1}.Service_ID WHERE ${table_name1}.Doctor_ID = ?`;
        const values = [DoctorID];
        await useDB(functionName, DB_name, table_name1);
    
        try{
            const [results] = await connection.execute(sql, values);
            if (results.length === 0) {
                console.log('User does not exist');
                return {};
            } else {
                const decrypted = Crypto.decryptSingle(results[0]);
                return (decrypted);
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
                console.log('User does not exist');
                return {};
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

        const table_name1 = 'certification_mapping';
        const table_name2 = 'certification_list'
        const DB_name = 'DoctorDB';
    
        const sql = `SELECT ${table_name2}.Certification_name FROM ${table_name2} JOIN ${table_name1} ON ${table_name2}.certification_listID = ${table_name1}.Certification_ID WHERE ${table_name1}.Doctor_ID = ?`;
        const values = [DoctorID];
        await useDB(functionName, DB_name, table_name1);
    
        try{
            const [results] = await connection.execute(sql, values);
            if (results.length === 0) {
                console.log('User does not exist');
                return {};
            } else {
                const decrypted = Crypto.decryptSingle(results[0]);
                return (decrypted);
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
                console.log('User does not exist');
                return {};
            } else {
                const decrypted = Crypto.decryptSingle(results[0]);
                return (decrypted);
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
                console.log('User does not exist');
                return {};
            } else {
                const decrypted = Crypto.decryptSingle(results[0]);
                return (decrypted);
            }
        }catch(error){
            return (`error in ${functionName}:`, error);
        }
    };
}();
