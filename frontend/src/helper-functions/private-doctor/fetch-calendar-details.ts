import CalendarDataService from "../../services/calendar-data-service"
import handle401AxiosError from "src/utils/handle-errors/handle-401-axios-error"

export default async function fetchDoctorCalendarDetails(): Promise<DoctorCalendarEvent[] | undefined> {
	try {
		const response = await CalendarDataService.fillCalendarDetails()
		if (response.status === 200) {
			const events: DoctorCalendarEvent[] = response.data.map((appointment: DoctorDashboardData) => {
				const startTime = new Date(appointment.appointment_date)
				const endTime = new Date(startTime)
				endTime.setMinutes(startTime.getMinutes() + appointment.appointment_timespan)
				return {
					title: appointment.Service_name,
					start: startTime,
					end: endTime,
					doctor_confirmation_status: appointment.doctor_confirmation_status
				}
			})
			return events
		}
	} catch (error: unknown) {
		handle401AxiosError(error)
		return []
	}
}
