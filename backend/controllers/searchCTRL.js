import {connection, useDB} from "../dbAndSecurity/connect.js";
import Crypto from "../dbAndSecurity/crypto.js";
import { fetchUsers } from "./userCTRL.js";

export async function searchByQuery (req, res){
    // Declares which table to check:
    const table_name = 'Doctor_credentials';
    const DB_name = 'DoctorDB'

    await useDB(searchByQuery.name, DB_name, `${table_name}`)

    // console.log('USING SEARCH BY QUERY')
    if (req.params.query == "ABCDEFGHIJKLMNOPQRSTUVWXYZ"){
        return await fetchUsers (req, res);
    } else {
        const sql = `SELECT * FROM ${table_name} WHERE email LIKE ?`;
        const values = ['%' + req.params.query + '%'];
        try{
            const [results] = await connection.execute(sql, values)
            if (results.length === 0) {
                console.log('User not found')
                res.send('User not found');
            } else {
            // const decrypted = Crypto.decrypt_multiple(results)

            return res.status(200).json(results);
            }
        }catch(error){
            return res.status(500).send({ error: 'Search Error' });
        }
    }
}
