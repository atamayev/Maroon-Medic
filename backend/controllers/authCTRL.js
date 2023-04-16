import {connection, useDB} from "../dbAndSecurity/connect.js";
import Crypto from "../dbAndSecurity/crypto.js";
import jwt from "jsonwebtoken";
import moment from 'moment';
import Hash from "../dbAndSecurity/hash.js";
import dotenv from "dotenv";
import { ID_to_UUID } from "../dbAndSecurity/UUID.js";
dotenv.config()

/** JWT_verify verifies the user's token (held in cookie). 
 *  It does this in two steps. First, it checks if the DoctorAccessToken is valid (verification). If verified, the UUID is extracted from the Access Token. The UUID is then searched in the DB
 *  If the user's UUID is in the UUID_reference table, and the JWT was verified successfully, set isValid to true,
 *  If there is a user's whose credentials match what was verified/queried, set verified to true. Any other case, set verified to false.
 * @param {String} req Cookie from client 
 * @param {Boolean} res True/False
 * @returns Returns true/false, depending on wheather the cookie is verified, and if the contents of the cookie are valid
 *  DOCUMENTATION LAST UPDATED 3/14/23
 */
export async function JWT_verify (req, res){
  const cookies = req.cookies;
  let AccessToken;
  let response = {
    isValid: false, 
    type: ''
  };
  let decodedUUID;

  if("DoctorAccessToken" in cookies){
    response.type = 'Doctor';
  }else if("PatientAccessToken" in cookies){
    response.type = 'Patient';
  }else{
    console.log('Invalid User Type in JWT Verify')
    return res.status(400).json('Invalid User Type');
  }

  try{
    AccessToken = req.cookies[`${response.type}AccessToken`]
    const JWTKey = response.type === 'Patient' ? process.env.PATIENT_JWT_KEY : process.env.DOCTOR_JWT_KEY;
    decodedUUID = jwt.verify(AccessToken, JWTKey)[`${response.type}ID`];
  }catch(error){
    if(error.name === "TokenExpiredError"){
      console.log('Token expired', error.name)
      return res.status(402).json(response);
    }else{
      console.log('error in token verification', error);
      return res.status(500).json(response); 
    }
  }

  if (Date.now() >= decodedUUID.exp * 1000) {
    console.log('Token expired', decodedUUID.exp)
    return res.status(401).json(response);
  }else{
    const table_name = `${response.type}UUID_reference`
    const DB_name = `${response.type}DB`;
    const sql = `SELECT * FROM ${table_name} WHERE ${response.type}UUID = ?`;
    const values = [decodedUUID];
    await useDB(JWT_verify.name, DB_name, table_name)
    
    try{
      const [results] = await connection.execute(sql, values)
      if (results.length === 1) {
        response.isValid = true;
        return res.status(200).json(response);
      } else {
        response.isValid = false;
        return res.status(500).json(response);
      }
    }catch(error){
        return (`error in ${JWT_verify.name}:`, error)
    }
  }
};

