import {connection, useDB} from "../dbAndSecurity/connect.js";
import Crypto from "../dbAndSecurity/crypto.js";
import jwt from "jsonwebtoken";
import moment from 'moment';
import Hash from "../dbAndSecurity/hash.js";
import dotenv from "dotenv";
import { ID_to_UUID, UUID_Join } from "../dbAndSecurity/UUID.js";
dotenv.config()

export async function jwt_verify (req, res){
  const accessToken = req.cookies.accessToken
  // console.log(accessToken.cookies.accessToken)
  // refer to: https://github.com/SalarC123/Classius/blob/main/src/server/router.js
  //: https://dev.to/salarc123/mern-stack-authentication-tutorial-part-1-the-backend-1c57
    if(accessToken){
      try{// tries to verify the token
        console.log('test')
        const decodedDoctorID = jwt.verify(accessToken, process.env.JWT_KEY).DoctorID;

        // search the doc credetials table for ids with the decoded doctor id, if exists, true, if not, false
        const table_name = 'Doctor_credentials';
        const DB_name = 'DoctorDB';

        const sql = `SELECT * FROM ${table_name} WHERE DoctorID = ?`;
        const values = [decodedDoctorID];
        
        await useDB(jwt_verify.name, DB_name, `${table_name}`)

        // Queries the above SQL with values. If credentials exist in the DB
        try{const [rows] = await connection.execute(sql, values)
          // console.log(rows)
          if (!rows.length){
            //if there are no docs with the docID that the user is logging in with, return false
            return res.status(401).json({success: false})
          }
          else{
            // if a doc with the provided credentials exists, return true
            console.log('true')
            return res.status(200).json({success: true})
          };
        }
        catch(error){
          // if there is a problem with the db query, return false
          console.log('trouble with db query', error)
          return res.status(401).json({success: false})
        }
      }
      catch(error){// if token verification fails
        console.log('error in token verification');
        return res.status(401).json({success: false})
      }
  }
    else{
      // if there was no token provided 
      console.log('no token provided')
      return res.status(401).json({success: false})
    }
}


// ENCRYPTION IMPLEMENTED Saves REGISTER data to the db (signs up user):
export async function register (req, res){
    const {email, password} = req.body // Takes out the decrypted_email from the request
    const table_name = 'Doctor_credentials' // Establishes which table to query
    const DB_name = 'DoctorDB'
    const date_ob = new Date(); // Making the DATETIME an accessible object:
    const format = "YYYY-MM-DD HH:mm:ss"
    const dateTime = moment(date_ob).format(format);
    const dateTimeObj = {
      Created_at: `${dateTime}`
    }
    const sql = `SELECT * FROM ${table_name} WHERE email = ?`;
    const values = [email];
    await useDB(register.name, DB_name, `${table_name}`)

    try{const [results] = await connection.execute(sql, values)
      if (results.length === 0){
        const hashed_password = await Hash.hash_credentials(password)
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
            console.log('results',results)

            const payload = {
              DoctorID: results[0].DoctorID, 
            }
            const token = jwt.sign(payload, process.env.JWT_KEY); // Expiration time goes in here if needed

            const { pass, ...others } = results[0];
            const UUID = ID_to_UUID(results[0].DoctorID)

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
        const UUID = ID_to_UUID(DoctorID)

        const payload = {
          DoctorID
        }
        const token = jwt.sign(payload, process.env.JWT_KEY);


        return res
          // .send({ success: true  })
          .cookie("accessToken", token, {
            // httpOnly: true,
            // secure:true
          })
          .status(200)
          .json(DoctorID);
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
