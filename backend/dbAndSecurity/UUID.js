import { v4 as uuidv4 } from 'uuid';
import { connection, DB_Operation } from './connect.js';
import moment from 'moment';
// These functions are made to not send the ID back and forth from server to client.
// Instead, a UUID (Universally Unique Identifier) is created, which matches to a ID, and is sent back and forth

/** ID_to_UUID takes in the ID, creates a complementary UUID, and inserts it into the UUID_reference table
 *  In the future, UUID will be what is sent to client instead of DocID as the main identifier
 * @param {Int} ID User_ID
 * @returns Randomly generated UUID
 */
export async function ID_to_UUID(User_ID) {
  const UUID = uuidv4();
  const UUID_reference = 'UUID_reference';
  
  const date_ob = new Date();
  const format = "YYYY-MM-DD HH:mm:ss"
  const dateTime = moment(date_ob).format(format);

  await DB_Operation(ID_to_UUID.name, UUID_reference)
  const sql = `INSERT INTO ${UUID_reference} (UUID, Created_at, User_ID) VALUES (?, ?, ?)`;
  const values = [UUID, dateTime, User_ID];

  try {
    await connection.execute(sql, values)
    return UUID;
  } catch(error) {
    return (`error in ${ID_to_UUID.name}:`, error)
  }
};

/** UUID_to_ID takes in the UUID, and searches for it's complementary DoctorID, and returns it
 * Note, this is practically the same function as DoctorUUIDtoDoctorID in userCTRL.js. The reason for having two similar functions is that this one is soley for back-end purposes
 * DoctorUUIDtoDoctorID in userCTRL.js returns the DoctorID to client as a JSON, with a response.
 * @param {*} UUID DoctorID
 * @returns Corresponding DoctorID
 */
export async function UUID_to_ID(UUID) {
  const UUID_reference = 'UUID_reference';
  const sql = `SELECT User_ID FROM ${UUID_reference} WHERE UUID = ?`;
  const values = [UUID];

  await DB_Operation(UUID_to_ID.name, UUID_reference)

  try {
    const [incomplete_ID] = await connection.execute(sql, values)
    const ID = incomplete_ID[0]['User_ID'];
    return ID;
  } catch(error) {
    return (`error in ${UUID_to_ID.name}:`, error)
  }
};
