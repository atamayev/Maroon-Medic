import {connection, DB_Operation} from "../db-and-security-and-helper-functions/connect.js";
import FetchAllLists from "../db-and-security-and-helper-functions/fetch-all-lists.js";
import _ from "lodash"

/** searchByQuery returns all users that fit the client's search
 * @param {String} req Query is passed in
 * @param {Array} res 
 * @returns Returns an array of users, depending on the outcome of the query
 */
export async function searchByQuery (req, res) {
    const [Doctor_specific_info, basic_user_info] = ['Doctor_specific_info', 'basic_user_info'];

    const sql = `SELECT NVI, FirstName, LastName 
        FROM ${basic_user_info} LEFT JOIN ${Doctor_specific_info} ON ${basic_user_info}.User_ID = ${Doctor_specific_info}.Doctor_ID 
        WHERE verified = TRUE AND publiclyAvailable = TRUE AND FirstName LIKE ?`;

    const values = [`${req.params.query}%`];
    await DB_Operation(fetchUsers.name, basic_user_info);

    try {
        const [results] = await connection.execute(sql, values);
        if (_.isEmpty(results)) return res.json('User not found');
        else return res.json(results);
    } catch(error) {
        return res.json({ error: 'Search by Query Error' });
    }
};

/** fetchUsers returns all records from the Doctor_credentials table
 *  fetchUsers is not directly called. It is called within the searchByQuery function in searchCTRL.js, if no query is received
 *  Used to fill the home screen, only selects doctors that are verified, and publicly available
 * @param {*} req - N/A
 * @param {Array} res Array of Doctor Data Objects
 * @returns Either an array of results, or a message with an error
 *  DOCUMENTATION LAST UPDATED 6/4/23
 */
export async function fetchUsers (req, res) {
    const [Doctor_specific_info, basic_user_info] = ['Doctor_specific_info', 'basic_user_info'];

    const sql = `SELECT NVI, FirstName, LastName 
        FROM ${basic_user_info} JOIN ${Doctor_specific_info} ON ${basic_user_info}.User_ID = ${Doctor_specific_info}.Doctor_ID
        WHERE verified = TRUE AND publiclyAvailable = TRUE`;
    
    await DB_Operation(fetchUsers.name, basic_user_info);
    try {
        const [results] = await connection.execute(sql);
        return res.json(results);
    } catch(error) {
        return res.json({ error: 'Fetch Users Error' });
    }
};

// The following three functions are here for filtering purposes. In the future, pts will be able to filter for docs by language_spoken, insurances, etc.
export async function fetchAllLanguages (req, res) {
    try {
        const LanguageList = FetchAllLists.fetchAllLanguages();
        return res.status(200).json(LanguageList);
    } catch(error) {
        return res.status(500).json(error);
    }
};

export async function fetchAllServicesAndCategories (req, res) {
    try {
        const ServicesList = FetchAllLists.fetchAllServicesAndCategories();
        return res.status(200).json(ServicesList);
    } catch(error) {
        return res.status(500).json(error);
    }
};

export async function fetchAllInsurances (req, res) {
    try {
        const InsurancesList = FetchAllLists.fetchAllInsurances();
        return res.status(200).json(InsurancesList);
    } catch(error) {
        return res.status(500).json(error);
    }
};
