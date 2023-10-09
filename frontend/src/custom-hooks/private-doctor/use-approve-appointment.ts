import _ from "lodash"
import { AxiosError } from "axios"
import { useContext } from "react"
import AppContext from "src/contexts/maroon-context"
import CalendarDataService from "src/services/calendar-data-service"
import invalidUserAction from "src/utils/invalid-user-action"

export default function useApproveAppointment(): (
	setStatus: React.Dispatch<React.SetStateAction<AppointmentStatus>>,
	appointmentsId: number
) => Promise<void> {
	const privateDoctorData = useContext(AppContext).privateDoctorData

	return async (
		setStatus: React.Dispatch<React.SetStateAction<AppointmentStatus>>,
		appointmentsId: number
	): Promise<void> => {
		if (_.isNull(privateDoctorData)) return

		try {
			const response = await CalendarDataService.confirmAppointment(appointmentsId)
			if (response.status === 200) {
				// Update the doctorConfirmationStatus for the specific appointment
				const updatedDashboardData = privateDoctorData.doctorDashboardData!.map(appointment => {
					if (appointment.appointmentsId === appointmentsId) return { ...appointment, doctorConfirmationStatus: true }
					return appointment
				})
				privateDoctorData.doctorDashboardData = updatedDashboardData
				setStatus("approved")
			} else {
				setStatus("pending")
			}
		} catch (error: unknown) {
			if (error instanceof AxiosError) {
				if (error.response?.status === 401) {
					invalidUserAction(error.response.data)
				}
			}
			else setStatus("pending")
		}
	}
}
