import {connection, DB_Operation} from "../dbAndSecurityAndHelperFunctions/connect.js";
import jwt from "jsonwebtoken";
import dayjs from "dayjs"
import Hash from "../dbAndSecurityAndHelperFunctions/hash.js";
import dotenv from "dotenv";
import { ID_to_UUID, UUID_to_ID } from "../dbAndSecurityAndHelperFunctions/UUID.js";
dotenv.config()
import { loginHistory } from "../dbAndSecurityAndHelperFunctions/accountTracker.js";
import { clearCookies } from "../dbAndSecurityAndHelperFunctions/cookieOperations.js";
import _ from "lodash"

/** JWT_verify verifies the user's token (held in cookie). 
 *  It does this in two steps. First, it checks if the DoctorAccessToken is valid (verification). If verified, the UUID is extracted from the Access Token. The UUID is then searched in the DB
 *  If the user's UUID is in the UUID_reference table, and the JWT was verified successfully, set isValid to true,
 *  If there is a user's whose credentials match what was verified/queried, set verified to true. Any other case, set verified to false.
 * @param {String} req Cookie from client 
 * @param {Boolean} res True/False
 * @returns Returns true/false, depending on wheather the cookie is verified, and if the contents of the cookie are valid
 *  DOCUMENTATION LAST UPDATED 3/14/23
 */
export async function JWT_verify (req, res) {
  const cookies = req.cookies;
  let AccessToken;
  let response = {
    isValid: false, 
    type: ''
  };
  let decodedUUID;

  if ("DoctorAccessToken" in cookies) response.type = 'Doctor';
  else if ("PatientAccessToken" in cookies) response.type = 'Patient';
  else {
    clearCookies(res, undefined)
    return res.status(401).json({ shouldRedirect: true, redirectURL: '/' }); 
  }

  try {
    AccessToken = req.cookies[`${response.type}AccessToken`]
    const JWTKey = response.type === 'Patient' ? process.env.PATIENT_JWT_KEY : process.env.DOCTOR_JWT_KEY;
    decodedUUID = jwt.verify(AccessToken, JWTKey)[`${response.type}ID`];

    if (Date.now() >= decodedUUID.exp * 1000) {
      let redirectURL
      if (response.type === 'Doctor') redirectURL = '/vet-login'
      else if (response.type === 'Patient') redirectURL = '/patient-login'
      clearCookies(res, undefined)
      return res.status(401).json({ shouldRedirect: true, redirectURL: redirectURL });
    } else {
      const UUID_reference = 'UUID_reference';
      const sql = `SELECT UUID FROM ${UUID_reference} WHERE UUID = ?`;
      const values = [decodedUUID];
      await DB_Operation(JWT_verify.name, UUID_reference)

      const [results] = await connection.execute(sql, values)
      if (results.length === 1) {
        response.isValid = true;
        return res.status(200).json(response);
      } else {
        response.isValid = false;
        clearCookies(res, undefined)
        return res.status(400).json({ shouldRedirect: true, redirectURL: '/' })
      }
    }
  } catch(error) {
    clearCookies(res, undefined)
    return res.status(401).json()  
  }
};

/** login checks if an existing user's credentials exist in the Doctor_credentials table. If they do, then UUID cookie and KWT sent to client
 *  First, deciphers what kind of user is trying to login based on the login_information object.
 *  The entered email is searched in the DB
 *  If that email exists, continue. If not, return Username not found
 *  If the email exists, extract the hashed password from the DB
 *  If hashed pass in DB matches the entered pass, start creating JWT key, and send the cookie. If not, means incorrect password
 *  A complementary UUID is created fromt the user's ID (extracted from the login), and sent as part of the payload. This payload is signed with a JWT key, and sent as a cookie
 *  The UUID is sent seperately as a cookie.
 *  JWT and UUID have two different purposes. JWT is strictly for verification purposes. UUID will be used as an intermediary to send data back and forth bw client and server. Similar to a nametag on a person
 * @param {Object} req Contains the user's username, password, type
 * @param {Response} res If successful, contains a cookie, and JSON with user's results. If not, returns error in a JSON
 * @returns An error, or a json response, depending on wheather the credentials exist in the DB
 *  DOCUMENTATION LAST UPDATED 3/14/23
 */
