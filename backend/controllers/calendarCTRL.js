import {connection, DB_Operation} from "../dbAndSecurity/connect.js";
import { UUID_to_ID } from "../dbAndSecurity/UUID.js";
import moment from "moment";

export async function makeAppointment(req, res){
    const AppointmentObject = req.body.AppointmentObject
    console.log('AppointmentObject',AppointmentObject)
    const NVI = AppointmentObject.NVI;

    const table_name1 = 'Doctor_specific_info'
    const sql1 = `SELECT Doctor_ID FROM ${table_name1} WHERE NVI = ?`
    const values1 = [NVI];
    let Doctor_ID;

    await DB_Operation(makeAppointment.name, table_name1)
    try{
        const [results] = await connection.execute(sql1, values1)
        Doctor_ID = results[0].Doctor_ID
    }catch(error){
        console.log(`error in finding Doctor_ID in ${makeAppointment.name}`,error)
        return res.status(500).json(error);
    }

    const PatientUUID = req.cookies.PatientUUID
    const Patient_ID = await UUID_to_ID(PatientUUID) // converts PatientUUID to docid

    // Combine date and time into a single string
    const dateTimeStr = `${AppointmentObject.appointment_date} ${AppointmentObject.appointment_time}`;

    // Convert the string to a DateTime object
    const dateTime = moment(dateTimeStr, 'dddd, MMMM Do, YYYY HH:mm');

    // If you need to format this date to a MySQL DATETIME format, you can do it like this:
    const mysqlDateTime = dateTime.format('YYYY-MM-DD HH:mm:ss');

    const table_name2 = 'Appointments'
    const sql2 = `INSERT INTO ${table_name2} (appointment_date, patient_message, Doctor_confirmation_status, Service_mapping_ID, Patient_ID, Doctor_ID, Addresses_ID) VALUES (?, ?,?,?,?,?,?)`;
    const values2 = [mysqlDateTime, null, 1, AppointmentObject.Service_mapping_ID, Patient_ID, Doctor_ID, AppointmentObject.Addresses_ID];

    await DB_Operation(makeAppointment.name, table_name2)
    
    try{
        await connection.execute(sql2, values2)
        return res.status(200).json();
    }catch(error){
        console.log(`error in inserting Appointment ${makeAppointment.name}`,error)
        return res.status(500).json(error);
    }
}

export async function getDoctorCalendarDetails(req, res){
    return res.status(200).json()
}
