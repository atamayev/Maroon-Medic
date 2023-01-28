import {connection, useDB} from "../dbAndSecurity/connect.js";
import Crypto from "../dbAndSecurity/crypto.js";
import { fetchUsers } from "./userCTRL.js";

/** searchByQuery returns all users that fit the client's search
 *  Upon first loading the site, there is no query. When there is no query, it is set to "ABCDEFGHIJKLMNOPQRSTUVWXYZ" 
 *  This is a dummy variable, since if(!req.params.query) didn't work
 *  If the query is the dummy variable, then all users are returned (fetchUsers)
 *  If there is a query, query the DB using a LIKE clause on the email
 * @param {String} req Query is passed in
 * @param {Array} res 
 * @returns Returns an array of users, depending on the outcome of the query
 */
export async function searchByQuery (req, res){
    const table_name = 'Doctor_credentials';
    const DB_name = 'DoctorDB'

    await useDB(searchByQuery.name, DB_name, `${table_name}`)

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
