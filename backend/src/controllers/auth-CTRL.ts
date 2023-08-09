import _ from "lodash"
import dotenv from "dotenv"
dotenv.config()
import { Response, Request } from "express"
import jwt from "jsonwebtoken"
import AuthDB from "../db/auth-DB"
import TimeUtils from "../utils/time"
import Hash from "../setup-and-security/hash"
import { loginHistory } from "../utils/account-tracker"
import Cookie from "../utils/cookie-operations"
import { ID_to_UUID, UUID_to_ID } from "../setup-and-security/UUID"

export async function jwtVerify (req: Request, res: Response): Promise<Response> {
  const cookies = req.cookies
  let AccessToken: string
  const response = {
    isValid: false,
    type: ""
  }
  let decodedUUID: string = ""
  let payload: JwtPayload

  if ("DoctorAccessToken" in cookies && "DoctorUUID" in cookies) response.type = "Doctor"
  else if ("PatientAccessToken" in cookies && "PatientUUID" in cookies) response.type = "Patient"
  else {
    Cookie.clearAll(res, undefined)
    return res.status(401).json({ shouldRedirect: true, redirectURL: "/" })
  }

  try {
    let redirectURL: string = "/"
    AccessToken = req.cookies[`${response.type}AccessToken`]
    const JWTKey = response.type === "Patient" ? process.env.PATIENT_JWT_KEY! : process.env.DOCTOR_JWT_KEY!
    payload = jwt.verify(AccessToken, JWTKey) as JwtPayload

    if (typeof payload === "object") {
      if (response.type === "Doctor") decodedUUID = (payload as JwtPayload).DoctorID as string
      else if (response.type === "Patient") decodedUUID = (payload as JwtPayload).PatientID as string
    }
    //If want to implement expiration, do it here
    //if (Date.now() >= decodedUUID.exp * 1000) {
    //   let redirectURL
    //   if (response.type === "Doctor") redirectURL = "/vet-login"
    //   else if (response.type === "Patient") redirectURL = "/patient-login"
    //   Cookie.clearAll(res, undefined)
    //   return res.status(401).json({ shouldRedirect: true, redirectURL: redirectURL })
    // }

    const doesRecordExist = await AuthDB.checkIfUUIDExists(decodedUUID)

    if (doesRecordExist) {
      response.isValid = true
      return res.status(200).json(response)
    } else {
      if (response.type === "Doctor") redirectURL = "/vet-login"
      else if (response.type === "Patient") redirectURL = "/patient-login"
      Cookie.clearAll(res, undefined)
      return res.status(401).json({ shouldRedirect: true, redirectURL: redirectURL })
    }
  } catch (error: unknown) {
    let redirectURL: string = "/"
    if (response.type === "Doctor") redirectURL = "/vet-login"
    else if (response.type === "Patient") redirectURL = "/patient-login"
    Cookie.clearAll(res, undefined)
    return res.status(401).json({ shouldRedirect: true, redirectURL: redirectURL })
  }
}

