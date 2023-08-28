declare global {
  interface AppointmentObject {
	appointmentPrice: number
	appointmentTimespan: number
	message: string
	instantBook: boolean
	serviceAndCategoryListID: number
	selectedPetID: number
	addressesID: number
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
	address_title: string
	address_line_1: string
	address_line_2: string
	city: string
	state: string
	zip: string
	country: string
	petName: string
	Patient_FirstName: string
	Patient_LastName: string
  }
}

export {}
