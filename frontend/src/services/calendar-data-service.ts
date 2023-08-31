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
	async makeAppointment(appointmentObject: AppointmentObject) {
		return await http.post("/calendar/make-appointment", {appointmentObject})
	}
	async fillCalendarDetails() {
		return await http.get("/calendar/get-doctor-calendar-details")
	}
	async confirmAppointment(appointmentId: number) {
		return await http.patch("/calendar/confirm-appointment", {appointmentId})
	}
}()
