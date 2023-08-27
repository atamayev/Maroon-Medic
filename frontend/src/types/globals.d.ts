declare global {
  interface DoctorPersonalData {
	FirstName: string
	LastName: string
	gender: string
	NVI: number
  }

  interface DoctorData {
	FirstName: string
	LastName: string
	NVI: number
  }

  interface BirthDateInfo {
	FirstName: string,
	LastName: string,
	birthMonth: string,
	birthDay: number,
	birthYear: number,
	gender: string
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
	phone: string
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
	doctor_confirmation_status: boolean
	Category_name: string
	created_at: MysqlTimestamp
	Service_name: string
	address_line_1: string
	address_line_2: string
	address_title: string
	appointment_date: MysqlTimestamp
	appointment_price: number
	appointment_timespan: number
	city: string
	patient_message: string
	state: string
	country: string
	zip: string
	petName: string
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

  interface LoginHistoryItem {
	Login_at: string
  }

  interface PersonalInfoProps {
	personalInfo: BirthDateInfo,
	setPersonalInfo: (personalInfo: BirthDateInfo) => void
  }

  interface AppointmentBookingProps {
	appointmentInformation: AppointmentInformation
	setAppointmentInformation: React.Dispatch<React.SetStateAction<AppointmentInformation>>
  }
}

export {}
