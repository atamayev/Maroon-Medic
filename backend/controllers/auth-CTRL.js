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
    return res.status(500).json("Errror in changing password")
  }
}

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
