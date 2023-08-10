import AuthDB from "src/db/auth-DB"
import jwt from "jsonwebtoken"

export function getUserInfo(cookies: Express.Request["cookies"]): { type: DoctorOrPatient, UUID: string, newUserUUID: string } {
  let type: DoctorOrPatient = "Patient"
  let UUID: string = ""
  let newUserUUID: string = ""

  if ("DoctorUUID" in cookies || "DoctorAccessToken" in cookies) {
    UUID = cookies.DoctorUUID!
    type = "Doctor"
    if ("DoctorNewUser" in cookies) newUserUUID = cookies.DoctorNewUser!
  } else if ("PatientUUID" in cookies || "PatientAccessToken" in cookies) {
    UUID = cookies.PatientUUID!
    type = "Patient"
    if ("PatientNewUser" in cookies) newUserUUID = cookies.PatientNewUser!
  }

  return { type, UUID, newUserUUID }
}

export async function handleLogoutInDB(UUID: string, newUserUUID: string): Promise<void> {
  try {
    if (UUID) await AuthDB.deleteUUIDUponLogout(UUID)
    if (newUserUUID) await AuthDB.deleteUUIDUponLogout(newUserUUID)
  } catch (error: unknown) {
  }
}

export function getUserType(cookies: Express.Request["cookies"]): "Doctor" | "Patient" | undefined {
  if ("DoctorAccessToken" in cookies && "DoctorUUID" in cookies) return "Doctor"
  else if ("PatientAccessToken" in cookies && "PatientUUID" in cookies) return "Patient"
  return undefined
}

export function getDecodedUUID(responseType: string, AccessToken: string): string {
  const JWTKey = responseType === "Patient" ? process.env.PATIENT_JWT_KEY! : process.env.DOCTOR_JWT_KEY!
  const payload = jwt.verify(AccessToken, JWTKey) as JwtPayload

  if (typeof payload === "object") {
    if (responseType === "Doctor") return (payload as JwtPayload).DoctorID as string
    else return (payload as JwtPayload).PatientID as string
  }

  return ""
}

export function validateUserType(type: string): type is "Doctor" | "Patient" {
  return type === "Doctor" || type === "Patient"
}

export function signJWT(payload: object, userType: "Doctor" | "Patient"): string | undefined {
  const JWTKey = userType === "Patient" ? process.env.PATIENT_JWT_KEY! : process.env.DOCTOR_JWT_KEY!
  try {
    return jwt.sign(payload, JWTKey)
  } catch (error: unknown) {
    // Log or handle error if needed
    return undefined
  }
}

