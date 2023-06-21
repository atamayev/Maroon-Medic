import dayjs from "dayjs";
import { UUID_to_ID } from "../db-and-security-and-helper-functions/UUID.js";
import {connection, DB_Operation} from "../db-and-security-and-helper-functions/connect.js";
import { clearCookies } from "../db-and-security-and-helper-functions/cookie-operations.js";

/** makeAppointment is called when a patient makes an appointment
 *  First, finds the Doctor_ID corresponding to the NVI of the appointment Doctor
 *  Then, converts the Patient UUID to the PatientID, and inserts the apointment details into the Appointments table
 * @param {Object} req Appointment Object
 * @param {status} res 200/400 status code
 * @returns 200/400 status code
 *  DOCUMENTATION LAST UPDATED 6/4/23
 */
export async function makeAppointment(req, res) {
    const AppointmentObject = req.body.AppointmentObject
    const NVI = AppointmentObject.NVI;

    const [Doctor_specific_info, Appointments] = ['Doctor_specific_info', 'Appointments']
    const sql = `SELECT Doctor_ID FROM ${Doctor_specific_info} WHERE NVI = ?`
    const values = [NVI];
    let Doctor_ID;

    await DB_Operation(makeAppointment.name, Doctor_specific_info)
    try {
        const [results] = await connection.execute(sql, values)
        Doctor_ID = results[0].Doctor_ID
    } catch(error) {
        return res.status(500).json(error);
    }

    const PatientUUID = req.cookies.PatientUUID;
    let Patient_ID
    try {
        Patient_ID = await UUID_to_ID(PatientUUID);
    } catch (error) {
        clearCookies(res, 'Patient')
        return res.status(401).json({ shouldRedirect: true, redirectURL: '/patient-login' }); 
    }

    const date_ob = new Date();
    const format = "YYYY-MM-DD HH:mm:ss"
    const createdAt = dayjs(date_ob).format(format);

    // Remove 'th', 'st', 'nd', 'rd' from the date
    const dateStr = AppointmentObject.appointment_date.replace(/\b(\d+)(th|st|nd|rd)\b/g, '$1');
    const timeStr = AppointmentObject.appointment_time;

    // Combine date and time into a single string
    const dateTimeStr = `${dateStr} ${timeStr}`;

    // Parse the dateTimeStr into a Date object
    const dateTime = new Date(dateTimeStr);

    // Format the Date object into MySQL DATETIME format
    const mysqlDateTime = dateTime.toISOString().slice(0, 19).replace('T', ' ');

    console.log(mysqlDateTime);

    const sql2 = `INSERT INTO ${Appointments}
        (appointment_date, patient_message, Doctor_confirmation_status, Service_and_category_list_ID, Patient_ID, Doctor_ID, Addresses_ID, Created_at) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const values2 = [mysqlDateTime, null, AppointmentObject.Instant_book, AppointmentObject.Service_and_category_list_ID, Patient_ID, Doctor_ID, AppointmentObject.Addresses_ID, createdAt];
    
    console.log(values2)
    
    await DB_Operation(makeAppointment.name, Appointments)
    try {
        await connection.execute(sql2, values2)
        return res.status(200).json();
    } catch(error) {
        // console.log(error)
        return res.status(500).json(error);
    }
};

/** getDoctorCalendarDetails retreives a certain Doctor's calendar details
 *  First, converts the DoctorUUID to the DoctorID
 *  Then, performs a bunch of joins, and retreieves all the appointments and appointment data for that Doctor (service, time, address, etc.)
 * @param {*} req Cookies
 * @param {status} res Results, 200/400 status code
 * @returns Doctor's Calendar Details
 *  DOCUMENTATION LAST UPDATED 6/4/23
 */
export async function getDoctorCalendarDetails(req, res) {
    const DoctorUUID = req.cookies.DoctorUUID
    let DoctorID

    try {
        DoctorID = await UUID_to_ID(DoctorUUID);
    } catch (error) {
        clearCookies(res, 'Doctor')
        return res.status(401).json({ shouldRedirect: true, redirectURL: '/vet-login' }); 
    }

    const [Appointments, service_and_category_list, service_mapping, addresses, basic_user_info] = 
        ['Appointments', 'service_and_category_list', 'service_mapping', 'addresses', 'basic_user_info'];

    const sql = `SELECT 
            ${Appointments}.AppointmentsID, ${Appointments}.appointment_date, ${Appointments}.patient_message, ${Appointments}.Doctor_confirmation_status, ${Appointments}.Created_at,
            ${service_and_category_list}.Category_name, ${service_and_category_list}.Service_name, 
            ${service_mapping}.Service_time,
            ${addresses}.address_title, ${addresses}.address_line_1, ${addresses}.address_line_2, ${addresses}.city, ${addresses}.state, ${addresses}.zip, ${addresses}.country,
            ${basic_user_info}.FirstName AS Patient_FirstName, ${basic_user_info}.LastName AS Patient_LastName
        FROM ${Appointments}
            INNER JOIN ${service_and_category_list} ON ${Appointments}.${service_and_category_list}_ID = ${service_and_category_list}.${service_and_category_list}ID
            INNER JOIN ${addresses} ON ${Appointments}.${addresses}_ID = ${addresses}.${addresses}ID AND ${addresses}.Doctor_ID = ${Appointments}.Doctor_ID
            INNER JOIN ${basic_user_info} ON ${Appointments}.Patient_ID = ${basic_user_info}.User_ID
            INNER JOIN service_mapping ${service_mapping} ON ${Appointments}.Service_and_category_list_ID = ${service_mapping}.Service_and_Category_ID AND ${Appointments}.Doctor_ID = ${service_mapping}.Doctor_ID
        WHERE
            ${Appointments}.Doctor_ID = ?`;

    const values = [DoctorID];
    await DB_Operation(getDoctorCalendarDetails.name, Appointments);

    try {
        const [results] = await connection.execute(sql, values);
        return res.status(200).json(results);
    } catch(error) {
        return res.status(400).json([]);
    }
};
