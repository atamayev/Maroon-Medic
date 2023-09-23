declare global {
	interface AppointmentObject {
		appointmentPrice: number
		appointmentTimespan: number
		message: string
		instantBook: boolean
		serviceAndCategoryListId: number
		selectedPetId: number
		addressesId: number
	}

	interface CalendarData {
		appointmentsId: number
		appointmentDate: MysqlTimestamp
		appointmentPrice: number
		patientMessage: string
		appointmentTimespan: number
		doctorConfirmationStatus: boolean
		createdAt: MysqlTimestamp
		categoryName: string
		serviceName: string
		addressTitle: string
		addressLine1: string
		addressLine2: string
		city: string
		state: string
		zip: string
		country: string
		petName: string
		patientFirstName: string
		patientLastName: string
	}
}

export {}
