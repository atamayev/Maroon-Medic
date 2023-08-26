declare global {
  interface AppointmentObject {
	appointmentPrice: number
	appointmentTimespan: number
	message: string
	InstantBook: boolean
	Service_and_category_list_ID: number
	selectedPetID: number
	AddressesID: number
  }

  interface CalendarData {
	appointmentsID: number
	appointment_date: MysqlTimestamp
	appointment_price: number
	patient_message: string
	appointment_timespan: number
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
	Patient_FirstName: string
	Patient_LastName: string
  }
}

export {}
