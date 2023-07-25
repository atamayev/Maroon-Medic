import AuthDB from "../db/auth-DB.ts"
import TimeUtils from "./time.ts"

/** login_history saves the date and IP Address of a certain user
 * @param {Int} UserID
 * @returns N/A, saves the data to the DB
 */
export async function loginHistory(UserID: number) {
  const loginAt = TimeUtils.createFormattedDate()

  try {
    await AuthDB.addLoginHistory(UserID, loginAt)
    return
  } catch (error: any) {
    console.log("Problem with adding login history")
  }
}

//Later, create a function that logs any kinds of profile updates
