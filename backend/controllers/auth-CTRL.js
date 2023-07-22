import _ from "lodash"
import dotenv from "dotenv"
dotenv.config()
import jwt from "jsonwebtoken"
import AuthDB from "../db/auth-DB.js"
import TimeUtils from "../utils/time.js"
import Hash from "../setup-and-security/hash.js"
import { loginHistory } from "../utils/account-tracker.js"
import { clearCookies } from "../utils/cookie-operations.js"
import { ID_to_UUID, UUID_to_ID } from "../setup-and-security/UUID.js"

/** jwtVerify verifies the user's token (held in cookie).
 *  It does this in two steps. First, it checks if the DoctorAccessToken is valid (verification). If verified, the UUID is extracted from the Access Token. The UUID is then searched in the DB
 *  If the user's UUID is in the UUID_reference table, and the JWT was verified successfully, set isValid to true,
 *  If there is a user's whose credentials match what was verified/queried, set verified to true. Any other case, set verified to false.
 * @param {String} req Cookie from client
 * @param {Boolean} res True/False
 * @returns Returns true/false, depending on wheather the cookie is verified, and if the contents of the cookie are valid
 *  DOCUMENTATION LAST UPDATED 3/14/23
 */
export async function jwtVerify (req, res) {
  const cookies = req.cookies
  let AccessToken
  const response = {
    isValid: false,
    type: ""
  }
  let decodedUUID

  if ("DoctorAccessToken" in cookies && "DoctorUUID" in cookies) response.type = "Doctor"
  else if ("PatientAccessToken" in cookies && "PatientUUID" in cookies) response.type = "Patient"
  else {
    clearCookies(res, undefined)
    return res.status(401).json({ shouldRedirect: true, redirectURL: "/" })
  }

  try {
    AccessToken = req.cookies[`${response.type}AccessToken`]
    const JWTKey = response.type === "Patient" ? process.env.PATIENT_JWT_KEY : process.env.DOCTOR_JWT_KEY
    decodedUUID = jwt.verify(AccessToken, JWTKey)[`${response.type}ID`]

    if (Date.now() >= decodedUUID.exp * 1000) {
      let redirectURL
      if (response.type === "Doctor") redirectURL = "/vet-login"
      else if (response.type === "Patient") redirectURL = "/patient-login"
      clearCookies(res, undefined)
      return res.status(401).json({ shouldRedirect: true, redirectURL: redirectURL })
    } else {
      const doesRecordExist = await AuthDB.checkIfUUIDExists(decodedUUID)

      if (doesRecordExist) {
        response.isValid = true
        return res.status(200).json(response)
      } else {
        let redirectURL
        if (response.type === "Doctor") redirectURL = "/vet-login"
        else if (response.type === "Patient") redirectURL = "/patient-login"
        clearCookies(res, undefined)
        return res.status(401).json({ shouldRedirect: true, redirectURL: redirectURL })
      }
    }
  } catch (error) {
    let redirectURL
    if (response.type === "Doctor") redirectURL = "/vet-login"
    else if (response.type === "Patient") redirectURL = "/patient-login"
    clearCookies(res, undefined)
    return res.status(401).json({ shouldRedirect: true, redirectURL: redirectURL })
  }
}

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
  const { email, password, loginType } = req.body.loginInformationObject

  if (loginType !== "Doctor" && loginType !== "Patient") return res.json("Invalid User Type")

  let results
  let hashedPassword

  try {
    results = await AuthDB.checkIfUsernameExists(email, loginType)
    if (_.isEmpty(results)) return res.status(404).json("Username not found!")
    else hashedPassword = results[0].password
  } catch (error) {
    return res.status(500).json({ error: "Problem with email selection" })
  }

  let bool

  try {
    bool = await Hash.checkPassword(password, hashedPassword)
  } catch (error) {
    return res.status(500).json({ error: "Problem with checking password" })
  }

  if (bool === false) return res.status(400).json("Wrong Username or Password!")
  else {
    const IDKey = `${loginType}ID`
    const ID = results[0].UserID
    const UUID = await ID_to_UUID(ID)

    // const expirationTime = 20 // not using this right now.

    const payload = {
      [IDKey]: UUID,
      // exp: Math.floor(Date.now()/1000) +expirationTime // temporarily taking out expiration to make sure system is running smoothly
    }
    const JWTKey = loginType === "Patient" ? process.env.PATIENT_JWT_KEY : process.env.DOCTOR_JWT_KEY

    let token
    try {
      token = jwt.sign(payload, JWTKey)
    } catch (error) {
      return res.status(500).json({ error: "Problem with Signing JWT" })
    }

    loginHistory(ID)

    clearCookies(res, loginType)

    // const expires = new Date(Date.now() + expirationTime *1000)

    return res
      .cookie(`${loginType}AccessToken`, token, {
        // expires,
        // httpOnly: true,
        // secure:true
      })
      .cookie(`${loginType}UUID`, UUID, {
        // expires,
        // httpOnly: true,
        // secure:true
      })
      .status(200)
      .json()
  }
}

