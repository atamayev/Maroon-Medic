import _ from "lodash"
import dotenv from "dotenv"
dotenv.config()
import { Response } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"
import AuthDB from "../db/auth-DB"
import TimeUtils from "../utils/time"
import Hash from "../setup-and-security/hash"
import { loginHistory } from "../utils/account-tracker"
import { clearCookies } from "../utils/cookie-operations"
import { ID_to_UUID, UUID_to_ID } from "../setup-and-security/UUID"
import { MaroonAmbiguousRequest, MaroonDoctorRequest, MaroonPatientRequest } from "../express"

export async function jwtVerify (req: MaroonAmbiguousRequest, res: Response): Promise<Response> {
  const cookies = req.cookies
  let AccessToken: string
  const response = {
    isValid: false,
    type: ""
  }
  let decodedUUID: string | any

  if ("DoctorAccessToken" in cookies && "DoctorUUID" in cookies) response.type = "Doctor"
  else if ("PatientAccessToken" in cookies && "PatientUUID" in cookies) response.type = "Patient"
  else {
    clearCookies(res, undefined)
    return res.status(401).json({ shouldRedirect: true, redirectURL: "/" })
  }

  try {
    AccessToken = req.cookies[`${response.type}AccessToken`]
    const JWTKey = response.type === "Patient" ? process.env.PATIENT_JWT_KEY! : process.env.DOCTOR_JWT_KEY!
    decodedUUID = (jwt.verify(AccessToken, JWTKey) as JwtPayload)[`${response.type}ID`]

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
  } catch (error: any) {
    let redirectURL
    if (response.type === "Doctor") redirectURL = "/vet-login"
    else if (response.type === "Patient") redirectURL = "/patient-login"
    clearCookies(res, undefined)
    return res.status(401).json({ shouldRedirect: true, redirectURL: redirectURL })
  }
}

export async function login (req: MaroonAmbiguousRequest, res: Response): Promise<Response> {
  const { email, password, loginType } = req.body.loginInformationObject

  if (loginType !== "Doctor" && loginType !== "Patient") return res.json("Invalid User Type")

  let results
  let hashedPassword

  try {
    results = await AuthDB.retrieveUserIDAndPassword(email, loginType)
    if (_.isEmpty(results)) return res.status(404).json("Username not found!")
    else hashedPassword = results.password
  } catch (error: any) {
    return res.status(500).json({ error: "Problem with email selection" })
  }

  let bool

  try {
    bool = await Hash.checkPassword(password, hashedPassword)
  } catch (error: any) {
    return res.status(500).json({ error: "Problem with checking password" })
  }

  if (bool === false) return res.status(400).json("Wrong Username or Password!")
  else {
    const IDKey = `${loginType}ID`
    const ID = results.UserID
    const UUID = await ID_to_UUID(ID)

    // const expirationTime = 20 // not using this right now.

    const payload = {
      [IDKey]: UUID,
      // exp: Math.floor(Date.now()/1000) +expirationTime // temporarily taking out expiration to make sure system is running smoothly
    }
    const JWTKey = loginType === "Patient" ? process.env.PATIENT_JWT_KEY! : process.env.DOCTOR_JWT_KEY!

    let token
    try {
      token = jwt.sign(payload, JWTKey)
    } catch (error: any) {
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

export async function register (req: MaroonAmbiguousRequest, res: Response): Promise<Response> {
  const {email, password, registerType} = req.body.registerInformationObject

  if (registerType !== "Doctor" && registerType !== "Patient") return res.status(400).json("Invalid User Type")

  let doesAccountExist: boolean
  try {
    doesAccountExist = await AuthDB.checkIfAccountExists(email, registerType)
  } catch (error: any) {
    return res.status(500).json({ error: "Problem with existing email search" })
  }

  let hashedPassword: string
  if (doesAccountExist) return res.status(400).json("User already exists!")
  else {
    try {
      hashedPassword = await Hash.hashCredentials(password)
    } catch (error: any) {
      return res.status(500).json({ error: "Problem with Password Hashing" })
    }
  }

  const createdAt = TimeUtils.createFormattedDate()

  let UserID: number
  try {
    UserID = await AuthDB.addNewUserCredentials(email, hashedPassword, createdAt, registerType)
  } catch (error: any) {
    return res.status(500).json({ error: "Problem with Data Insertion" })
  }

  if (registerType === "Doctor") {
    try {
      await AuthDB.addDoctorSpecificDetails(UserID)
    } catch (error: any) {
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
  const JWTKey = registerType === "Doctor" ? process.env.DOCTOR_JWT_KEY! : process.env.PATIENT_JWT_KEY!
  let token: string
  try {
    token = jwt.sign(payload, JWTKey)
  } catch (error: any) {
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

export async function fetchLoginHistory (req: MaroonAmbiguousRequest, res: Response): Promise<Response> {
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
  } catch (error: any) {
    clearCookies(res, type)
    return res.status(401).json({ shouldRedirect: true, redirectURL: "/" })
  }
}

export async function changePassword (req: MaroonAmbiguousRequest, res: Response): Promise<Response> {
  const {userType, currentPassword, newPassword} = req.body.changePasswordObject
  const cookies = req.cookies
  let UUID

  if (userType !== "Doctor" && userType !== "Patient") res.status(401).json({ shouldRedirect: true, redirectURL: "/" })
  else if (userType === "Doctor") UUID = cookies.DoctorUUID
  else if (userType === "Patient") UUID = cookies.PatientUUID

  let UserID
  try {
    UserID = await UUID_to_ID(UUID)
  } catch (error: any) {
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
  } catch (error: any) {
    return res.status(500).json("Errror in changing password")
  }
}

export async function newDoctorConfirmation (req: MaroonDoctorRequest, res: Response): Promise<Response> {
  const doctorPermission = false
  const newDoctorUUID = req.cookies.DoctorNewUser
  const existingDoctorUUID = req.cookies.DoctorUUID

  if (!newDoctorUUID || !existingDoctorUUID) return res.json(doctorPermission)

  try {
    const doBothUUIDExist = await AuthDB.checkIfUUIDsExist(newDoctorUUID, existingDoctorUUID)
    return res.json(doBothUUIDExist)
  } catch (error: any) {
    return res.json(doctorPermission)
  }
}

export async function newPatientConfirmation (req: MaroonPatientRequest, res: Response): Promise<Response> {
  const patientPermission = false
  const newPatientUUID = req.cookies.PatientNewUser
  const existingPatientUUID = req.cookies.PatientUUID

  if (!newPatientUUID || !existingPatientUUID) return res.json(patientPermission)

  try {
    const doBothUUIDExist = await AuthDB.checkIfUUIDsExist(newPatientUUID, existingPatientUUID)
    return res.json(doBothUUIDExist)
  } catch (error: any) {
    return res.json(patientPermission)
  }
}

export async function logout (req: MaroonAmbiguousRequest, res: Response): Promise<Response> {
  let type: "Doctor" | "Patient"
  try {
    const cookies = req.cookies
    let UUID: string = ""
    let newUserUUID: string = ""

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

  } catch (error: any) {
    //Not doing this because it will not clear the cookies in the next try catch block
    // return res.status(500).json({ error: `Error in accessing DB` })
  }

  try {
    clearCookies(res, type)
    return res.status(200).json()
  } catch (error: any) {
    return res.status(500).json({ error: `Error in logging ${type} out` })
  }
}
