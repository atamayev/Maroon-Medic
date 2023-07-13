import _ from "lodash"
import { v4 as uuidv4 } from "uuid"
import UUIDDB from "../db/UUID-DB.js"
import TimeUtils from "../utils/time.js"

// These functions are made to not send the ID back and forth from server to client.
// Instead, a UUID (Universally Unique Identifier) is created, which matches to a ID, and is sent back and forth

/** ID_to_UUID takes in the ID, creates a complementary UUID, and inserts it into the UUID_reference table
 *  In the future, UUID will be what is sent to client instead of DocID as the main identifier
 * @param {Int} ID User_ID
 * @returns Randomly generated UUID
 */
export async function ID_to_UUID(User_ID) {
  const UUID = uuidv4()
  const createdAt = TimeUtils.createFormattedDate()

  try {
    await UUIDDB.createNewUUID(UUID, createdAt, User_ID)
    return UUID
  } catch (error) {
    return (`error in ${ID_to_UUID.name}:`, error)
  }
}

/** UUID_to_ID takes in the UUID, and searches for it's complementary DoctorID, and returns it
 *  If there is match found, the function returns an error, which is handled in the function that called UUID_to_ID
 * @param {*} UUID DoctorID
 * @returns Corresponding DoctorID
 */
export async function UUID_to_ID(UUID) {
  if (!UUID) throw new Error(`no UUID received in ${UUID_to_ID.name}`)

  try {
    const incompleteID = await UUIDDB.retrieveUUID(UUID)
    if (_.isEmpty(incompleteID)) throw new Error(`No User_ID found for UUID: ${UUID}`)
    const ID = incompleteID[0].User_ID
    return ID
  } catch (error) {
    throw new Error(`No User_ID found for UUID: ${UUID}`)
  }
}
