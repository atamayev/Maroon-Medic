import { AxiosResponse } from "axios"
import http from "../http-common"

export default new class CalendarDataService {
	async makeAppointment(appointmentObject: AppointmentObject): Promise<AxiosResponse<EmptyResponse>> {
		return await http.post<EmptyResponse>("/calendar/make-appointment", {appointmentObject})
	}
	async fillCalendarDetails(): Promise<AxiosResponse<DoctorDashboardData[]>> {
		return await http.get<DoctorDashboardData[]>("/calendar/get-doctor-calendar-details")
	}
	async confirmAppointment(appointmentId: number): Promise<AxiosResponse<EmptyResponse>> {
		return await http.patch<EmptyResponse>(`/calendar/confirm-appointment/${appointmentId}`)
	}
	async denyAppointment(appointmentId: number): Promise<AxiosResponse<EmptyResponse>> {
		return await http.patch<EmptyResponse>(`/calendar/deny-appointment/${appointmentId}`)
	}
}()
