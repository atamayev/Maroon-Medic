declare global {
	type DoctorData = {
		firstName: string
		lastName: string
		nvi: number
	}

	type DoctorPersonalData = DoctorData & {
		gender: string
	}

	interface BirthDateInfo {
		firstName: string
		lastName: string
		birthMonth: string
		birthDay: number
		birthYear: number
		gender: string
	}

	interface TimeState {
		startMonth: string
		startYear: string
		endMonth: string
		endYear: string
	}

	interface BaseAddressData {
		addressesId: number
		addressPriority: number
		addressTitle: string
		addressLine1: string
		addressLine2: string
		city: string
		state: string
		zip: string
		country: string
		instantBook: boolean
		addressPublicStatus: boolean
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

	type DoctorConfirmationStatuses = "Pending" | "Approved" | "Denied"

	interface DashboardDataType {
		appointmentsId: number
		doctorConfirmationStatus: DoctorConfirmationStatuses
		categoryName: string
		createdAt: MysqlTimestamp
		serviceName: string
		addressLine1: string
		addressLine2: string
		addressTitle: string
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

	interface LoginHistoryItem {
		loginAt: string
	}

	interface PersonalInfoProps {
		personalInfo: BirthDateInfo
		setPersonalInfo: (personalInfo: BirthDateInfo) => void
	}

	interface AppointmentBookingProps {
		appointmentInformation: AppointmentInformation
		setAppointmentInformation: React.Dispatch<React.SetStateAction<AppointmentInformation>>
	}
}

export {}
