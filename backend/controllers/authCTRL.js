import {connection, useDB} from "../dbAndSecurity/connect.js";
import Crypto from "../dbAndSecurity/crypto.js";
import jwt from "jsonwebtoken";
import moment from 'moment';
import Hash from "../dbAndSecurity/hash.js";
import dotenv from "dotenv";
import { ID_to_UUID, UUID_Join } from "../dbAndSecurity/UUID.js";
dotenv.config()

/** jwt_verify verifies the user's token. 
 *  It does this in two steps. First, it checks if the accessToken is valid (verification). If verified, the ID is extracted from the access token. The ID is then searched in the DB
 *  If there is a user's whose credentials match what was verified/queried, set verified to true. Any other case, set verified to false.
 * @param {string} req Cookie from client 
 * @param {Boolean} res True/False
 * @returns Returns true/false, depending on wheather the cookie is verified, and if the contents of the cookie are valid
 */
export async function jwt_verify (req, res){
  // refer to: https://github.com/SalarC123/Classius/blob/main/src/server/router.js
  //: https://dev.to/salarc123/mern-stack-authentication-tutorial-part-1-the-backend-1c57
      try{
        const accessToken = req.cookies.accessToken
        const decodedDoctorID = jwt.verify(accessToken, process.env.JWT_KEY).DoctorID;

        const table_name = 'Doctor_credentials';
        const DB_name = 'DoctorDB';

        const sql = `SELECT * FROM ${table_name} WHERE DoctorID = ?`;
        const values = [decodedDoctorID];
        
        await useDB(jwt_verify.name, DB_name, `${table_name}`)
        // Searches the Doctor_credentials for the decodedDoctorID

        try{const [rows] = await connection.execute(sql, values)
          if (!rows.length){
            //If there are no doctors with the decodedDoctorID, return false
            return res.status(401).json({success: false})
          }
          else{
            // If there is a doc with the decodedDoctorID, return true
            console.log('true')
            return res.status(200).json({success: true})
          };
        }
        catch(error){
          // Any problems with the query: return false
          console.log('trouble with db query', error)
          return res.status(401).json({success: false})
        }
      }
      catch(error){
        // If token verification fails
        console.log('error in token verification', error);
        return res.status(401).json({success: false})
      }
  }

/** register adds a new user's credentials to the Doctor_credentials table, and sends a 
 *  First, register checks if the 
 * @param {Object} req Contains the user's username, password
 * @param {Response} res If successful, contains a cookie, and Json with user's results
 * @returns Depending on wheather 
 */
// ENCRYPTION IMPLEMENTED Saves REGISTER data to the db (signs up user):
export async function register (req, res){
    const {email, password} = req.body // Takes out the decrypted_email from the request
    const table_name = 'Doctor_credentials' // Establishes which table to query
    const DB_name = 'DoctorDB'
  
    const sql = `SELECT * FROM ${table_name} WHERE email = ?`;
    const values = [email];
    await useDB(register.name, DB_name, `${table_name}`)

    try{const [results] = await connection.execute(sql, values)
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
        const values = [email, hashed_password, encrypted_date_time ]; // Change to be decrypted email. 
        
          try {await connection.execute(sql, values)} // Insert Query}
          catch (error){
            res.status(500).send({ error: 'Error saving data' });
          }
        // After making an account, need to set the token to be the current user. 
          try{
            const sql_new = `SELECT * FROM ${table_name} WHERE email = ?`;
            const values_new = [email]
            
            const [results] = await connection.execute(sql_new, values_new);
            // console.log('results',results)

            const payload = {
              DoctorID: results[0].DoctorID, 
            }
            const token = jwt.sign(payload, process.env.JWT_KEY); // Expiration time goes in here if needed

            const { pass, ...others } = results[0];
            // const UUID = ID_to_UUID(results[0].DoctorID)

            return res
              .cookie("accessToken", token, {
                // httpOnly: true,
                // secure:true
              })
              .status(200)
              .json(others);
          }
          catch(error){
            res.status(500).send({ error: 'Error Selecting email' });
          }
      }
      else {
        return res.status(400).json("User already exists!");// results.length is >0 --> user already exists
      }
    }
    catch(err){
      res.status(500).send({ error: 'Problem with existing email search' });
    }; // Checks for the existance of a record with the user's input email
}

export async function login (req, res){
  const { email, password } = req.body;

  const table_name = 'Doctor_credentials';
  const DB_name = 'DoctorDB';

  const sql = `SELECT * FROM ${table_name} WHERE email = ?`;
  const values = [email];
  
  await useDB(login.name, DB_name, `${table_name}`)

  // Queries the above SQL with values. If credentials exist in the DB, success:true, if not, false
  try{
    const [results] = await connection.execute(sql, values);

    if (!results.length){ // If no users exist with a certain first name, login error
      return res.status(404).json("User not found!");
    }
    try{
      const hashed_password = results[0].password;
      const bool = await Hash.checkPassword(password, hashed_password)
      if (bool === true) {
        // The following is to 'remember' the user is signed in through cookies          
        const { DoctorID, password, email, ...others } = results[0];

        const payload = {
          DoctorID
        }
        const token = jwt.sign(payload, process.env.JWT_KEY);
        const { pass, ...others1 } = results[0];

        // const UUID = ID_to_UUID(DoctorID)


        return res
          .cookie("accessToken", token, {
            // httpOnly: true,
            // secure:true
          })
          .status(200)
          .json(others1);
      // }   
  } else {
      return res.status(400).json("Wrong password or username!");
  }
    }
    catch(error){
      res.status(500).send({ error: 'Problem with checking password' });
    }
  }catch(error){
    res.status(500).send({ error: 'Problem with email selection' });
  }
}
/** logout is self-explanatory
 *  Deletes any cookie called "accessToken"--> whenever the user navigates to future pages, their token will not be verified (token cleared)
 * @param {n/a} req No request
 * @param {Response} res Clears cookie, and informs that "User has been logged out"
 */
// Clears Cookies --> logs user out
export async function logout (req, res){
  console.log('logged out')
  res.clearCookie("accessToken",{
    httpOnly:true,
    secure:true,
    sameSite:"none",
    path: '/'
  }).status(200).json("User has been logged out.")
};
