import {connection, useDB} from "../dbAndSecurity/connect.js";
import Crypto from "../dbAndSecurity/crypto.js";

/** returnVetPageData searches for a particular Doctor's data
 *  Used to fill in vet screen (particular vet)
 *  Doctor_credentials & basic_Doctor_info are joined on the DocID, the data decrypted returned back to the client
 * @param {int} req: DocID is passed in
 * @param {*} res: The user's specific information from Doctor_credentials & basic_Doctor_info is joined and returned
 * @returns Decrypted vet data from the db
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
        // console.log('results', results)
        if (results.length === 0) {
            console.log('User does not exist')
            res.send('User does not exist');
        } else {
            const decrypted = Crypto.decryptSingle(results[0])
            // console.log('decrypted', decrypted)
            return res.status(200).json(decrypted);
        }
    } catch(error){
        console.log('error encountered in catching')
        return res.status(500).send({ error: 'Get User Error' });
    }
};

export async function DoctorUUIDtoDoctorID (req, res){
    const DoctorUUID = req.cookies.DoctorUUID
    // console.log('DoctorUUID',DoctorUUID)

    const table_name = 'DoctorUUID_reference';
    const DB_name = 'DoctorDB'
    const sql = `SELECT Doctor_ID FROM ${table_name} WHERE DoctorUUID = ?`
    const values = [DoctorUUID];
        
    await useDB(DoctorUUIDtoDoctorID.name, DB_name, `${table_name}`)
    
    try{
        const [results] = await connection.execute(sql, values)
        return res.status(200).json(results)
    }catch(error){
        console.log('error encountered in catching UUIDtoDoctorID')
        return res.send('User does not exist')
        // return res.status(500).send({ error: 'proprietaryHomePageData Error' });
    }
};
