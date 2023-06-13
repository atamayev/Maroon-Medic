import { DB_Operation, connection } from "./connect.js";
import dayjs from "dayjs";

/** login_history saves the date and IP Address of a certain user 
 * @param {Int} User_ID 
 * @returns N/A, saves the data to the DB
 */
export async function login_history(User_ID) {
  const login_history = 'login_history';

  const date_ob = new Date();
  const format = "YYYY-MM-DD HH:mm:ss"
  const dateTime = dayjs(date_ob).format(format);
  
  const sql = `INSERT INTO ${login_history} (Login_at, IP_Address, User_ID) VALUES (?, ?, ?)`;
  const values = [dateTime, 0, User_ID];
  
  await DB_Operation(login_history.name, login_history)

  try {
    await connection.execute(sql, values);
    return;
  } catch(error) {
    console.log('Problem with email selection', error)
    return ('Problem with email selection');
  }
};

//Later, create a function that logs any kinds of profile updates
