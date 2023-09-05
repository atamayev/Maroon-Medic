import Button from "../button"
import { AxiosError } from "axios"
import CalendarDataService from "src/services/calendar-data-service"
import invalidUserAction from "src/utils/invalid-user-action"

interface ApproveAppointmentProps {
  setStatus: React.Dispatch<React.SetStateAction<AppointmentStatus>>,
  appointmentsId: number,
  dashboardData: DoctorDashboardData[],
  setDashboardData: React.Dispatch<React.SetStateAction<DoctorDashboardData[]>>
}

async function approveAppointment (props: ApproveAppointmentProps) {
	const { setStatus, appointmentsId, dashboardData, setDashboardData } = props
	try {
		const response = await CalendarDataService.confirmAppointment(appointmentsId)
		if (response.status === 200) {
			// Update the doctorConfirmationStatus for the specific appointment
			const updatedDashboardData = dashboardData.map(appointment => {
				if (appointment.appointmentsId === appointmentsId) return { ...appointment, doctorConfirmationStatus: true }
				return appointment
			})
			setDashboardData(updatedDashboardData)
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

interface ConfirmedAppointmentProps {
  status: AppointmentStatus,
  setStatus: React.Dispatch<React.SetStateAction<AppointmentStatus>>,
  appointment: DoctorDashboardData,
  dashboardData: DoctorDashboardData[],
  setDashboardData: React.Dispatch<React.SetStateAction<DoctorDashboardData[]>>
}

export default function ConfirmedAppointment (props: ConfirmedAppointmentProps) {
	const { status, setStatus, appointment, dashboardData, setDashboardData } = props

	if (status !== "confirming") return null
	return (
		<span style={{ display: "block" }}>
			<Button
				colorClass = "bg-green-600"
				hoverClass = "hover:bg-green-700"
				onClick = {
					() => approveAppointment({setStatus, appointmentsId: appointment.appointmentsId, dashboardData, setDashboardData})
				}
				title = "Approve Appointment"
			/>
			<Button
				colorClass="bg-red-600"
				hoverClass="hover:bg-red-700"
				onClick = {() => setStatus("pending")}
				title = "X"
			/>
		</span>
	)
}