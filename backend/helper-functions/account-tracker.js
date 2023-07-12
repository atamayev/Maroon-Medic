import TimeUtils from "../utils/time.js"
import { DB_Operation, connection } from "../db-setup-and-security/connect.js"

/** login_history saves the date and IP Address of a certain user
 * @param {Int} User_ID
 * @returns N/A, saves the data to the DB
 */
export async function loginHistory(User_ID) {
  const login_history = "login_history"

  const loginAt = TimeUtils.createFormattedDate()

  const sql = `INSERT INTO ${login_history} (Login_at, IP_Address, User_ID) VALUES (?, ?, ?)`
  const values = [loginAt, null, User_ID]

  await DB_Operation(loginHistory.name, login_history)

  try {
    await connection.execute(sql, values)
    return
  } catch (error) {
    console.log("Problem with adding login history")
  }
}

//Later, create a function that logs any kinds of profile updates
