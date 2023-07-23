import _ from "lodash"
import { v4 as uuidv4 } from "uuid"
import UUIDDB from "../db/UUID-DB.js"
import TimeUtils from "../utils/time.js"

// These functions are made to not send the ID back and forth from server to client.
// Instead, a UUID (Universally Unique Identifier) is created, which matches to a ID, and is sent back and forth

/** ID_to_UUID takes in the ID, creates a complementary UUID, and inserts it into the UUID_reference table
 *  In the future, UUID will be what is sent to client instead of DocID as the main identifier
 * @param {Int} UserID UserID
 * @returns Randomly generated UUID
 */
export async function ID_to_UUID(UserID: number) {
  const UUID = uuidv4()
  const createdAt = TimeUtils.createFormattedDate()

  try {
    await UUIDDB.createNewUUID(UUID, createdAt, UserID)
    return UUID
  } catch (error) {
    throw new Error(`Unable to convert UserID to UUID ${UserID}`)
  }
}

/** UUID_to_ID takes in the UUID, and searches for it's complementary DoctorID, and returns it
 *  If there is match found, the function returns an error, which is handled in the function that called UUID_to_ID
 * @param {*} UUID DoctorID
 * @returns Corresponding DoctorID
 */
export async function UUID_to_ID(UUID: string): Promise<number> {
  if (!UUID) throw new Error(`no UUID received in ${UUID_to_ID.name}`)

  try {
    const incompleteID = await UUIDDB.retrieveUUID(UUID)
    if (_.isEmpty(incompleteID)) throw new Error(`No UserID found for UUID: ${UUID}`)
    const ID = incompleteID[0].User_ID
    return ID
  } catch (error) {
    throw new Error(`No UserID found for UUID: ${UUID}`)
  }
}
