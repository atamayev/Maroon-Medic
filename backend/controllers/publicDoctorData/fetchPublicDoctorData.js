import {connection, DB_Operation} from "../../dbAndSecurity/connect.js"
import Crypto from "../../dbAndSecurity/crypto.js";

export default new class FetchPublicDoctorData{
    async FetchDoctorInsurances (User_ID){
        const functionName = this.FetchDoctorInsurances.bind(this).name;

        const table_name1 = 'insurance_mapping';
        const table_name2 = 'insurance_list'
    
        const sql = `SELECT ${table_name2}.Insurance_name FROM ${table_name2} JOIN ${table_name1} ON ${table_name2}.insurance_listID = ${table_name1}.Insurance_ID WHERE ${table_name1}.User_ID = ?`;
        const values = [User_ID];
        await DB_Operation(functionName, table_name1);
    
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

    async FetchDoctorLanguages (User_ID){
        const functionName = this.FetchDoctorLanguages.bind(this).name;

        const table_name1 = 'language_mapping';
        const table_name2 = 'language_list'
    
        const sql = `SELECT ${table_name2}.Language_name FROM ${table_name2} JOIN ${table_name1} ON ${table_name2}.language_listID = ${table_name1}.Language_ID WHERE ${table_name1}.User_ID = ?`;
        const values = [User_ID];
        await DB_Operation(functionName, table_name1);
    
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

    async FetchDoctorSpecialties (User_ID){
        const functionName = this.FetchDoctorSpecialties.bind(this).name;

        const table_name1 = 'specialty_mapping';
        const table_name2 = 'specialties_list'
    
        const sql = `SELECT ${table_name2}.Organization_name, ${table_name2}.Specialty_name FROM ${table_name2} JOIN ${table_name1} ON ${table_name2}.specialties_listID = ${table_name1}.specialty_ID WHERE ${table_name1}.User_ID = ?`;
        const values = [User_ID];
        await DB_Operation(functionName, table_name1);
    
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

    async FetchDoctorAddressData (DoctorID){
        const functionName = this.FetchDoctorAddressData.bind(this).name;

        const table_name1 = 'phone';
        const table_name2 = 'addresses';
        const sql = `SELECT ${table_name2}.addressesID, ${table_name2}.address_title, ${table_name2}.address_line_1, ${table_name2}.address_line_2, ${table_name2}.city, ${table_name2}.state, ${table_name2}.zip, ${table_name2}.country, ${table_name2}.address_priority, ${table_name1}.Phone, ${table_name1}.phone_priority FROM ${table_name2}, ${table_name1} WHERE ${table_name2}.addressesID = ${table_name1}.address_ID AND ${table_name2}.Doctor_ID = ? AND ${table_name2}.address_public_status = 1`;
    
        const values = [DoctorID];
        await DB_Operation(functionName, table_name1);
        let results
    
        try{
            [results] = await connection.execute(sql, values);
        }catch(error){
            return (`error in ${functionName}:`, error);
        }

        const table_name3 = 'booking_availability';
        if(results.length){
            for(let i =0;i<results.length; i++){
                const sql1 = `SELECT ${table_name3}.Day_of_week, ${table_name3}.Start_time, ${table_name3}.End_time FROM ${table_name3} WHERE ${table_name3}.address_ID = ?`;
                const values1 = [results[i].addressesID]
                try{
                    const [results1] = await connection.execute(sql1, values1);
                    results[i].times = results1;
                }catch(error){
                    return (`error in second try=catch ${functionName}:`, error);
                }
            }
        }else{
            //if there are no results.length
            console.log('DoctorAddressData Data does not exist');
            return []
        }
        return (results);
    };

    async FetchDoctorPersonalInfo (User_ID){
        const functionName = this.FetchDoctorPersonalInfo.bind(this).name;

        const table_name = 'basic_user_info';
        const sql = `SELECT FirstName, LastName, Gender FROM ${table_name} WHERE User_ID = ?`
        const values = [User_ID];
        await DB_Operation(functionName, table_name)
        
        try{
            const [results] = await connection.execute(sql, values)
              if (results.length === 0) {
                console.log('User does not exist')
                return []
            } else {
                const decrypted = Crypto.decryptSingle(results[0])
                return (decrypted);
            }
        }catch(error){
            console.log('error encountered in catching')
            return [];
        }
    };
}();
