import jwt from "jsonwebtoken"
import Hash from "../setup-and-security/hash"
import AuthDB from "../db/auth-db"

export async function handleLogoutInDB(UUID: string): Promise<void> {
	try {
		if (UUID) await AuthDB.deleteUUIDUponLogout(UUID)
	} catch (error: unknown) {
	}
}

export function getDecodedUUID(responseType: string, accessToken: string): string | undefined {
	let jwtKey
	if (responseType === "Patient") jwtKey = process.env.PATIENT_JWT_KEY
	else jwtKey = process.env.DOCTOR_JWT_KEY
	let payload: JwtPayload | string = ""

	try {
		payload = jwt.verify(accessToken, jwtKey) as JwtPayload
	} catch (error) {
	}

	if (typeof payload === "object") {
		if (responseType === "Doctor") return (payload).DoctorUUID
		else return (payload).PatientUUID
	}

	return ""
}

export function getDecodedNewUser(responseType: string, accessToken: string): boolean {
	const jwtKey = responseType === "Patient" ? process.env.PATIENT_JWT_KEY : process.env.DOCTOR_JWT_KEY
	const payload = jwt.verify(accessToken, jwtKey) as JwtPayload

	if (typeof payload === "object") {
		return (payload as JwtPayload).newUser as boolean
	}

	return false
}

export function validateUserType(type: string): type is "Doctor" | "Patient" {
	return type === "Doctor" || type === "Patient"
}

export function signJWT(payload: object, userType: "Doctor" | "Patient"): string | undefined {
	const jwtKey = userType === "Patient" ? process.env.PATIENT_JWT_KEY : process.env.DOCTOR_JWT_KEY
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
