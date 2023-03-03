import { v4 as uuidv4 } from 'uuid';
import { connection, useDB } from './connect.js';
import moment from 'moment';
import Crypto from './crypto.js';
// These functions are made to not send the DoctorID back and forth from server to client.
// Instead, a UUID (Universally Unique Identifier) is created, which matches to a DoctorID, and is sent back and forth

/** ID_to_UUID takes in the ID, creates a complementary UUID, and inserts it into the UUID_reference table
 *  In the future, UUID will be what is sent to client instead of DocID as the main identifier
 * @param {Int} ID Doctor/PatientID
 * @param {String} type Doctor or Patient
 * @returns Randomly generated UUID
 */
export async function ID_to_UUID(ID, type){
    const UUID = uuidv4();
    const table_name = `${type}UUID_reference`; // not check if type is patient or doctor because this is not a client-facing function. every function that uses this function already filters out non-patient/doctor types
    const DB_name = `${type}DB`;
    
    const date_ob = new Date();
    const format = "YYYY-MM-DD HH:mm:ss"
    const dateTime = moment(date_ob).format(format);
    const dateTimeObj = {
      Created_at: `${dateTime}`
    }
    const encrypted_date_time = Crypto.encrypt_single_entry(dateTimeObj).Created_at

    await useDB(ID_to_UUID.name, DB_name, `${table_name}`)
    const sql = `INSERT INTO ${table_name} (${type}UUID, Created_at, ${type}_ID) VALUES (?, ?, ?)`;
    const values = [UUID, encrypted_date_time, ID ];
  
    try {
      await connection.execute(sql, values)
      return UUID
    }catch(error){
      return (`error in ${ID_to_UUID.name}:`, error)
    }
};

/** DoctorUUID_to_DoctorID takes in the UUID, and searches for it's complementary DoctorID, and returns it
 * Note, this is practically the same function as DoctorUUIDtoDoctorID in userCTRL.js. The reason for having two similar functions is that this one is soley for back-end purposes
 * DoctorUUIDtoDoctorID in userCTRL.js returns the DoctorID to client as a JSON, with a response.
 * @param {*} UUID DoctorID
 * @returns Corresponding DoctorID
 */
export async function UUID_to_ID(UUID, type){
  const table_name = `${type}UUID_reference`; // not check if type is patient or doctor because this is not a client-facing function. every function that uses this function already filters out non-patient/doctor types
  const DB_name = `${type}DB`;

  await useDB(UUID_to_ID.name, DB_name, table_name)
  const sql = `SELECT ${type}_ID FROM ${table_name} WHERE ${type}UUID = ?`;
  const values = [UUID];

  try {
      const incomplete_ID = await connection.execute(sql, values)
      const ID = incomplete_ID[0][0][`${type}_ID`];
      return ID
  }catch(error){
    return (`error in ${UUID_to_ID.name}:`, error)
  }
};
