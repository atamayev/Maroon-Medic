import {connection, DB_Operation} from "../../dbAndSecurity/connect.js"

export default new class FetchPublicDoctorData{
    async FetchDoctorInsurances (User_ID){
        const functionName = this.FetchDoctorInsurances.bind(this).name;

        const [insurance_mapping, insurance_list] = ['insurance_mapping', 'insurance_list'];
    
        const sql = `SELECT ${insurance_list}.Insurance_name 
            FROM ${insurance_list} JOIN ${insurance_mapping} ON ${insurance_list}.insurance_listID = ${insurance_mapping}.Insurance_ID 
            WHERE ${insurance_mapping}.User_ID = ?`;
        
        const values = [User_ID];
        await DB_Operation(functionName, insurance_mapping);
    
        try{
            const [results] = await connection.execute(sql, values);
            if (!results.length) return [];
            else return (results);
        }catch(error){
            return (`error in ${functionName}:`, error);
        }
    };

    async FetchDoctorLanguages (User_ID){
        const functionName = this.FetchDoctorLanguages.bind(this).name;
        const [language_mapping, language_list] = ['language_mapping', 'language_list'];

        const sql = `SELECT ${language_list}.Language_name 
            FROM ${language_list} JOIN ${language_mapping} ON ${language_list}.language_listID = ${language_mapping}.Language_ID 
            WHERE ${language_mapping}.User_ID = ?`;
        
        const values = [User_ID];
        await DB_Operation(functionName, language_mapping);
    
        try{
            const [results] = await connection.execute(sql, values);
            if (!results.length) return [];
            else return (results);
        }catch(error){
            return (`error in ${functionName}:`, error);
        }
    };

    async FetchDoctorSpecialties (User_ID){
        const functionName = this.FetchDoctorSpecialties.bind(this).name;
        const [service_mapping, service_and_category_list] = ['service_mapping', 'service_and_category_list'];
    
        const sql = `SELECT ${service_and_category_list}.Organization_name, ${service_and_category_list}.Specialty_name 
            FROM ${service_and_category_list} JOIN ${service_mapping} ON ${service_and_category_list}.specialties_listID = ${service_mapping}.specialty_ID 
            WHERE ${service_mapping}.User_ID = ?`;
        
        const values = [User_ID];
        await DB_Operation(functionName, service_mapping);
    
        try{
            const [results] = await connection.execute(sql, values);
            if (!results.length) return [];
            else return results;
        }catch(error){
            return (`error in ${functionName}:`, error);
        }
    };

    async FetchDoctorAddressData (DoctorID){
        const functionName = this.FetchDoctorAddressData.bind(this).name;
        const [phone, addresses, booking_availability] =  ['phone', 'addresses', 'booking_availability'];

        const sql = `SELECT ${addresses}.addressesID, ${addresses}.address_title, ${addresses}.address_line_1, ${addresses}.address_line_2, 
            ${addresses}.city, ${addresses}.state, ${addresses}.zip, ${addresses}.country, ${addresses}.address_priority, ${addresses}.instant_book,
            ${phone}.Phone, ${phone}.phone_priority 
            FROM ${addresses}, ${phone} 
            WHERE ${addresses}.addressesID = ${phone}.address_ID AND ${addresses}.Doctor_ID = ? AND ${addresses}.address_public_status = 1 AND ${addresses}.isActive = 1`;
    
        const values = [DoctorID];
        await DB_Operation(functionName, addresses);
        let results
    
        try{
            [results] = await connection.execute(sql, values);
        }catch(error){
            return (`error in ${functionName}:`, error);
        }

        if(results.length){
            for(let i =0;i<results.length; i++){
                const sql1 = `SELECT ${booking_availability}.Day_of_week, ${booking_availability}.Start_time, ${booking_availability}.End_time FROM ${booking_availability} WHERE ${booking_availability}.address_ID = ?`;
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

        const basic_user_info = 'basic_user_info';
        const sql = `SELECT FirstName, LastName, Gender FROM ${basic_user_info} WHERE User_ID = ?`
        const values = [User_ID];
        await DB_Operation(functionName, basic_user_info)
        
        try{
            const [results] = await connection.execute(sql, values)
            if (!results.length) return [];
            else {
                const DoctorPersonalInfo = results[0]
                return (DoctorPersonalInfo);
            }
        }catch(error){
            console.log('error encountered in catching')
            return [];
        }
    };
}();
