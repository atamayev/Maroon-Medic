import { connection, useDB } from "../../dbAndSecurity/connect.js";

/** FetchAllDoctorLists is fairly self-explanatory
 *  These lists are fetched from the DB for each doctor to fill in their respective information.
 *  DOCUMENTATION LAST UPDATED 3/16/23
 */
export default new class FetchAllDoctorLists{
    async fetchAllLanguages (){
        const functionName = this.fetchAllLanguages.bind(this).name;
        const table_name = 'language_list'
        const DB_name = 'DoctorDB'
        const sql = `SELECT Language_name, language_listID FROM ${table_name}`;
        await useDB(functionName, DB_name, table_name)
        
        try{
            const [results] = await connection.execute(sql)
            return (results);
        }catch(error){
            console.log(`error in ${functionName}`,error)
            return (`error in ${functionName}:`, error);
        }
    };

    async fetchAllSpecialties (){
        const functionName = this.fetchAllSpecialties.bind(this).name;
        const table_name = 'specialties_list'
        const DB_name = 'DoctorDB'
        const sql = `SELECT Organization_name, Specialty_name, specialties_listID FROM ${table_name}`;
        await useDB(functionName, DB_name, table_name)
        
        try{
            const [results] = await connection.execute(sql)
            return (results);
        }catch(error){
            console.log(`error in ${functionName}`,error)
            return (`error in ${functionName}:`, error);
        }
    };

    async fetchAllServicesAndCategories(){
        const functionName = this.fetchAllServicesAndCategories.bind(this).name;
        const table_name = 'service_and_category_list'
        const DB_name = 'DoctorDB'
        const sql = `SELECT Service_name, Category_name, service_and_category_listID FROM ${table_name}`;
        await useDB(functionName, DB_name, table_name)
        
        try{
            const [results] = await connection.execute(sql)
            return (results);
        }catch(error){
            console.log(`error in ${functionName}`,error)
            return (`error in ${functionName}:`, error);
        }
    };

    async fetchAllSchools(){
        const functionName = this.fetchAllSchools.bind(this).name;
        const table_name = 'school_list'
        const DB_name = 'DoctorDB'
        const sql = `SELECT School_name, school_listID FROM ${table_name}`;
        await useDB(functionName, DB_name, table_name)
        
        try{
            const [results] = await connection.execute(sql)
            return (results);
        }catch(error){
            console.log(`error in ${functionName}`,error)
            return (`error in ${functionName}:`, error);
        }
    };

    async fetchAllMajors(){
        const functionName = this.fetchAllMajors.bind(this).name;
        const table_name = 'major_list'
        const DB_name = 'DoctorDB'
        const sql = `SELECT Major_name, major_listID FROM ${table_name}`;
        await useDB(functionName, DB_name, table_name)
        
        try{
            const [results] = await connection.execute(sql)
            return (results);
        }catch(error){
            console.log(`error in ${functionName}`,error)
            return (`error in ${functionName}:`, error);
        }
    };

    async fetchAllInsurances (){
        const functionName = this.fetchAllInsurances.bind(this).name;
        const table_name = 'insurance_list'
        const DB_name = 'DoctorDB'
        const sql = `SELECT Insurance_name, insurance_listID FROM ${table_name}`;
        await useDB(functionName, DB_name, table_name)
        
        try{
            const [results] = await connection.execute(sql)
            return (results);
        }catch(error){
            console.log(`error in ${functionName}`,error)
            return (`error in ${functionName}:`, error);
        }
    };

    async fetchAllEducationTypes (){
        const functionName = this.fetchAllEducationTypes.bind(this).name;
        const table_name = 'education_type_list'
        const DB_name = 'DoctorDB'
        const sql = `SELECT Education_type, education_typeID FROM ${table_name}`;
        await useDB(functionName, DB_name, table_name)

        try{
            const [results] = await connection.execute(sql)
            return (results);
        }catch(error){
            console.log(`error in ${functionName}`,error)
            return (`error in ${functionName}:`, error);
        }
    };
}();
