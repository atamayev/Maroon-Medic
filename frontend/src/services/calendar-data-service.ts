import http from "../http-common"

interface AppointmentObject {
	serviceAndCategoryListId: number
	appointmentDate: string
	appointmentTime: string
	appointmentTimespan: number
	appointmentPrice: number
	nvi: number
	addressesId: number
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
