import jwt from "jsonwebtoken"
import Hash from "../setup-and-security/hash"
import AuthDB from "../db/auth-db"

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

export function getDecodedUUID(responseType: string, accessToken: string): string {
	const jwtKey = responseType === "Patient" ? process.env.PATIENT_JWT_KEY! : process.env.DOCTOR_JWT_KEY!
	const payload = jwt.verify(accessToken, jwtKey) as JwtPayload

	if (typeof payload === "object") {
		if (responseType === "Doctor") return (payload as JwtPayload).DoctorId as string
		else return (payload as JwtPayload).PatientId as string
	}

	return ""
}

export function validateUserType(type: string): type is "Doctor" | "Patient" {
	return type === "Doctor" || type === "Patient"
}

export function signJWT(payload: object, userType: "Doctor" | "Patient"): string | undefined {
	const jwtKey = userType === "Patient" ? process.env.PATIENT_JWT_KEY! : process.env.DOCTOR_JWT_KEY!
	try {
		return jwt.sign(payload, jwtKey)
	} catch (error: unknown) {
		// Log or handle error if needed
		return undefined
	}
}

export async function doesAccountExist(
	email: string,
	loginType: DoctorOrPatient
): Promise<{ exists: boolean, accountExistError?: string }> {
	try {
		const exists = await AuthDB.checkIfAccountExists(email, loginType)
		return { exists }
	} catch (error: unknown) {
		return { exists: false, accountExistError: "Problem with existing email search" }
	}
}

export async function hashPassword(password: string): Promise<{ hashedPassword: string, hashError?: string }> {
	try {
		const hashedPassword = await Hash.hashCredentials(password)
		return { hashedPassword }
	} catch (error: unknown) {
		return { hashedPassword: "", hashError: "Problem with hashing password" }
	}
}
