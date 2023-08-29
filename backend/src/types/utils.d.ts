declare global {
  type DoctorOrPatient = "Doctor" | "Patient"

  type MysqlTimestamp = string

  interface JwtPayload {
    DoctorID?: string
    PatientID?: string
    exp?: number
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