/** login checks if an existing user's credentials exist in the Doctor_credentials table. If they do, then UUID cookie and KWT sent to client
 *  First, deciphers what kind of user is trying to login based on the login_information object.
 *  The entered email is encrypted, and searched in the DB
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
export async function login (req, res){
  const { email, password, login_type } = req.body.login_information_object;
  let table_name;
  let DB_name;
  if(login_type === 'Doctor' || login_type === 'Patient'){
    table_name = `${login_type}_credentials`;
    DB_name = `${login_type}DB`;
  }else{
    console.log('invalid user')
    return res.send('Invalid User Type') // If Type not Doctor or Patient

  }

  let emailObj = {
    email: email
  };
  let encrypted_email;
  try{
    encrypted_email = Crypto.encrypt_single_entry(emailObj).email
  }catch(error){
    console.log('Problem with Data Encryption')
    return res.status(500).send({ error: 'Problem with Data Encryption' });
  }

  const sql = `SELECT * FROM ${table_name} WHERE email = ?`;
  const values = [encrypted_email];
  
  await useDB(login.name, DB_name, table_name)

  let results;
  let hashed_password;

  try{
    [results] = await connection.execute(sql, values);
    if (!results.length){ 
      // If no users exist with a certain first name, login error
      console.log('Username not found');
      return res.status(404).json("Username not found!");
    }else{
      hashed_password = results[0].password;
    }
  }catch(error){
    console.log('Problem with email selection', error)
    return res.status(500).send({ error: 'Problem with email selection' });
  }

  let bool;

  try{
    bool = await Hash.checkPassword(password, hashed_password)
  }catch(error){
    console.log('Problem with checking password', error)
    return res.status(500).send({ error: 'Problem with checking password' });
  }
  
  if (bool === true) {
    const IDKey = `${login_type}ID`;
    const ID = results[0][IDKey];
    const UUID = await ID_to_UUID(ID, login_type)
    
    const expiration_time = 20; // not using this right now.
    
    const payload = {
      [IDKey]: UUID,
      // exp: Math.floor(Date.now()/1000) +expiration_time // temporarily taking out expiration to make sure system is running smoothly
    }
    const JWTKey = login_type === 'Patient' ? process.env.PATIENT_JWT_KEY : process.env.DOCTOR_JWT_KEY;
    
    let token;
    try{
      token = jwt.sign(payload, JWTKey);
    }catch(error){
      console.log('Problem with Signing JWT', error)
      return res.status(500).send({ error: 'Problem with Signing JWT' });
    }

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
      .json(true);
  }else {
    return res.status(400).json("Wrong Username or Password!");
  }
};

/** 
 *  register adds a new user's credentials to the Doctor_credentials table, and sends a JSON response (along with a cookie) back to client depending on the results
 *  Register code is very similar to login. Read login documentation for a more in-depth review
  * First, register checks if the username entered already exists in the DB
 *  If exists, then the user is unable to make an account. If doesn't exist, move on
 *  The password is hashed, and a dateTime object is created, and encrypted, before being entered into the credentials DB
 *  Depending on the user_type, the insert SQL change. If doctor, insert verification status (currently set to true by default).
 *  Verification is wheather the doctor's identity is confirmed (via some ID)
 *  The rest of the code is same as login.
 *  However, an extra newUser cookie is sent during registration. This is done to give the new user permission to certain pages that non-new users shouldn't have access to (new-doctor, patient)
 * @param {Object} req Contains the user's username, password, type
 * @param {Response} res If successful, returns 3 cookies: UUID, newUserUUID, and AccessToken. If not, returns error in a JSON
 * @returns An error, or a json response, depending on wheather the credentials are able to be registered
 *  DOCUMENTATION LAST UPDATED 3/14/23
 */