/**
 *  register adds a new user's credentials to the Doctor_credentials table, and sends a JSON response (along with a cookie) back to client depending on the results
 *  Register code is very similar to login. Read login documentation for a more in-depth review
  * First, register checks if the username entered already exists in the table
 *  If exists, then the user is unable to make an account. If doesn't exist, move on
 *  The password is hashed, and a dateTime object is created, before being entered into the credentials table
 *  Depending on the userType, the insert SQL change. If doctor, insert verification status (currently set to true by default).
 *  Verification is wheather the doctor's identity is confirmed (via some ID)
 *  The rest of the code is same as login.
 *  However, an extra newUser cookie is sent during registration. This is done to give the new user permission to certain pages that non-new users shouldn't have access to (new-doctor, patient)
 * @param {Object} req Contains the user's username, password, type
 * @param {Response} res If successful, returns 3 cookies: UUID, newUserUUID, and AccessToken. If not, returns error in a JSON
 * @returns An error, or a json response, depending on wheather the credentials are able to be registered
 *  DOCUMENTATION LAST UPDATED 3/14/23
 */
export async function register (req, res) {
  const {email, password, registerType} = req.body.registerInformationObject

  if (registerType !== "Doctor" && registerType !== "Patient") return res.status(400).json("Invalid User Type")

  let doesAccountExist
  try {
    doesAccountExist = await AuthDB.checkIfAccountExists(email, registerType)
  } catch (error) {
    return res.status(500).json({ error: "Problem with existing email search" })
  }

  let hashedPassword
  if (doesAccountExist) return res.status(400).json("User already exists!")
  else {
    try {
      hashedPassword = await Hash.hashCredentials(password)
    } catch (error) {
      return res.status(500).json({ error: "Problem with Password Hashing" })
    }
  }

  const createdAt = TimeUtils.createFormattedDate()

  let UserID
  try {
    UserID = await AuthDB.addNewUserCredentials(email, hashedPassword, createdAt, registerType)
  } catch (error) {
    return res.status(500).json({ error: "Problem with Data Insertion" })
  }

  if (registerType === "Doctor") {
    try {
      await AuthDB.addDoctorSpecificDetails(UserID)
    } catch (error) {
      return res.status(500).json({ error: "Problem with Data Insertion" })
    }
  }

  const IDKey = `${registerType}ID`
  const UUID = await ID_to_UUID(UserID)

  // const expirationTime = 20 // not using this right now.
  const payload = {
    [IDKey]: UUID,
    // exp: Math.floor(Date.now()/1000) +expirationTime // temporarily taking out expiration to make sure system is running smoothly
  }
  const JWTKey = registerType === "Doctor" ? process.env.DOCTOR_JWT_KEY : process.env.PATIENT_JWT_KEY
  let token
  try {
    token = jwt.sign(payload, JWTKey)
  } catch (error) {
    return res.status(500).json({ error: "Problem with Signing JWT" })
  }

  const newUserUUID = await ID_to_UUID(UserID)

  loginHistory(UserID)

  clearCookies(res, registerType)

  return res
    .cookie(`${registerType}AccessToken`, token, {
      // expires,
      // httpOnly: true,
      // secure:true
    })
    .cookie(`${registerType}UUID`, UUID, {
      // expires,
      // httpOnly: true,
      // secure:true
    })
    .cookie(`${registerType}NewUser`, newUserUUID, {
      // expires,
      // httpOnly: true,
      // secure:true
    })
    .status(200)
    .json()
}

/** fetchLoginHistory is self-explanatory in name
 *  Finds the UUID in the cookies, and returns the login history (all previous logged in times, IP_addresses) from the table
 * @param {*} req Cookies
 * @param {*} res Results, along with a 200/400 status code
 * @returns Login Time and IP Address from the loginHistory table
 *  DOCUMENTATION LAST UPDATED 6/4/23
 */
export async function fetchLoginHistory (req, res) {
  const cookies = req.cookies
  let UUID
  let type

  if ("DoctorUUID" in cookies || "DoctorAccessToken" in cookies) {
    UUID = cookies.DoctorUUID
    type = "Doctor"
  } else if ("PatientUUID" in cookies || "PatientAccessToken" in cookies) {
    UUID = cookies.PatientUUID
    type = "Patient"
  }

  try {
    const User_ID = await UUID_to_ID(UUID)
    const loginHistory = await AuthDB.retrieveLoginHistory(User_ID)
    return res.status(200).json(loginHistory)
  } catch (error) {
    clearCookies(res, type)
    return res.status(401).json({ shouldRedirect: true, redirectURL: "/" })
  }
}

