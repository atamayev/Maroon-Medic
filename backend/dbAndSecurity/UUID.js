import { v4 as uuidv4 } from 'uuid';
import { connection, useDB } from './connect.js';

// These functions are made to not send the DoctorID back and forth from server to client.
// Instead, a UUID (Universally Unique Identifier) is created, which matches to a DoctorID, and is sent back and forth

/** ID_to_UUID takes in the DoctorID, creates a complementary UUID, and inserts it into the UUID_reference table
 *  NOT CURRENTLY BEING USED
 *  In the future, UUID will be what is sent to client instead of DocID as the main identifier
 * @param {Int} DoctorID DoctorID
 * @returns Randomly generated UUID
 */
export async function DoctorID_to_UUID(DoctorID){
    // console.log('DoctorID', DoctorID )
    const UUID = uuidv4();
  
    const table_name = 'UUID_reference';
    const DB_name = 'DoctorDB';
  
    await useDB(DoctorID_to_UUID.name, DB_name, `${table_name}`)
    const sql = `INSERT INTO ${table_name} (UUID, Doctor_ID) VALUES (?, ?)`;
    const values = [UUID, DoctorID ];  
  
    try {
        await connection.execute(sql, values)
        return UUID
    }catch(error){
      return (`error in ${DoctorID_to_UUID.name}:`, error)
    }
};

/** UUID_to_DoctorID takes in the UUID, and searches for it's complementary DoctorID, returning to user
 *  NOT CURRENTLY BEING USED
 * @param {*} UUID DoctorID
 * @returns Corresponding DoctorID
 */
export async function UUID_to_DoctorID(UUID){
    console.log('UUID', UUID )
    const table_name = 'UUID_reference';
    const DB_name = 'DoctorDB';
  
    await useDB(UUID_to_DoctorID.name, DB_name, `${table_name}`)
    const sql = `SELECT Doctor_ID FROM ${table_name} WHERE UUID = ?`;
    const values = [UUID];  
  
    try {
        const DoctorID = await connection.execute(sql, values)
        const doc_new = DoctorID[0][0].Doctor_ID
        console.log('doc_new returned', doc_new)
        return doc_new
    }catch(error){
      return (`error in ${UUID_to_DoctorID.name}:`, error)
    }
}
