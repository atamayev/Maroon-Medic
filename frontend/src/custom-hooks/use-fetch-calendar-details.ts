import { useContext } from "react"
import AppContext from "src/contexts/maroon-context"
import CalendarDataService from "../services/calendar-data-service"
import handle401AxiosError from "src/utils/handle-errors/handle-401-axios-error"

export default function useFetchDoctorCalendarDetails(): () => Promise<void> {
	const appContext = useContext(AppContext)

	return async (): Promise<void> => {
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
				appContext.doctorCalendarDetails = events
			}
		} catch (error: unknown) {
			handle401AxiosError(error)
		}
	}
}
