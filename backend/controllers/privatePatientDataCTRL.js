import {connection, useDB} from "../dbAndSecurity/connect.js";
import Crypto from "../dbAndSecurity/crypto.js";

// all of the functions to add pt data, and pull it for necessary components on pt dashboard

// export async function dashboardData (req, res){
//     const DoctorUUID = req.cookies.DoctorUUID
//     const DoctorID = await UUID_to_ID(DoctorUUID, 'Doctor') // converts DoctorUUID to docid
    
//     const table_name1 = 'Doctor_credentials';
//     const table_name2 = 'basic_Doctor_info';
//     const DB_name = 'DoctorDB';
  
//     const sql = `SELECT * FROM ${table_name1} LEFT JOIN ${table_name2} ON ${table_name1}.DoctorID = ${table_name2}.Doctor_ID WHERE ${table_name1}.DoctorID = ?`
//     const values = [DoctorID];
//     await useDB(dashboardData.name, DB_name, table_name1)
//     await useDB(dashboardData.name, DB_name, table_name2)

//     try{
//         const [results] = await connection.execute(sql, values)
//         // deleting these values bc they can't be decrypted (not strings)
//         delete results[0].DoctorID;
//         delete results[0].Doctor_ID;
//         delete results[0].basic_Doctor_info_ID;
//         delete results[0].password;
//         // console.log('results', results)
//         if (results.length === 0) {
//             console.log('User does not exist')
//             res.send('User does not exist');
//         } else {
//             const decrypted = Crypto.decryptSingle(results[0])
//             return res.status(200).json(decrypted);
//         }
//     }catch(error){
//         return (`error in ${dashboardData.name}:`, error)
//     }
// }