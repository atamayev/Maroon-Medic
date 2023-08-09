declare global {
  interface DoctorPersonalData {
    FirstName: string
    LastName: string
    Gender: string
    NVI: number
  }

  interface BirthDateInfo {
    FirstName: string,
    LastName: string,
    DOB_month: string,
    DOB_day: number,
    DOB_year: number,
    Gender: string
  }

  interface TimeState {
    startMonth: string
    startYear: string
    endMonth: string
    endYear: string
  }

  interface BaseAddressData {
    addressesID: number
    address_priority: number
    address_title: string
    address_line_1: string
    address_line_2: string
    city: string
    state: string
    zip: string
    country: string
    instant_book: boolean
    address_public_status: boolean
    Phone: string
  }

  type DoctorAddressData = BaseAddressData & {
    times: DoctorAvailability[]
  }

  type DoctorAvailability = {
    Day_of_week: DayOfWeek
    Start_time: string
    End_time: string
  }

  interface DashboardDataType {
    appointmentsID: number
    appointment_date: MysqlTimestamp
    appointment_price: number
    patient_message: string
    Doctor_confirmation_status: boolean
    Created_at: MysqlTimestamp
    Category_name: string
    Service_name: string
    address_title: string
    address_line_1: string
    address_line_2: string
    city: string
    state: string
    zip: string
    country: string
  }

  interface AuthCredentials {
    loginType: DoctorOrPatient
    email: string
    password: string
  }

  interface ChangePasswordObject {
    userType: DoctorOrPatient
    currentPassword: string
    newPassword: string
    newConfirmPassword: string
  }

  type VerifyContextReturnType = Promise<{verified: boolean, userType?: DoctorOrPatient}>

  interface VerifyContextType {
    userVerification: (clearSession: boolean) => VerifyContextReturnType
  }
}

export {}