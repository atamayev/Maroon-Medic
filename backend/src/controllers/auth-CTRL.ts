import _ from "lodash"
import dotenv from "dotenv"
dotenv.config()
import { Response, Request } from "express"
import AuthDB from "../db/auth-DB"
import TimeUtils from "../utils/time"
import Hash from "../setup-and-security/hash"
import { loginHistory } from "../utils/account-tracker"
import Cookie from "../utils/cookie-operations"
import { ID_to_UUID, UUID_to_ID } from "../setup-and-security/UUID"
import {
  getUserInfo,
  handleLogoutInDB,
  getUserType,
  getDecodedUUID,
  validateUserType,
  signJWT,
  doesAccountExist,
  hashPassword
} from "../utils/auth-helpers"

export async function jwtVerify(req: Request, res: Response): Promise<Response> {
  const cookies = req.cookies
  const responseType = getUserType(cookies)

  if (!responseType) {
    Cookie.clearAll(res, undefined)
    return res.status(401).json({ shouldRedirect: true, redirectURL: "/" })
  }

  try {
    const AccessToken = req.cookies[`${responseType}AccessToken`]
    const decodedUUID = getDecodedUUID(responseType, AccessToken)
    const doesRecordExist = await AuthDB.checkIfUUIDExists(decodedUUID)

    if (doesRecordExist) {
      return res.status(200).json({ isValid: true, type: responseType })
    }
  } catch (error: unknown) {
    // Log or handle error if needed
  }

  const redirectURL = responseType === "Doctor" ? "/vet-login" : "/patient-login"
  Cookie.clearAll(res, undefined)
  return res.status(401).json({ shouldRedirect: true, redirectURL: redirectURL })
}

export async function login (req: Request, res: Response): Promise<Response> {
  const { email, password, loginType } = req.body.loginInformationObject

  if (!validateUserType(loginType)) return res.status(400).json("Invalid User Type")

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
  const IDKey = `${loginType}ID`
  const UUID = await ID_to_UUID(results.UserID)
  const payload = { [IDKey]: UUID }

  const token = signJWT(payload, loginType)
  if (!token) return res.status(500).json({ error: "Problem with Signing JWT" })

  await loginHistory(results.UserID)

  Cookie.clearAll(res, loginType)

  // const expires = new Date(Date.now() + expirationTime *1000)

  return res
    .cookie(`${loginType}AccessToken`, token)
    .cookie(`${loginType}UUID`, UUID)
    .status(200)
    .json()
}

export async function register (req: Request, res: Response): Promise<Response> {
  const {email, password, loginType } = req.body.registerInformationObject

  if (!validateUserType(loginType)) return res.status(400).json("Invalid User Type")

  const { exists, accountExistError } = await doesAccountExist(email, loginType)
  if (accountExistError) return res.status(500).json({ error: accountExistError })
  else if (exists) return res.status(400).json("Email already exists!")

  const {hashedPassword, hashError} = await hashPassword(password)
  if (hashError) return res.status(500).json({ error: hashError })

  const createdAt = TimeUtils.createFormattedDate()

  let UserID: number
  try {
    UserID = await AuthDB.addNewUserCredentials(email, hashedPassword, createdAt, loginType)
  } catch (error: unknown) {
    return res.status(500).json({ error: "Problem with Data Insertion" })
  }

  if (loginType === "Doctor") {
    try {
      await AuthDB.addDoctorSpecificDetails(UserID)
    } catch (error: unknown) {
      return res.status(500).json({ error: "Problem with Data Insertion" })
    }
  }

  const IDKey = `${loginType}ID`
  const UUID = await ID_to_UUID(UserID)
  const payload = { [IDKey]: UUID }

  const token = signJWT(payload, loginType)
  if (!token) return res.status(500).json({ error: "Problem with Signing JWT" })

  const newUserUUID = await ID_to_UUID(UserID)
  await loginHistory(UserID)

  Cookie.clearAll(res, loginType)

  return res
    .cookie(`${loginType}AccessToken`, token)
    .cookie(`${loginType}UUID`, UUID)
    .cookie(`${loginType}NewUser`, newUserUUID)
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

export async function logout(req: Request, res: Response): Promise<Response> {
  const { type, UUID, newUserUUID } = getUserInfo(req.cookies)

  await handleLogoutInDB(UUID, newUserUUID)

  try {
    Cookie.clearAll(res, type)
    return res.status(200).json()
  } catch (error: unknown) {
    return res.status(500).json({ error: `Error in logging ${type} out` })
  }
}
