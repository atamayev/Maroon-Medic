import Button from "../button"
import { AxiosError } from "axios"
import CalendarDataService from "src/services/calendar-data-service"
import invalidUserAction from "src/utils/invalid-user-action"

interface ApproveAppointmentProps {
  setStatus: React.Dispatch<React.SetStateAction<AppointmentStatus>>,
  appointmentsID: number,
  dashboardData: DoctorDashboardData[],
  setDashboardData: React.Dispatch<React.SetStateAction<DoctorDashboardData[]>>
}

async function approveAppointment (props: ApproveAppointmentProps) {
	const { setStatus, appointmentsID, dashboardData, setDashboardData } = props
	try {
		const response = await CalendarDataService.confirmAppointment(appointmentsID)
		if (response.status === 200) {
			// Update the Doctor_confirmation_status for the specific appointment
			const updatedDashboardData = dashboardData.map(appointment => {
				if (appointment.appointmentsID === appointmentsID) return { ...appointment, Doctor_confirmation_status: true }
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

const ConfirmedAppointment = (props: ConfirmedAppointmentProps) => {
	const { status, setStatus, appointment, dashboardData, setDashboardData } = props

	if (status !== "confirming") return null
	return (
		<span style={{ display: "block" }}>
			<Button
				colorClass = "bg-green-600"
				hoverClass = "hover:bg-green-700"
				onClick = {() => approveAppointment({setStatus, appointmentsID: appointment.appointmentsID, dashboardData, setDashboardData})}
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

export default ConfirmedAppointment
