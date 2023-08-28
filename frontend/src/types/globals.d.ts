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
	instantBook: boolean
	address_public_status: boolean
	phone: string
  }

  type DoctorAddressData = BaseAddressData & {
	times: DoctorAvailability[]
  }

  type DoctorAvailability = {
	dayOfWeek: DayOfWeek
	startTime: string
	endTime: string
  }

  interface DashboardDataType {
	appointmentsId: number
	doctorConfirmationStatus: boolean
	categoryName: string
	createdAt: MysqlTimestamp
	serviceName: string
	address_line_1: string
	address_line_2: string
	address_title: string
	appointmentDate: MysqlTimestamp
	appointmentPrice: number
	appointmentTimespan: number
	city: string
	patientMessage: string
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
	loginAt: string
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
