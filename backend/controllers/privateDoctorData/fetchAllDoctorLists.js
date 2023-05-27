import { connection, DB_Operation } from "../../dbAndSecurity/connect.js";

/** FetchAllDoctorLists is fairly self-explanatory
 *  These lists are fetched from the DB for each doctor to fill in their respective information.
 *  DOCUMENTATION LAST UPDATED 3/16/23
 */
export default new class FetchAllDoctorLists{
    async fetchAllInsurances (){
        const functionName = this.fetchAllInsurances.bind(this).name;
        const table_name = 'insurance_list'
        const sql = `SELECT * FROM ${table_name}`;
        await DB_Operation(functionName, table_name)
        
        try{
            const [results] = await connection.execute(sql)
            return (results);
        }catch(error){
            console.log(`error in ${functionName}`,error)
            return (`error in ${functionName}:`, error);
        }
    };

    async fetchAllLanguages (){
        const functionName = this.fetchAllLanguages.bind(this).name;
        const table_name = 'language_list'
        const sql = `SELECT * FROM ${table_name}`;
        await DB_Operation(functionName, table_name)
        
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
        const sql = `SELECT * FROM ${table_name}`;
        await DB_Operation(functionName, table_name)
        
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
        const sql = `SELECT * FROM ${table_name}`;
        await DB_Operation(functionName, table_name)
        
        try{
            const [results] = await connection.execute(sql)
            return (results);
        }catch(error){
            console.log(`error in ${functionName}`,error)
            return (`error in ${functionName}:`, error);
        }
    };

    async fetchAllPreVetSchools(){
        const functionName = this.fetchAllPreVetSchools.bind(this).name;
        const table_name = 'pre_vet_school_list'
        const sql = `SELECT * FROM ${table_name}`;
        await DB_Operation(functionName, table_name)
        
        try{
            const [results] = await connection.execute(sql)
            return (results);
        }catch(error){
            console.log(`error in ${functionName}`,error)
            return (`error in ${functionName}:`, error);
        }
    };
    
    async fetchAllPreVetEducationTypes (){
        const functionName = this.fetchAllPreVetEducationTypes.bind(this).name;
        const table_name = 'pre_vet_education_type_list'
        const sql = `SELECT * FROM ${table_name}`;
        await DB_Operation(functionName, table_name)

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
        const sql = `SELECT * FROM ${table_name}`;
        await DB_Operation(functionName, table_name)
        
        try{
            const [results] = await connection.execute(sql)
            return (results);
        }catch(error){
            console.log(`error in ${functionName}`,error)
            return (`error in ${functionName}:`, error);
        }
    };

    async fetchAllVetSchools(){
        const functionName = this.fetchAllVetSchools.bind(this).name;
        const table_name = 'vet_school_list'
        const sql = `SELECT * FROM ${table_name}`;
        await DB_Operation(functionName, table_name)
        
        try{
            const [results] = await connection.execute(sql)
            return (results);
        }catch(error){
            console.log(`error in ${functionName}`,error)
            return (`error in ${functionName}:`, error);
        }
    };

    async fetchAllVetEducationTypes (){
        const functionName = this.fetchAllVetEducationTypes.bind(this).name;
        const table_name = 'vet_education_type_list'
        const sql = `SELECT * FROM ${table_name}`;
        await DB_Operation(functionName, table_name)

        try{
            const [results] = await connection.execute(sql)
            return (results);
        }catch(error){
            console.log(`error in ${functionName}`,error)
            return (`error in ${functionName}:`, error);
        }
    };
}();
