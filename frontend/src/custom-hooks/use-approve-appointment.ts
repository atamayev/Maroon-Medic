import { AxiosError } from "axios"
import { useContext } from "react"
import AppContext from "src/contexts/maroon-context"
import CalendarDataService from "src/services/calendar-data-service"
import invalidUserAction from "src/utils/invalid-user-action"

interface ApproveAppointmentProps {
	setStatus: React.Dispatch<React.SetStateAction<AppointmentStatus>>
	appointmentsId: number
}

export default async function useApproveAppointment (props: ApproveAppointmentProps): Promise<void> {
	const { setStatus, appointmentsId } = props
	const appContext = useContext(AppContext)

	try {
		const response = await CalendarDataService.confirmAppointment(appointmentsId)
		if (response.status === 200) {
			// Update the doctorConfirmationStatus for the specific appointment
			const updatedDashboardData = appContext.privateDoctorData.doctorDashboardData!.map(appointment => {
				if (appointment.appointmentsId === appointmentsId) return { ...appointment, doctorConfirmationStatus: true }
				return appointment
			})
			appContext.privateDoctorData.doctorDashboardData = updatedDashboardData
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
