import {connection, useDB} from "../dbAndSecurity/connect.js";
import Crypto from "../dbAndSecurity/crypto.js";

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
    console.log(' in searchByQuery')
    const table_name = 'Doctor_credentials';
    const DB_name = 'DoctorDB'
    await useDB(searchByQuery.name, DB_name, table_name)
    // console.log(req.params.query)

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
/** fetchUsers returns all records from the Doctor_credentials table
 *  fetchUsers is not directly called. It is called within the searchByQuery function in searchCTRL.js, if no query is received
 *  Used to fill the home screen
 * @param {*} req - Not application - no request
 * @param {array} res - result
 * @returns Either an array of results, or a message with an error
 */
export async function fetchUsers (req, res){
    const table_name = 'Doctor_credentials'
    const sql = `SELECT * FROM ${table_name}`
    const DB_name = 'DoctorDB'

    await useDB(fetchUsers.name, DB_name, table_name)
    try{
        const [results] = await connection.execute(sql)
        // const decrypted = Crypto.decrypt_multiple(results)
        return res.status(200).json(results);
    }catch(error){
        res.status(500).send({ error: 'Error fetching data' });
    }
}
