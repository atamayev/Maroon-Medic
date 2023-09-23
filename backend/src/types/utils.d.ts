declare global {
	type DoctorOrPatient = "Doctor" | "Patient"
	type DoctorOrPatientOrUndefined = DoctorOrPatient | undefined

	type MysqlTimestamp = string

	interface JwtPayload {
		DoctorUUID?: string
		PatientUUID?: string
		exp?: number
		newUser?: boolean
	}

	type UserIdAndPassword = {
		userId: number
		password: string
	}

	interface FormattedPersonalData {
		firstName: string
		lastName: string
		gender: string
		birthMonth: string
		birthDay: number
		birthYear: number
	}
}

export {}
