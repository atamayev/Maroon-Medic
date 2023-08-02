declare global {
  type PersonalDataType = {
    FirstName: string
    LastName: string
    Gender: string
    NVI: number
  }

  type PersonalInfoType = {
    FirstName: string,
    LastName: string,
    DOB_month: string,
    DOB_day: number,
    DOB_year: number,
    Gender: string
  }

  type TimeStateType = {
    startMonth: string
    startYear: string
    endMonth: string
    endYear: string
  }

  type DoctorAddressDataType = {
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
    phones: PhoneDataType[]
    times: AvailabilityDataType[]
  }

  type PhoneDataType = {
    Phone: string
  }

  type AvailabilityDataType = {
    Day_of_week: DayOfWeekType
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

  interface LoginAndRegisterInformationType {
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
}

export {}