export async function register (req, res){
    const {email, password, register_type} = req.body.register_information_object // Takes out the decrypted_email from the request
    let table_name;
    let DB_name;
    if(register_type === 'Doctor' || register_type === 'Patient'){
      table_name = `${register_type}_credentials`;
      DB_name = `${register_type}DB`;
    }else{
      console.log('invalid user')
      return res.send('Invalid User Type') // If Type not Doctor or Patient
    }

    let emailObj = {
      email: email
    };
    let encrypted_email;
    try{
      encrypted_email = Crypto.encrypt_single_entry(emailObj).email
    }catch(error){
      console.log('Problem with Data Encryption')
      return res.status(500).send({ error: 'Problem with Data Encryption' });
    }

    const sql = `SELECT * FROM ${table_name} WHERE email = ?`;
    const values = [encrypted_email];

    await useDB(register.name, DB_name, table_name)

    let results;
    try{
      [results] = await connection.execute(sql, values)
      if (results.length !== 0){
        console.log('User already exists')
        return res.status(400).json("User already exists!");
      }
    }catch(error){
      console.log('Problem with existing email search')
      return res.status(500).send({ error: 'Problem with existing email search' });
    }

    let hashed_password;
    if(!results.length){
      try{
        hashed_password = await Hash.hash_credentials(password)
      }catch(error){
        console.log('Problem with Password Hashing')
        return res.status(500).send({ error: 'Problem with Password Hashing' });
      }
    }

    const date_ob = new Date();
    const format = "YYYY-MM-DD HH:mm:ss"
    const dateTime = moment(date_ob).format(format);
    const dateTimeObj = {
      Created_at: `${dateTime}`
    }
    let encrypted_date_time;
    try{
      encrypted_date_time = Crypto.encrypt_single_entry(dateTimeObj).Created_at
    }catch(error){
      console.log('Problem with Data Encryption')
      return res.status(500).send({ error: 'Problem with Data Encryption' });
    }

    let sql_1
    let values_1;
    if(register_type === 'Doctor'){
      sql_1 = `INSERT INTO ${table_name} (email, password, Created_at, verified, publiclyAvailable) VALUES (?, ?, ?, ?, ?)`;
      values_1 = [encrypted_email, hashed_password, encrypted_date_time, true, true];// in the future, will need to change this. Verified shouldn't be set to true by default, should require some kind of ID verification
    }else if (register_type === 'Patient'){
      sql_1 = `INSERT INTO ${table_name} (email, password, Created_at) VALUES (?, ?, ?)`;
      values_1 = [encrypted_email, hashed_password, encrypted_date_time];// in the future, will need to change this. Verified shouldn't be set to true by default, should require some kind of ID verification
    }else{
      console.log('invalid user')
      return res.send('Invalid User Type') // If Type not Doctor or Patient
    }
    try {
      await connection.execute(sql_1, values_1)
    }catch (error){
      console.log('Problem with Data Insertion')
      return res.status(500).send({ error: 'Problem with Data Insertion' });
    }

    let results_1;
    try{
      [results_1] = await connection.execute(sql, values); // using same query as before, just now with the inserted email - this is to set the user after registering
    }catch(error){
      console.log('Problem with Data Selection')
      return res.status(500).send({ error: 'Problem with Data Selection' });
    }

    const IDKey = `${register_type}ID`;
    const ID = results_1[0][IDKey];
    const UUID = await ID_to_UUID(ID, register_type)

    const expiration_time = 20; // not using this right now.
    const payload = {
      [IDKey]: UUID,
      // exp: Math.floor(Date.now()/1000) +expiration_time // temporarily taking out expiration to make sure system is running smoothly
    }
    const JWTKey = register_type === 'Patient' ? process.env.PATIENT_JWT_KEY : process.env.DOCTOR_JWT_KEY;
    let token;
    try{
      token = jwt.sign(payload, JWTKey);
    }catch(error){
      console.log('error in catching insert')
      return res.status(500).send({ error: 'Problem with Data Selection' });
    }

    const newUser_UUID = await ID_to_UUID(ID, register_type)

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
      .json(true);
};

/** logout is self-explanatory
 *  Depending on the type, deletes any cookie called "{type}AccessToken"--> whenever the user navigates to future pages, their token will not be verified (token cleared)
 *  Deletes UUID that was created for user to be able to send data back and forth.
 * @param {*} req Type: doctor or patient
 * @param {Response} res Clears cookie, and informs that "User has been logged out"
 */
export async function logout (req, res){
  let type;
  try{
    const cookies = req.cookies
    let UUID;
    let newUserUUID;
  
    if("DoctorAccessToken" in cookies){
      UUID = req.cookies.DoctorUUID
      type = 'Doctor';
      if("DoctorNew_User" in cookies){
        newUserUUID = req.cookies.DoctorNew_User
      }
    }else if("PatientAccessToken" in cookies){
      UUID = req.cookies.PatientUUID
      type = 'Patient';
      if("PatientNew_User" in cookies){
        newUserUUID = req.cookies.PatientNew_User
      }
    }
    else{
      console.log('Invalid User Type in logout')
      return res.send('Invalid User Type') // If Type not Doctor or Patient
    }
  
    const table_name = `${type}UUID_reference`;
    const DB_name = `${type}DB`;
    const sql = `DELETE FROM ${table_name} WHERE ${type}UUID = ?`;
    let values = [UUID];
  
    await useDB(logout.name, DB_name, table_name)
    await connection.execute(sql, values)
    if(newUserUUID){
      values = [newUserUUID]
      await connection.execute(sql, values)
    }
  }catch(error){
      console.log('Error in accessing DB', error)
      return res.status(500).send({ error: `Error in accessing DB` });
    }
  
  try{
    res
    .clearCookie(`${type}AccessToken`, {
      httpOnly:true,
      secure:true,
      sameSite:"none",
      path: '/'
    })
    .clearCookie(`${type}UUID`, {
      httpOnly:true,
      secure:true,
      sameSite:"none",
      path: '/'
    })
    .clearCookie(`${type}New_User`, {
      httpOnly:true,
      secure:true,
      sameSite:"none",
      path: '/'
    })
    .status(200).json(`${type} has been logged out.`)
    console.log(`logged out ${type}`)
  }catch (error){
    console.log(`error in logging ${type} out`)
    return res.status(500).send({ error: `Error in logging ${type} out` });
  }
};
