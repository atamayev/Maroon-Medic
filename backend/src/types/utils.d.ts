declare global {
  type DoctorOrPatient = "Doctor" | "Patient"

  type MysqlTimestamp = string

  interface JwtPayload {
    DoctorID?: string
    PatientID?: string
    exp?: number
  }

  type UserIDAndPassword = {
    UserID: number
    password: string
  }

  interface FormattedPersonalData {
    FirstName: string
    LastName: string
    Gender: string
    DOB_month: string
    DOB_day: number
    DOB_year: number
  }
}

export {}