export async function login (req: Request, res: Response): Promise<Response> {
  const { email, password, loginType } = req.body.loginInformationObject

  if (loginType !== "Doctor" && loginType !== "Patient") return res.status(400).json("Invalid User Type")

  let results: UserIDAndPassword
  let hashedPassword: string

  try {
    results = await AuthDB.retrieveUserIDAndPassword(email, loginType)
    if (_.isEmpty(results)) return res.status(404).json("Username not found!")
    else hashedPassword = results.password
  } catch (error: unknown) {
    return res.status(500).json({ error: "Problem with email selection" })
  }

  let bool: boolean

  try {
    bool = await Hash.checkPassword(password, hashedPassword)
  } catch (error: unknown) {
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

    let token: string
    try {
      token = jwt.sign(payload, JWTKey)
    } catch (error: unknown) {
      return res.status(500).json({ error: "Problem with Signing JWT" })
    }

    await loginHistory(ID)

    Cookie.clearAll(res, loginType)

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

export async function register (req: Request, res: Response): Promise<Response> {
  const {email, password, registerType} = req.body.registerInformationObject

  if (registerType !== "Doctor" && registerType !== "Patient") return res.status(400).json("Invalid User Type")

  let doesAccountExist: boolean
  try {
    doesAccountExist = await AuthDB.checkIfAccountExists(email, registerType)
  } catch (error: unknown) {
    return res.status(500).json({ error: "Problem with existing email search" })
  }

  let hashedPassword: string
  if (doesAccountExist) return res.status(400).json("User already exists!")
  else {
    try {
      hashedPassword = await Hash.hashCredentials(password)
    } catch (error: unknown) {
      return res.status(500).json({ error: "Problem with Password Hashing" })
    }
  }

  const createdAt = TimeUtils.createFormattedDate()

  let UserID: number
  try {
    UserID = await AuthDB.addNewUserCredentials(email, hashedPassword, createdAt, registerType)
  } catch (error: unknown) {
    return res.status(500).json({ error: "Problem with Data Insertion" })
  }

  if (registerType === "Doctor") {
    try {
      await AuthDB.addDoctorSpecificDetails(UserID)
    } catch (error: unknown) {
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
  } catch (error: unknown) {
    return res.status(500).json({ error: "Problem with Signing JWT" })
  }

  const newUserUUID = await ID_to_UUID(UserID)

  await loginHistory(UserID)

  Cookie.clearAll(res, registerType)

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

export async function fetchLoginHistory (req: Request, res: Response): Promise<Response> {
  const cookies = req.cookies
  let UUID: string = ""
  let userType: DoctorOrPatient = "Patient"

  if ("DoctorUUID" in cookies || "DoctorAccessToken" in cookies) {
    UUID = cookies.DoctorUUID
    userType = "Doctor"
  } else if ("PatientUUID" in cookies || "PatientAccessToken" in cookies) {
    UUID = cookies.PatientUUID
    userType = "Patient"
  }

  try {
    const User_ID = await UUID_to_ID(UUID)
    const loginHistoryRecords = await AuthDB.retrieveLoginHistory(User_ID)
    return res.status(200).json(loginHistoryRecords)
  } catch (error: unknown) {
    Cookie.clearAll(res, userType)
    return res.status(401).json({ shouldRedirect: true, redirectURL: "/" })
  }
}

export async function changePassword (req: Request, res: Response): Promise<Response> {
  const {userType, currentPassword, newPassword} = req.body.changePasswordObject
  const cookies = req.cookies
  let UUID: string = ""

  if (userType !== "Doctor" && userType !== "Patient") return res.status(401).json({ shouldRedirect: true, redirectURL: "/" })
  else if (userType === "Doctor") UUID = cookies.DoctorUUID
  else if (userType === "Patient") UUID = cookies.PatientUUID

  let UserID: number
  try {
    UserID = await UUID_to_ID(UUID)
  } catch (error: unknown) {
    return res.status(401).json({ shouldRedirect: true, redirectURL: "/" })
  }

  try {
    const hashedOldPassword = await AuthDB.retrieveUserPassword(UserID)
    const isOldPasswordMatch = await Hash.checkPassword(currentPassword, hashedOldPassword)
    if (!isOldPasswordMatch) return res.status(400).json("Old Password is incorrect")
    else {
      const isSamePassword = await Hash.checkPassword(newPassword, hashedOldPassword)
      if (isSamePassword) return res.status(402).json("New Password cannot be the same as the old password")

      const newHashedPassword = await Hash.hashCredentials(newPassword)
      await AuthDB.updatePassword(newHashedPassword, UserID)
      return res.status(200).json()
    }
  } catch (error: unknown) {
    return res.status(500).json("Errror in changing password")
  }
}

export async function newDoctorConfirmation (req: Request, res: Response): Promise<Response> {
  const doctorPermission = false
  const newDoctorUUID = req.cookies.DoctorNewUser
  const existingDoctorUUID = req.cookies.DoctorUUID

  if (!newDoctorUUID || !existingDoctorUUID) return res.status(400).json(doctorPermission)

  try {
    const doBothUUIDExist = await AuthDB.checkIfUUIDsExist(newDoctorUUID, existingDoctorUUID)
    return res.status(200).json(doBothUUIDExist)
  } catch (error: unknown) {
    return res.status(400).json(doctorPermission)
  }
}

export async function newPatientConfirmation (req: Request, res: Response): Promise<Response> {
  const patientPermission = false
  const newPatientUUID = req.cookies.PatientNewUser
  const existingPatientUUID = req.cookies.PatientUUID

  if (!newPatientUUID || !existingPatientUUID) return res.status(400).json(patientPermission)

  try {
    const doBothUUIDExist = await AuthDB.checkIfUUIDsExist(newPatientUUID, existingPatientUUID)
    return res.status(200).json(doBothUUIDExist)
  } catch (error: unknown) {
    return res.status(400).json(patientPermission)
  }
}

export async function logout (req: Request, res: Response): Promise<Response> {
  let type: DoctorOrPatient = "Patient"
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

  } catch (error: unknown) {
    //Not doing this because it will not clear the cookies in the next try catch block
    // return res.status(500).json({ error: `Error in accessing DB` })
  }

  try {
    Cookie.clearAll(res, type)
    return res.status(200).json()
  } catch (error: unknown) {
    return res.status(500).json({ error: `Error in logging ${type} out` })
  }
}
