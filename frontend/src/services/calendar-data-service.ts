import { AxiosResponse } from "axios"
import http from "../http-common"

interface AppointmentObject {
	serviceAndCategoryListId: number
	appointmentDate: string
	appointmentTime: string
	appointmentTimespan: number
	appointmentPrice: number
	nvi: number
	addressesId: number
	instantBook: boolean
	message: string
	selectedPetId: number
}

export default new class CalendarDataService {
	async makeAppointment(appointmentObject: AppointmentObject): Promise<AxiosResponse<EmptyResponse>> {
		return await http.post<EmptyResponse>("/calendar/make-appointment", {appointmentObject})
	}
	async fillCalendarDetails(): Promise<AxiosResponse<DoctorDashboardData[]>> {
		return await http.get<DoctorDashboardData[]>("/calendar/get-doctor-calendar-details")
	}
	async confirmAppointment(appointmentId: number): Promise<AxiosResponse<EmptyResponse>> {
		return await http.patch<EmptyResponse>("/calendar/confirm-appointment", {appointmentId})
	}
}()
