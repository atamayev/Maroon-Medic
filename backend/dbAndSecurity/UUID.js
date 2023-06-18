import { v4 as uuidv4 } from 'uuid';
import { connection, DB_Operation } from './connect.js';
import dayjs from 'dayjs';
import _ from 'lodash';

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
  const dateTime = dayjs(date_ob).format(format);

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
 *  If there is match found, the function returns an error, which is handled in the function that called UUID_to_ID
 * @param {*} UUID DoctorID
 * @returns Corresponding DoctorID
 */
export async function UUID_to_ID(UUID) {
  try {
    if (!UUID) throw new Error(`no UUID recieved in ${UUID_to_ID.name}`);
  } catch (error) {
    console.log(`no UUID recieved in ${UUID_to_ID.name}`)
    return
  }

  const UUID_reference = 'UUID_reference';
  const sql = `SELECT User_ID FROM ${UUID_reference} WHERE UUID = ?`;
  const values = [UUID];

  await DB_Operation(UUID_to_ID.name, UUID_reference)

  try {
    const [incomplete_ID] = await connection.execute(sql, values)
    if (_.isEmpty(incomplete_ID)) throw new Error(`No User_ID found for UUID: ${UUID_to_ID.name}`);
    const ID = incomplete_ID[0].User_ID;
    return ID;
  } catch(error) {
    console.log(`error in ${UUID_to_ID.name}:`, error)
    return
  }
};
