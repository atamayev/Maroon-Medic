import {connection, useDB} from "../dbAndSecurity/connect.js";
import Crypto from "../dbAndSecurity/crypto.js";
import jwt from "jsonwebtoken";
import moment from 'moment';
import Hash from "../dbAndSecurity/hash.js";
import dotenv from "dotenv";
import { ID_to_UUID } from "../dbAndSecurity/UUID.js";
dotenv.config()

/** jwt_verify verifies the user's token (held in cookie). 
 *  It does this in two steps. First, it checks if the DoctorAccessToken is valid (verification). If verified, the ID is extracted from the access token. The ID is then searched in the DB
 *  If there is a user's whose credentials match what was verified/queried, set verified to true. Any other case, set verified to false.
 * @param {String} req Cookie from client 
 * @param {Boolean} res True/False
 * @returns Returns true/false, depending on wheather the cookie is verified, and if the contents of the cookie are valid
 */
export async function jwt_verify (req, res){
  const cookies = req.cookies
  let AccessToken;
  let response = {
    isValid: false, 
    tokenValue: '',
    type: ''
  }
  let decodedID;

  if("DoctorAccessToken" in cookies){
    response.type = 'Doctor';
  }else if("PatientAccessToken" in cookies){
    response.type = 'Patient';
  }
  else{
    return res.send('Invalid User Type') // If Type not Doctor or Patient
  }
  console.log('Type in jwt_verify', response.type)

  try{
    AccessToken = req.cookies[`${response.type}AccessToken`]
    const JWTKey = response.type === 'Patient' ? process.env.PATIENT_JWT_KEY : process.env.DOCTOR_JWT_KEY;
    console.log('AccessToken',AccessToken)
    decodedID = jwt.verify(AccessToken, JWTKey)[`${response.type}ID`];
    if (Date.now() >= decodedID.exp * 1000) {
      return res.status(401).json({ error: "Token expired" });
    }
  }catch(error){
    if(error.name === "TokenExpiredError"){
      return res.status(401).json({ error: "Token expired" });
    }else{
      console.log('error in token verification', error);
      return res.status(500).json(error); 
    }
  }

  const table_name = `${response.type}_credentials`;
  const DB_name = `${response.type}DB`;
  const sql = `SELECT * FROM ${table_name} WHERE ${response.type}ID = ?`;
  const values = [decodedID];

  await useDB(jwt_verify.name, DB_name, table_name);

  try{
    const [results] = await connection.execute(sql, values)
    // console.log('results',results)
    if(results.length === 1){
      response.isValid = true;
      response.tokenValue = AccessToken;
      return res.status(200).json(response);
    }else{
      console.log('Invalid Token')
      return res.status(500).json(error);     
    }
  }catch(error){
    // Any problems with the query: return false
    console.log('trouble with db query', error)
    return res.status(500).json(error);
  }
}

/** login checks if an existing user's credentials exist in the Doctor_credentials table. If they do, then a cookie, and user data is sent to client.
 *  Works very similarly to register function. First, searches if the entered username exists in the DB. If exists, continue. If not, return no user found
 *  Next, uses Hash file to compare the user's entered password with the hashed password in the DB. If compare==true, continue. If not, return Wrong Username or Password
 *  Next, extracts the DoctorID from the select query, and passes it in to the payload (to be signed, and verified in the future), which is put into the cookie.
 *  The other user data (password, created), is packaged in the JSON part of response (needs to be changed to only send back the UUID).
 * @param {Object} req Contains the user's username, password
 * @param {Response} res If successful, contains a cookie, and JSON with user's results. If not, returns error in a JSON
 * @returns An error, or a json response, depending on wheather the credentials exist in the DB
 */
