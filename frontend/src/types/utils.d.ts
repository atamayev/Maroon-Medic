/* eslint-disable @typescript-eslint/naming-convention */
declare global {
	type DoctorOrPatient = "Doctor" | "Patient"
	type DoctorOrPatientOrNull = DoctorOrPatient | null
	type DoctorOrPatientOrUndefined = DoctorOrPatient | undefined
	type VetOrPatient = "Vet" | "Patient"
	type doctorOrpatient = "doctor" | "patient"
	type vetOrpatient = "vet" | "patient"

	type MysqlTimestamp = string

	type DeleteStatuses = undefined | "deleting"

	type DeleteStatusesDictionary = {
		[key: number]: DeleteStatuses
	}

	type DayOfWeek = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday"

	type AppointmentStatus = "approved" | "pending" | "confirming" | "denied"

	type ConfirmationMessage = {
		messageType: "saved" | "same" | "problem" | "none" | null,
		timeoutId?: number | null
	}

	type DayIndeces = 0 | 1 | 2 | 3 | 4 | 5 | 6 | null
}

export {}
