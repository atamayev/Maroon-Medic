import {connection, DB_Operation} from "../dbAndSecurity/connect.js";
import { UUID_to_ID } from "../dbAndSecurity/UUID.js";
import moment from "moment";

export async function makeAppointment(req, res){
    const AppointmentObject = req.body.AppointmentObject
    const NVI = AppointmentObject.NVI;

    const [Doctor_specific_info, Appointments] = ['Doctor_specific_info', 'Appointments']
    const sql1 = `SELECT Doctor_ID FROM ${Doctor_specific_info} WHERE NVI = ?`
    const values1 = [NVI];
    let Doctor_ID;

    await DB_Operation(makeAppointment.name, Doctor_specific_info)
    try{
        const [results] = await connection.execute(sql1, values1)
        Doctor_ID = results[0].Doctor_ID
    }catch(error){
        console.log(`error in finding Doctor_ID in ${makeAppointment.name}`,error)
        return res.status(500).json(error);
    }

    const PatientUUID = req.cookies.PatientUUID;
    const Patient_ID = await UUID_to_ID(PatientUUID); // converts PatientUUID to docid

    const date_ob = new Date();
    const format = "YYYY-MM-DD HH:mm:ss"
    const createdAt = moment(date_ob).format(format);

    // Combine date and time into a single string
    const dateTimeStr = `${AppointmentObject.appointment_date} ${AppointmentObject.appointment_time}`;

    // Convert the string to a DateTime object
    const dateTime = moment(dateTimeStr, 'dddd, MMMM Do, YYYY HH:mm');

    // If you need to format this date to a MySQL DATETIME format, you can do it like this:
    const mysqlDateTime = dateTime.format('YYYY-MM-DD HH:mm:ss');

    const sql2 = `INSERT INTO ${Appointments}
        (appointment_date, patient_message, Doctor_confirmation_status, Service_and_category_list_ID, Patient_ID, Doctor_ID, Addresses_ID, Created_at) 
        VALUES (?, ?,?,?,?,?,?, ?)`;
    const values2 = [mysqlDateTime, null, AppointmentObject.Instant_book, AppointmentObject.Service_and_category_list_ID, Patient_ID, Doctor_ID, AppointmentObject.Addresses_ID, createdAt];

    await DB_Operation(makeAppointment.name, Appointments)
    
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
};
