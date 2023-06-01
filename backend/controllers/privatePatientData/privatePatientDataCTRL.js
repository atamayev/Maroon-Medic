import {connection, DB_Operation} from "../../dbAndSecurity/connect.js";
import { UUID_to_ID } from "../../dbAndSecurity/UUID.js";
import moment from "moment";
// all of the functions to add pt data, and pull it for necessary components on pt dashboard

/** newPatient registers the inputted user data into basic_Patient_info table
 *  All necessary information is sent via the request (PatientUUID, firname, lastname, etc.)
 * @param {Array} req 
 * @param {Array} res If the user data is successfully added to table, return true. If not, return error--> front end doesn't allow
 * @returns true/error
 * DOCUMENTATION LAST UPDATED 3/16/23
 */
export async function newPatient (req, res){
    const PatientUUID = req.cookies.PatientUUID
    const User_ID = await UUID_to_ID(PatientUUID) // converts PatientUUID to docid
    
    const new_patient_object = req.body.new_patient_object

    const dateOfBirth = moment(`${new_patient_object.DOB_month} ${new_patient_object.DOB_day} ${new_patient_object.DOB_year}`, 'MMMM D YYYY').format('YYYY-MM-DD');

    const basic_user_info = 'basic_user_info'
    const sql = `INSERT INTO ${basic_user_info} (FirstName, LastName, Gender, DOB, User_ID) VALUES (?,?,?,?,?)`;

    const values = [new_patient_object.FirstName, new_patient_object.LastName, new_patient_object.Gender, dateOfBirth, User_ID];    
    await DB_Operation(newPatient.name, basic_user_info)
    
    try{
        await connection.execute(sql, values)
        return res.status(200).json();
    }catch(error){
        console.log(`error in ${newPatient.name}`,error)
        return res.status(500).json(error);
    }
};

/** newPatientConfirmation makes sure that the user on the site is a new Patient
 *  If newPatientUUID or the regular PatientUUID don't exist, returns false.
 *  If both the PatientUUID and newPatientUUID exist in DB, then returns true, else returns false.
 * @param {Array} req 
 * @param {Array} res If the user data is successfully found in the table to table, return true. If not, return false --> front-end re-directs to register page
 * @returns true/false
 * DOCUMENTATION LAST UPDATED 3/16/23
 */
export async function newPatientConfirmation (req, res){
    let Patient_permission = false;
    const newPatientUUID = req.cookies.PatientNew_User
    const existingPatientUUID = req.cookies.PatientUUID

    if (!newPatientUUID || !existingPatientUUID) return res.json(Patient_permission);

    const UUID_reference = 'UUID_reference';
    const sql = `SELECT UUID_referenceID FROM ${UUID_reference} WHERE UUID = ?`;
    let values1 = [newPatientUUID];
    let values2 = [existingPatientUUID];
    await DB_Operation(newPatientConfirmation.name, UUID_reference)

    try{
        const [results1] = await connection.execute(sql, values1)
        const [results2] = await connection.execute(sql, values2)

        if (results1.length === 1 && results2.length === 1){
            Patient_permission = true;
            return res.json(Patient_permission);
        }
        else return res.json(Patient_permission);
    }catch(error){
        console.log(`error in ${newPatientConfirmation.name}:`, error)
        return res.json(Patient_permission);
    }
};

/** fetchDashboardData retrieves the Patient's dashboard data. Currently dummy.
 *  Takes the Patient's UUID, and converts to the PatientID. Then, joins necessary tables to retrieve dashboard data
 * @param {Cookies} req Contains the user's cookies (PatientUUID)
 * @param {Array} res User data, or error
 * @returns User data.
 * DOCUMENTATION LAST UPDATED 3/16/23
 */
