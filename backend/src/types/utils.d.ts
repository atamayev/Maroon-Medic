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
    gender: string
    birthMonth: string
    birthDay: number
    birthYear: number
  }
}

export {}