export async function login (req, res){
  const { email, password, login_type } = req.body;
  let table_name;
  let DB_name;
  if(login_type === 'Doctor' || login_type === 'Patient'){
    table_name = `${login_type}_credentials`;
    DB_name = `${login_type}DB`;
  }else{
    console.log('invalid user')
    return res.send('Invalid User Type') // If Type not Doctor or Patient

  }
  const sql = `SELECT * FROM ${table_name} WHERE email = ?`;
  const values = [email];
  
  await useDB(login.name, DB_name, table_name)

  try{
    const [results] = await connection.execute(sql, values);

    if (!results.length){ 
      // If no users exist with a certain first name, login error
      return res.status(404).json("Username not found!");
    }
    else{
      try{
        const hashed_password = results[0].password;
        const bool = await Hash.checkPassword(password, hashed_password)
        if (bool === true) {
          const IDKey = `${login_type}ID`;
          const ID = results[0][IDKey];
          
          const expiration_time = 20; // not using this right now.
          
          const payload = {
            [IDKey]: ID,
            // exp: Math.floor(Date.now()/1000) +expiration_time // temporarily taking out expiration to make sure system is running smoothly
          }
          const JWTKey = login_type === 'Patient' ? process.env.PATIENT_JWT_KEY : process.env.DOCTOR_JWT_KEY;

          const token = jwt.sign(payload, JWTKey);

          const UUID = await ID_to_UUID(ID, login_type)
          // console.log('UUID', UUID)
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
            .json('login success');
        }else {
          return res.status(400).json("Wrong Username or Password!");
        }
      }catch(error){
        res.status(500).send({ error: 'Problem with checking password, or signing password, or ID to UUID' });
      }
    }
  }catch(error){
    res.status(500).send({ error: 'Problem with email selection' });
  }
};

/** register adds a new user's credentials to the Doctor_credentials table, and sends a JSON response (along with a cookie) back to client depending on the results
 *  First, register checks if the username entered already exists in the DB
 *  If exists, then the user is unable to make an account. If doesn't exist, move on
 *  The password is hashed, and a dateTime object is created, and encrypted, before being entered into the credentials DB (username is not encrypted/hashed)
 *  Then, the DoctorID of this new user is passed into the cookie as the DoctorAccessToken, to check the user's identity in the future (see jwt_verify function)
 *  The JSON object is (currently) set to all of the information about the Doc (password, created at), and sent to client. This needs to be changed  
 * @param {Object} req Contains the user's username, password
 * @param {Response} res If successful, contains a cookie, and Json with user's results. If not, returns error in a JSON
 * @returns An error, or a json response, depending on wheather the credentials are able to be registered
 */