export async function fetchDashboardData (req, res){
    const PatientUUID = req.cookies.PatientUUID;
    const PatientID = await UUID_to_ID(PatientUUID); // converts PatientUUID to docid
    const [Appointments, service_and_category_list, addresses, basic_user_info] = 
        ['Appointments', 'service_and_category_list', 'addresses', 'basic_user_info'];

    const sql = `SELECT 
            ${Appointments}.AppointmentsID, ${Appointments}.appointment_date, ${Appointments}.patient_message, ${Appointments}.Doctor_confirmation_status, ${Appointments}.Created_at,
            ${service_and_category_list}.Category_name, ${service_and_category_list}.Service_name, 
            ${addresses}.address_title, ${addresses}.address_line_1, ${addresses}.address_line_2, ${addresses}.city, ${addresses}.state, ${addresses}.zip, ${addresses}.country,
            ${basic_user_info}.FirstName AS Doctor_FirstName, ${basic_user_info}.LastName AS Doctor_LastName
        FROM ${Appointments}
            INNER JOIN ${service_and_category_list} ON ${Appointments}.${service_and_category_list}_ID = ${service_and_category_list}.${service_and_category_list}ID
            INNER JOIN ${addresses} ON ${Appointments}.${addresses}_ID = ${addresses}.${addresses}ID AND ${addresses}.Doctor_ID = ${Appointments}.Doctor_ID
            INNER JOIN ${basic_user_info} ON ${Appointments}.Doctor_ID = ${basic_user_info}.User_ID
        WHERE
            ${Appointments}.Patient_ID = ?`;

    const values = [PatientID];
    await DB_Operation(fetchDashboardData.name, Appointments);

    try{
        const [results] = await connection.execute(sql, values)
        if (results.length === 0) return res.json([]);
        else{
            const DashboardData = results
            for (let i = 0; i < DashboardData.length; i++){
                DashboardData[i].appointment_date = moment(DashboardData[i].appointment_date).format('MMMM Do, YYYY, h:mm A');
                DashboardData[i].Created_at = moment(DashboardData[i].Created_at).format('MMMM Do, YYYY, h:mm A');                
            }
            return res.json(DashboardData);
        } 
    }catch(error){
        console.log(`error in ${fetchDashboardData.name}:`, error );
        return res.json([]);
    }
};


/** fetchPersonalData retrieves the Patient's personal data.
 *  Currently almost identical to dashboard
 *  Takes the Patient's UUID, and converts to the PatientID. Then, joins necessary tables to retrieve dashboard data
 * @param {Cookies} req Contains the user's cookies (PatientUUID)
 * @param {Array} res Decrypted, or error
 * @returns Decrypted user data.
 * DOCUMENTATION LAST UPDATED 3/16/23
 */
export async function fetchPersonalData (req, res){
    const PatientUUID = req.cookies.PatientUUID
    const PatientID = await UUID_to_ID(PatientUUID) // converts PatientUUID to docid
    
    const basic_user_info = 'basic_user_info';
  
    const sql = `SELECT FirstName, LastName, Gender, DOB FROM ${basic_user_info} WHERE User_ID = ?`
    const values = [PatientID];
    await DB_Operation(fetchPersonalData.name, basic_user_info);

    let PersonalData = {
        FirstName: '',
        LastName: '',
        Gender: '',
        DOB_month: '',
        DOB_day: '',
        DOB_year: ''
    };

    try{
        const [results] = await connection.execute(sql, values);
        if (results.length === 0) return res.json(PersonalData);
        else {
            let dob = moment(results[0].DOB);
            PersonalData = {
                FirstName: results[0].FirstName,
                LastName: results[0].LastName,
                Gender: results[0].Gender,
                DOB_month: dob.format('MMMM'),  // getting month name
                DOB_day: dob.date().toString(),  // getting day
                DOB_year: dob.year().toString()  // getting year
            };
            return res.json(PersonalData);
        }
    }catch(error){
        console.log(`error in ${fetchPersonalData.name}:`, error);
        return res.json(PersonalData);
    }
};
