import {connection, useDB} from "../dbAndSecurity/connect.js";
import Crypto from "../dbAndSecurity/crypto.js";

// DECRYPTION IMPLEMENTED: fetches all the existing entries in the mysql (for the home screen) 
export async function fetchUsers (req, res){
    const table_name = 'Doctor_credentials'
    const sql = `SELECT * FROM ${table_name}`
    const DB_name = 'DoctorDB'
    
    await useDB(fetchUsers.name, DB_name, `${table_name}`)
    try{
        const [results] = await connection.execute(sql)
        // console.log('results',results)
        // const decrypted = Crypto.decrypt_multiple(results)
        return res.status(200).json(results);
    }catch(error){
        res.status(500).send({ error: 'Error fetching data' });
    }
}

// DECRYPTION IMPLEMENTED Searches for specific User ID
export async function getUser (req, res){
    // Declares which table to check:
    const table_name = 'Doctor_credentials';
    const DB_name = 'DoctorDB'

    // SQL Query that searches for a specific id given values
    const sql = `SELECT * FROM ${table_name} WHERE DoctorID = ?`;
    const values = [req.params.id];
    // Makes sure using correct DB: 
    await useDB(getUser.name, DB_name, `${table_name}`)
    try{
        const [results] = await connection.execute(sql, values)
        if (results.length === 0) {
            console.log('User does not exist')
            res.send('User does not exist');
        } else {
            // const decrypted = Crypto.decryptSingle(results[0])
            return res.status(200).json(results[0]);
            // return res.status(200).json(decrypted);
        }
    } catch(error){
        console.log('error encountered in catching')
        return res.status(500).send({ error: 'Get User Error' });
    }
}

export async function returnVetPageData (req, res){
    //take in an id, return decrypted necessary fields. will require joining, decrypting
    const table_name1 = 'Doctor_credentials';
    const table_name2 = 'basic_Doctor_info';
    const DB_name = 'DoctorDB'
    const sql = `SELECT * FROM ${table_name1} LEFT JOIN ${table_name2} ON ${table_name1}.DoctorID = ${table_name2}.Doctor_ID WHERE ${table_name1}.DoctorID = ?`
    const values = [req.params.id];
        
    await useDB(returnVetPageData.name, DB_name, `${table_name1}`)
    await useDB(returnVetPageData.name, DB_name, `${table_name2}`)
    
    try{
        const [results] = await connection.execute(sql, values)
        // deleting these values bc they can't be decrypted (not strings)
        delete results[0].DoctorID;
        delete results[0].Doctor_ID;
        delete results[0].basic_Doctor_info_ID;
        delete results[0].password;
        console.log('results', results)
        if (results.length === 0) {
            console.log('User does not exist')
            res.send('User does not exist');
        } else {
            const decrypted = Crypto.decryptSingle(results[0])
            console.log(decrypted)
            return res.status(200).json(decrypted);
            // return res.status(200).json(decrypted);
        }
    } catch(error){
        console.log('error encountered in catching')
        return res.status(500).send({ error: 'Get User Error' });
    }

}