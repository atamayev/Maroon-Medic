import CalendarDataService from "../../services/calendar-data-service"
import handle401AxiosError from "src/utils/handle-errors/handle-401-axios-error"

export default async function fetchDoctorCalendarDetails(): Promise<DoctorCalendarEvent[] | undefined> {
	try {
		const response = await CalendarDataService.fillCalendarDetails()
		if (response.status === 200) {
			const events: DoctorCalendarEvent[] = response.data.map((appointment: DoctorDashboardData) => {
				const startTime = new Date(appointment.appointmentDate)
				const endTime = new Date(startTime)
				endTime.setMinutes(startTime.getMinutes() + appointment.appointmentTimespan)
				return {
					title: appointment.serviceName,
					start: startTime,
					end: endTime,
					doctorConfirmationStatus: appointment.doctorConfirmationStatus
				}
			})
			return events
		}
	} catch (error: unknown) {
		handle401AxiosError(error)
		return []
	}
}