export async function login (req, res) {
  const { email, password, login_type } = req.body.login_information_object;
  const Credentials = 'Credentials';
  
  if (login_type !== 'Doctor' && login_type !== 'Patient') return res.json('Invalid User Type'); // If Type not Doctor or Patient

  const sql = `SELECT * FROM ${Credentials} WHERE email = ? AND User_type = ?`;
  const values = [email, login_type];
  
  await DB_Operation(login.name, Credentials)

  let results;
  let hashed_password;

  try {
    [results] = await connection.execute(sql, values);
    if (_.isEmpty(results)) return res.status(404).json("Username not found!");
    else hashed_password = results[0].password;
  } catch(error) {
    return res.status(500).json({ error: 'Problem with email selection' });
  }

  let bool;

  try {
    bool = await Hash.checkPassword(password, hashed_password)
  } catch(error) {
    return res.status(500).json({ error: 'Problem with checking password' });
  }
  
  if (bool === true) {
    const IDKey = `${login_type}ID`;
    const ID = results[0].UserID;
    const UUID = await ID_to_UUID(ID);
    
    const expiration_time = 20; // not using this right now.
    
    const payload = {
      [IDKey]: UUID,
      // exp: Math.floor(Date.now()/1000) +expiration_time // temporarily taking out expiration to make sure system is running smoothly
    }
    const JWTKey = login_type === 'Patient' ? process.env.PATIENT_JWT_KEY : process.env.DOCTOR_JWT_KEY;
    
    let token;
    try {
      token = jwt.sign(payload, JWTKey);
    } catch(error) {
      return res.status(500).json({ error: 'Problem with Signing JWT' });
    }

    loginHistory(ID);

    clearCookies(res, login_type)

    // const expires = new Date(Date.now() + expiration_time *1000)

    return res
      .cookie(`${login_type}AccessToken`, token, {
        // expires,
        // httpOnly: true,
        // secure:true
      })
      .cookie(`${login_type}UUID`, UUID, {
        // expires,
        // httpOnly: true,
        // secure:true
      })
      .status(200)
      .json();
  } else {
    return res.status(400).json("Wrong Username or Password!");
  }
};

/** 
 *  register adds a new user's credentials to the Doctor_credentials table, and sends a JSON response (along with a cookie) back to client depending on the results
 *  Register code is very similar to login. Read login documentation for a more in-depth review
  * First, register checks if the username entered already exists in the table
 *  If exists, then the user is unable to make an account. If doesn't exist, move on
 *  The password is hashed, and a dateTime object is created, before being entered into the credentials table
 *  Depending on the user_type, the insert SQL change. If doctor, insert verification status (currently set to true by default).
 *  Verification is wheather the doctor's identity is confirmed (via some ID)
 *  The rest of the code is same as login.
 *  However, an extra newUser cookie is sent during registration. This is done to give the new user permission to certain pages that non-new users shouldn't have access to (new-doctor, patient)
 * @param {Object} req Contains the user's username, password, type
 * @param {Response} res If successful, returns 3 cookies: UUID, newUserUUID, and AccessToken. If not, returns error in a JSON
 * @returns An error, or a json response, depending on wheather the credentials are able to be registered
 *  DOCUMENTATION LAST UPDATED 3/14/23
 */
export async function register (req, res) {
  const {email, password, register_type} = req.body.register_information_object // Desctructures the request
  const Credentials = 'Credentials';

  if (register_type !== 'Doctor' && register_type !== 'Patient') return res.status(400).json('Invalid User Type'); // If Type not Doctor or Patient

  const sql = `SELECT * FROM ${Credentials} WHERE email = ? AND User_type = ? `;
  const values = [email, register_type];

  await DB_Operation(register.name, Credentials)

  let results;
  try {
    [results] = await connection.execute(sql, values)
    if (!_.isEmpty(results)) return res.status(400).json("User already exists!");
  } catch(error) {
    return res.status(500).json({ error: 'Problem with existing email search' });
  }

  let hashed_password;
  if (_.isEmpty(results)) {
    try {
      hashed_password = await Hash.hash_credentials(password)
    } catch(error) {
      return res.status(500).json({ error: 'Problem with Password Hashing' });
    }
  }

  const date_ob = new Date();
  const format = "YYYY-MM-DD HH:mm:ss"
  const dateTime = dayjs(date_ob).format(format);

  const sql_1 = `INSERT INTO ${Credentials} (email, password, Created_at, User_type) VALUES (?, ?, ?, ?)`;
  const values_1 = [email, hashed_password, dateTime, register_type];
  let results_1;
  try {
    [results_1] = await connection.execute(sql_1, values_1)
  } catch(error) {
    return res.status(500).json({ error: 'Problem with Data Insertion' });
  }

  const User_ID = results_1.insertId

  if (register_type === 'Doctor') {
    const Doctor_specific_info = 'Doctor_specific_info';
  
    const sql_2 = `INSERT INTO ${Doctor_specific_info} (verified, publiclyAvailable, Doctor_ID) VALUES (?, ?, ?)`;
    const values_2 = [true, true, User_ID];
  
    try {
      await connection.execute(sql_2, values_2)
    } catch(error) {
      return res.status(500).json({ error: 'Problem with Data Insertion' });
    }
  }

  const IDKey = `${register_type}ID`;
  const UUID = await ID_to_UUID(User_ID)

  const expiration_time = 20; // not using this right now.
  const payload = {
    [IDKey]: UUID,
    // exp: Math.floor(Date.now()/1000) +expiration_time // temporarily taking out expiration to make sure system is running smoothly
  }
  const JWTKey = register_type === 'Patient' ? process.env.PATIENT_JWT_KEY : process.env.DOCTOR_JWT_KEY;
  let token;
  try {
    token = jwt.sign(payload, JWTKey);
  } catch(error) {
    return res.status(500).json({ error: 'Problem with Signing JWT' });
  }

  const newUser_UUID = await ID_to_UUID(User_ID);

  loginHistory(User_ID);

  clearCookies(res, register_type)

  return res
    .cookie(`${register_type}AccessToken`, token, {
      // expires,
      // httpOnly: true,
      // secure:true
    })
    .cookie(`${register_type}UUID`, UUID, {
      // expires,
      // httpOnly: true,
      // secure:true
    })
    .cookie(`${register_type}New_User`, newUser_UUID, {
      // expires,
      // httpOnly: true,
      // secure:true
    })
    .status(200)
    .json();
};

