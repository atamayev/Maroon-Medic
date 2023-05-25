import {connection, useDB} from "../../dbAndSecurity/connect.js"
import Crypto from "../../dbAndSecurity/crypto.js";

export default new class FetchPublicDoctorData{
    async FetchDoctorPersonalInfo (DoctorID){
        const functionName = this.FetchDoctorPersonalInfo.bind(this).name;

        const table_name = 'basic_Doctor_info';
        const DB_name = 'DoctorDB'
        const sql = `SELECT FirstName, LastName, Gender FROM ${table_name} WHERE Doctor_ID = ?`
        const values = [DoctorID];
        await useDB(functionName, DB_name, table_name)
        
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
