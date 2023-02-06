import { v4 as uuidv4 } from 'uuid';
import { connection, useDB } from './connect.js';
import moment from 'moment';

// These functions are made to not send the DoctorID back and forth from server to client.
// Instead, a UUID (Universally Unique Identifier) is created, which matches to a DoctorID, and is sent back and forth

/** DoctorID_to_DoctorUUID takes in the DoctorID, creates a complementary UUID, and inserts it into the UUID_reference table
 *  NOT CURRENTLY BEING USED
 *  In the future, UUID will be what is sent to client instead of DocID as the main identifier
 * @param {Int} DoctorID DoctorID
 * @returns Randomly generated UUID
 */
export async function DoctorID_to_DoctorUUID(DoctorID){
    // console.log('DoctorID_to_DoctorUUID', DoctorID )
    const DoctorUUID = uuidv4();
  
    const table_name = 'DoctorUUID_reference';
    const DB_name = 'DoctorDB';
    const date_ob = new Date();
    const format = "YYYY-MM-DD HH:mm:ss"
    const dateTime = moment(date_ob).format(format);
    // console.log('dateTime',dateTime)
    // const dateTimeObj = {
    //   Created_at: `${dateTime}`
    // }
  
    await useDB(DoctorID_to_DoctorUUID.name, DB_name, `${table_name}`)
    const sql = `INSERT INTO ${table_name} (DoctorUUID, Created_at, Doctor_ID) VALUES (?, ?, ?)`;
    const values = [DoctorUUID, dateTime, DoctorID ];
  
    try {
        await connection.execute(sql, values)
        return DoctorUUID
    }catch(error){
      return (`error in ${DoctorID_to_DoctorUUID.name}:`, error)
    }
};

/** DoctorUUID_to_DoctorID takes in the UUID, and searches for it's complementary DoctorID, returning to user
 * @param {*} UUID DoctorID
 * @returns Corresponding DoctorID
 */
export async function DoctorUUID_to_DoctorID(DoctorUUID){
    // console.log('DoctorUUID_to_DoctorID', DoctorUUID )
    const table_name = 'DoctorUUID_reference';
    const DB_name = 'DoctorDB';
  
    await useDB(DoctorUUID_to_DoctorID.name, DB_name, `${table_name}`)
    const sql = `SELECT Doctor_ID FROM ${table_name} WHERE DoctorUUID = ?`;
    const values = [DoctorUUID];  
  
    try {
        const DoctorID = await connection.execute(sql, values)
        const doc_new = DoctorID[0][0].Doctor_ID
        // console.log('doc_new returned', doc_new)
        return doc_new
    }catch(error){
      return (`error in ${DoctorUUID_to_DoctorID.name}:`, error)
    }
}
