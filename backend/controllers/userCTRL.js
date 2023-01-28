import {connection, useDB} from "../dbAndSecurity/connect.js";
import Crypto from "../dbAndSecurity/crypto.js";

/** fetchUsers returns all records from the Doctor_credentials table
 *  fetchUsers is not directly called. It is called within the searchByQuery function in searchCTRL.js, if no query is received
 *  Used to fill the home screen
 * @param {n/a} req - Not application - no request
 * @param {array} res - result
 * @returns Either an array of results, or a message with an error
 */
export async function fetchUsers (req, res){
    const table_name = 'Doctor_credentials'
    const sql = `SELECT * FROM ${table_name}`
    const DB_name = 'DoctorDB'
    
    await useDB(fetchUsers.name, DB_name, `${table_name}`)
    try{
        const [results] = await connection.execute(sql)
        // const decrypted = Crypto.decrypt_multiple(results)
        return res.status(200).json(results);
    }catch(error){
        res.status(500).send({ error: 'Error fetching data' });
    }
}

/** returnVetPageData searches for a particular Doctor's data
 *  Used to fill in vet screen (particular vet)
 *  Doctor_credentials & basic_Doctor_info are joined on the DocID, the data decrypted returned back to the client
 * @param {int} req: DocID is passed in
 * @param {*} res: The user's specific information from Doctor_credentials & basic_Doctor_info is joined and returned
 * @returns Decrypted vet data from the db.
 */
export async function returnVetPageData (req, res){
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
        }
    } catch(error){
        console.log('error encountered in catching')
        return res.status(500).send({ error: 'Get User Error' });
    }
}
