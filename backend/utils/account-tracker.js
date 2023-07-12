import AuthDB from "../db/auth-DB.js"
import TimeUtils from "./time.js"

/** login_history saves the date and IP Address of a certain user
 * @param {Int} User_ID
 * @returns N/A, saves the data to the DB
 */
export async function loginHistory(User_ID) {
  const loginAt = TimeUtils.createFormattedDate()

  try {
    await AuthDB.addLoginHistory(User_ID, loginAt)
    return
  } catch (error) {
    console.log("Problem with adding login history")
  }
}

//Later, create a function that logs any kinds of profile updates
