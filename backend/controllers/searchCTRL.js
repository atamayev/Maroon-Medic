import {connection, DB_Operation} from "../dbAndSecurity/connect.js";
import Crypto from "../dbAndSecurity/crypto.js";
import fetchAllDoctorLists from "./privateDoctorData/fetchAllDoctorLists.js";

/** searchByQuery returns all users that fit the client's search
 *  Upon first loading the site, there is no query. When there is no query, it is set to "ABCDEFGHIJKLMNOPQRSTUVWXYZ" 
 *  This is a dummy variable, since if(!req.params.query) didn't work
 *  If the query is the dummy variable, then all users are returned (fetchUsers)
 * @param {String} req Query is passed in
 * @param {Array} res 
 * @returns Returns an array of users, depending on the outcome of the query
 */
export async function searchByQuery (req, res){
    const table_name1 = 'basic_Doctor_info'
    const table_name2 = 'Doctor_credentials'
    await DB_Operation(searchByQuery.name, table_name1)
    const decrypted_query_object = {query: req.params.query}

    const encrypted_query_object = Crypto.encrypt_single_entry(decrypted_query_object)// this is done to encrypt the user's query, to then search the db (since all names in db are encrypted)

    const sql = `SELECT FirstName, LastName, Doctor_ID FROM ${table_name2} left JOIN ${table_name1} ON ${table_name2}.DoctorID = ${table_name1}.Doctor_ID WHERE verified = TRUE AND publiclyAvailable = TRUE AND FirstName = ?`;

    const values = [encrypted_query_object.query];
    try{
        const [results] = await connection.execute(sql, values)
        
        if (results.length === 0) {
            console.log('User not found')
            res.send('User not found');
        } else {
            const decrypted = Crypto.decrypt_multiple(results)
            return res.status(200).json(decrypted);
        }
    }catch(error){
        console.log('Search by Query Error', error)
        return res.status(500).send({ error: 'Search by Query Error' });
    }
};
/** fetchUsers returns all records from the Doctor_credentials table
 *  fetchUsers is not directly called. It is called within the searchByQuery function in searchCTRL.js, if no query is received
 *  Used to fill the home screen
 * @param {*} req - Not application - no request
 * @param {array} res - result
 * @returns Either an array of results, or a message with an error
 */
export async function fetchUsers (req, res){
    const table_name1 = 'basic_Doctor_info'
    const table_name2 = 'Doctor_credentials'
    const sql = `SELECT FirstName, LastName, Doctor_ID FROM ${table_name2} left JOIN ${table_name1} ON ${table_name2}.DoctorID = ${table_name1}.Doctor_ID WHERE verified = TRUE AND publiclyAvailable = TRUE`

    await DB_Operation(fetchUsers.name, table_name1)
    try{
        const [results] = await connection.execute(sql)
        const decrypted = Crypto.decrypt_multiple(results)
        return res.status(200).json(decrypted);
    }catch(error){
        console.log('Fetch Users Error', error)
        res.status(500).send({ error: 'Fetch Users Error' });
    }
};

// The following three functions are here for filtering purposes. In the future, pts will be able to filter for docs by language_spoken, insurances, etc.
export async function fetchAllLanguages (req, res){
    try{
        const LanguageList = fetchAllDoctorLists.fetchAllLanguages();
        return res.status(200).json(LanguageList);
    }catch(error){
        console.log(`error in ${fetchAllLanguages.name}`,error)
        return res.status(500).json(error);
    }
};

export async function fetchAllServicesAndCategories (req, res){
    try{
        const ServicesList = fetchAllDoctorLists.fetchAllServicesAndCategories();
        return res.status(200).json(ServicesList);
    }catch(error){
        console.log(`error in ${fetchAllServicesAndCategories.name}`,error)
        return res.status(500).json(error);
    }
};

export async function fetchAllInsurances (req, res){
    try{
        const InsurancesList = fetchAllDoctorLists.fetchAllInsurances();
        return res.status(200).json(InsurancesList);
    }catch(error){
        console.log(`error in ${fetchAllInsurances.name}`,error)
        return res.status(500).json(error);
    }
};