/** fetchLoginHistory is self-explanatory in name
 *  Finds the UUID in the cookies, and returns the login history (all previous logged in times, IP_addresses) from the table
 * @param {*} req Cookies
 * @param {*} res Results, along with a 200/400 status code
 * @returns Login Time and IP Address from the loginHistory table
 *  DOCUMENTATION LAST UPDATED 6/4/23
 */
export async function fetchLoginHistory (req, res) {
  const cookies = req.cookies;
  let UUID;
  let type;

  if ("DoctorUUID" in cookies || "DoctorAccessToken" in cookies) {
    UUID = cookies.DoctorUUID
    type = 'Doctor'
  } 
  else if ("PatientUUID" in cookies || "PatientAccessToken" in cookies) {
    UUID = cookies.PatientUUID
    type = 'Patient'
  }
  const login_history = 'login_history'
  await DB_Operation(fetchLoginHistory.name, login_history);

  try {
    const User_ID = await UUID_to_ID(UUID) // converts DoctorUUID to docid
    const sql = `SELECT Login_at, IP_Address FROM ${login_history} WHERE User_ID = ?`
    const values = [User_ID];
    const [results] = await connection.execute(sql, values);
    return res.status(200).json(results);
  } catch(error) {
    clearCookies(res, type)
    return res.status(401).json({ shouldRedirect: true, redirectURL: '/' })
  }
};

/** logout is self-explanatory
 *  Depending on the type, deletes any cookie called "{type}AccessToken"--> whenever the user navigates to future pages, their token will not be verified (token cleared)
 *  Deletes UUID that was created for user to be able to send data back and forth.
 * @param {*} req Type: doctor or patient
 * @param {Response} res Clears cookie, and informs that "User has been logged out"
 *  DOCUMENTATION LAST UPDATED 6/4/23
 */
export async function logout (req, res) {
  let type;
  try {
    const cookies = req.cookies
    let UUID;
    let newUserUUID;
  
    if ("DoctorUUID" in cookies || "DoctorAccessToken" in cookies) {
      UUID = cookies.DoctorUUID
      type = 'Doctor';
      if ("DoctorNew_User" in cookies) {
        newUserUUID = cookies.DoctorNew_User
      }
    } else if ("PatientUUID" in cookies || "PatientAccessToken" in cookies) {
      UUID = cookies.PatientUUID
      type = 'Patient';
      if ("PatientNew_User" in cookies) {
        newUserUUID = cookies.PatientNew_User
      }
    }
  
    const UUID_reference = 'UUID_reference';
    const sql = `DELETE FROM ${UUID_reference} WHERE UUID = ?`;
    let values = [UUID];
  
    await DB_Operation(logout.name, UUID_reference);
    try {
      if(UUID) await connection.execute(sql, values);
    } catch(error) {
    }

    if (newUserUUID) {
      //If the user is new, they will have an extra cookie. Need to delete that UUID upon logout as well
      values = [newUserUUID]
      await connection.execute(sql, values)
    }
  } catch(error) {
    // return res.status(500).json({ error: `Error in accessing DB` });
  }
  
  try {
    clearCookies(res, type)
    return res.status(200).json({ shouldRedirect: true, redirectURL: '/' }); 
  } catch(error) {
    return res.status(500).json({ error: `Error in logging ${type} out` });
  }
};