export async function register (req, res){
    const {email, password, register_type} = req.body // Takes out the decrypted_email from the request
    let table_name;
    let DB_name;
    if(register_type === 'Doctor' || register_type === 'Patient'){
      console.log(`${register_type} type in register`)
      table_name = `${register_type}_credentials`;
      DB_name = `${register_type}DB`;
    }else{
      console.log('invalid user')
      return res.send('Invalid User Type') // If Type not Doctor or Patient
    }  
    const sql = `SELECT * FROM ${table_name} WHERE email = ?`;
    const values = [email];
    await useDB(register.name, DB_name, table_name)

    try{
      const [results] = await connection.execute(sql, values)
      
      if (results.length === 0){
        const hashed_password = await Hash.hash_credentials(password)

        const date_ob = new Date();
        const format = "YYYY-MM-DD HH:mm:ss"
        const dateTime = moment(date_ob).format(format);
        const dateTimeObj = {
          Created_at: `${dateTime}`
        }
        const encrypted_date_time = Crypto.encrypt_single_entry(dateTimeObj).Created_at
        
        const sql = `INSERT INTO ${table_name} (email, password, Created_at) VALUES (?, ?, ?)`;
        const values = [email, hashed_password, encrypted_date_time];
        
          try {await connection.execute(sql, values)} // Insert Query}
          catch (error){
            console.log('error in catching insert')
            res.status(500).send({ error: 'Error saving data' });
          }
        // After making an account, need to set the token to be the current user. 
          try{
            const sql_new = `SELECT * FROM ${table_name} WHERE email = ?`;
            const values_new = [email]

            const [results] = await connection.execute(sql_new, values_new);
            
            const IDKey = `${register_type}ID`;
            const ID = results[0][IDKey];
            const expiration_time = 20; // not using this right now.
          
            const payload = {
              [IDKey]: ID,
              // exp: Math.floor(Date.now()/1000) +expiration_time // temporarily taking out expiration to make sure system is running smoothly
            }
            const JWTKey = register_type === 'Patient' ? process.env.PATIENT_JWT_KEY : process.env.DOCTOR_JWT_KEY;
  
            const token = jwt.sign(payload, JWTKey);
  
            const UUID = await ID_to_UUID(ID, register_type)
            // console.log('UUID', UUID)
            // const expires = new Date(Date.now() + expiration_time *1000)
  
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
              .status(200)
              .json('login success');
          }

          //old:
          //   if(register_type === 'Doctor'){
          //     const { DoctorID } = results[0];

          //     const payload = {
          //       DoctorID
          //     }
          //     const token = jwt.sign(payload, process.env.DOCTOR_JWT_KEY); // Expiration time goes in here if needed

          //     // const UUID = ID_to_UUID(results[0].DoctorID)
          //     const DoctorUUID = await ID_to_UUID(DoctorID, register_type)
          //     // console.log('DoctorUUID', DoctorUUID)

          //     return res
          //     .cookie("DoctorAccessToken", token, {
          //       // httpOnly: true,
          //       // secure:true
          //     })
          //     .cookie("DoctorUUID", DoctorUUID, {
          //       // httpOnly: true,
          //       // secure:true
          //     })
          //     .status(200)
          //     .json('login success');
          //   }else if(register_type === 'Patient'){
          //     const { PatientID } = results[0];

          //     const payload = {
          //       PatientID
          //     }
          //     const token = jwt.sign(payload, process.env.PATIENT_JWT_KEY); // Expiration time goes in here if needed
              
          //     // const UUID = ID_to_UUID(results[0].DoctorID)
          //     const PatientUUID = await ID_to_UUID(PatientID, register_type)
          //     // console.log('DoctorUUID', DoctorUUID)

          //     return res
          //     .cookie("PatientAccessToken", token, {
          //       // httpOnly: true,
          //       // secure:true
          //     })
          //     .cookie("PatientUUID", PatientUUID, {
          //       // httpOnly: true,
          //       // secure:true
          //     })
          //     .status(200)
          //     .json('login success');
          //   }else{
          //     return res.send('Invalid User Type') // If Type not Doctor or Patient
          //   }
          // }
          catch(error){
            console.log('error in patient/doctor registration')
            res.status(500).send({ error: 'Error Selecting email' });
          }
      }
      else {
        console.log('User already exists')
        return res.status(400).json("User already exists!");// results.length is >0 --> user already exists
      }
    }
    catch(err){
      console.log('in registration error')
      res.status(500).send({ error: 'Problem with existing email search' });
    };
}

/** logout is self-explanatory
 *  Depending on the type, deletes any cookie called "{type}AccessToken"--> whenever the user navigates to future pages, their token will not be verified (token cleared)
 * @param {*} req Type: doctor or patient
 * @param {Response} res Clears cookie, and informs that "User has been logged out"
 */
export async function logout (req, res){
  try{
    const cookies = req.cookies
    let UUID;
    let type;
  
    if("DoctorAccessToken" in cookies){
      UUID = req.cookies.DoctorUUID
      type = 'Doctor';
      console.log(`Type ${type}`)
    }else if("PatientAccessToken" in cookies){
      UUID = req.cookies.PatientUUID
      type = 'Patient';
      console.log(`Type ${type}`)
    }
    else{
      return res.send('Invalid User Type') // If Type not Doctor or Patient
    }
  
    const table_name = `${type}UUID_reference`;
    const DB_name = `${type}DB`;
    const sql = `DELETE FROM ${table_name} WHERE ${type}UUID = ?`;
    const values = [UUID];
  
    await useDB(logout.name, DB_name, table_name)
  
    try{
      await connection.execute(sql, values)
      res
      .clearCookie(`${type}AccessToken`,{
        httpOnly:true,
        secure:true,
        sameSite:"none",
        path: '/'
      })
      .clearCookie(`${type}UUID`,{
        httpOnly:true,
        secure:true,
        sameSite:"none",
        path: '/'
      })
      .status(200).json(`${type} has been logged out.`)
      console.log(`logged out ${type}`)
    }catch (error){
      console.log(`error in logging ${type} out`)
      res.status(500).send({ error: `Error in logging ${type} out` });
    }
  }catch(error){
    res.status(500).send({ error: `Error in accessing DB` });
  }
};
