import http from "../http-common"

interface AppointmentObject {
  Service_and_category_list_ID: number
  appointmentDate: string
  appointmentTime: string
  appointmentTimespan: number
  appointmentPrice: number
  nvi: number
  AddressesID: number
  InstantBook: boolean
  message: string
  selectedPetId: number
}

export default new class CalendarDataService {
	async makeAppointment(AppointmentObject: AppointmentObject) {
		return await http.post("/calendar/make-appointment", {AppointmentObject})
	}
	async fillCalendarDetails() {
		return await http.get("/calendar/get-doctor-calendar-details")
	}
	async confirmAppointment(AppointmentID: number) {
		return await http.patch("/calendar/confirm-appointment", {AppointmentID})
	}
}()