export async function changePassword (req, res) {
  const {userType, currentPassword, newPassword} = req.body.changePasswordObject
  const cookies = req.cookies
  let UUID

  if (userType !== "Doctor" && userType !== "Patient") res.status(401).json({ shouldRedirect: true, redirectURL: "/" })
  else if (userType === "Doctor") UUID = cookies.DoctorUUID
  else if (userType === "Patient") UUID = cookies.PatientUUID

  let UserID
  try {
    UserID = await UUID_to_ID(UUID)
  } catch (error) {
    return res.status(401).json({ shouldRedirect: true, redirectURL: "/" })
  }

  try {
    const hashedOldPassword = await AuthDB.retrieveUserPassword(UserID)
    const isOldPasswordMatch = await Hash.checkPassword(currentPassword, hashedOldPassword)
    if (!isOldPasswordMatch) return res.status(400).json("Old Password is incorrect")
    else {
      const isSamePassword = await Hash.checkPassword(newPassword, hashedOldPassword)
      if (isSamePassword) return res.status(400).json("New Password cannot be the same as the old password")

      const newHashedPassword = await Hash.hashCredentials(newPassword)
      await AuthDB.updatePassword(newHashedPassword, UserID)
      return res.status(200).json()
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json("Errror in changing password")
  }
}

/** newDoctorConfirmation/newPatientConfirmation makes sure that the user on the site is a new Doctor
 *  If newDoctorUUID/newPatientUUID or the regular DoctorUUID/PatientUUID don't exist, returns false.
 *  If both the DoctorUUID/PatientUUID and newDoctorUUID/newPatientUUID exist in DB, then returns true, else returns false.
 * @param {Cookies} req Contains the user's cookies (newUser, and DoctorUUID/PatientUUID)
 * @param {Array} res If the user data is successfully found in the table to table, return true. If not, return false --> front-end re-directs to register page
 * @returns true/false
 * DOCUMENTATION LAST UPDATED 3/16/23
 */
export async function newDoctorConfirmation (req, res) {
  const doctorPermission = false
  const newDoctorUUID = req.cookies.DoctorNewUser
  const existingDoctorUUID = req.cookies.DoctorUUID

  if (!newDoctorUUID || !existingDoctorUUID) return res.json(doctorPermission)

  try {
    const doBothUUIDExist = await AuthDB.checkIfUUIDsExist(newDoctorUUID, existingDoctorUUID)
    return res.json(doBothUUIDExist)
  } catch (error) {
    return res.json(doctorPermission)
  }
}

export async function newPatientConfirmation (req, res) {
  const patientPermission = false
  const newPatientUUID = req.cookies.PatientNewUser
  const existingPatientUUID = req.cookies.PatientUUID

  if (!newPatientUUID || !existingPatientUUID) return res.json(patientPermission)

  try {
    const doBothUUIDExist = await AuthDB.checkIfUUIDsExist(newPatientUUID, existingPatientUUID)
    return res.json(doBothUUIDExist)
  } catch (error) {
    return res.json(patientPermission)
  }
}

/** logout is self-explanatory
 *  Depending on the type, deletes any cookie called "{type}AccessToken"--> whenever the user navigates to future pages, their token will not be verified (token cleared)
 *  Deletes UUID that was created for user to be able to send data back and forth.
 * @param {*} req Type: doctor or patient
 * @param {Response} res Clears cookie, and informs that "User has been logged out"
 *  DOCUMENTATION LAST UPDATED 6/4/23
 */
export async function logout (req, res) {
  let type
  try {
    const cookies = req.cookies
    let UUID
    let newUserUUID

    if ("DoctorUUID" in cookies || "DoctorAccessToken" in cookies) {
      UUID = cookies.DoctorUUID
      type = "Doctor"
      if ("DoctorNewUser" in cookies) newUserUUID = cookies.DoctorNewUser
    } else if ("PatientUUID" in cookies || "PatientAccessToken" in cookies) {
      UUID = cookies.PatientUUID
      type = "Patient"
      if ("PatientNewUser" in cookies) newUserUUID = cookies.PatientNewUser
    }

    if (UUID) await AuthDB.deleteUUIDUponLogout(UUID)

    if (newUserUUID) await AuthDB.deleteUUIDUponLogout(newUserUUID)

  } catch (error) {
    //Not doing this because it will not clear the cookies in the next try catch block
    // return res.status(500).json({ error: `Error in accessing DB` })
  }

  try {
    clearCookies(res, type)
    return res.status(200).json()
  } catch (error) {
    return res.status(500).json({ error: `Error in logging ${type} out` })
  }
}
