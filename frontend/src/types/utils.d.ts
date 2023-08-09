declare global {
  type DoctorOrPatient = "Doctor" | "Patient"
  type DoctorOrPatientOrNull = DoctorOrPatient | null
  type VetOrPatient = "Vet" | "Patient"
  type doctorOrpatient = "doctor" | "patient"

  type MysqlTimestamp = string

  type DeleteStatusesType = "deleting" | "initial"

  type DeleteStatusesDictionary = {
    [key: number]: DeleteStatusesType;
  }

  type DeleteButtonDataTypes = LanguageItemType | SpecialtyItemType | PreVetEducationItemType | VetEducationItemType

  type DayOfWeekType = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday"

  type AppointmentStatusType = "approved" | "pending" | "confirming"

  type ConfirmationMessage = {
    messageType: "saved" | "same" | "problem" | "none" | null,
    timeoutId?: number | null
  }
}

export {}
