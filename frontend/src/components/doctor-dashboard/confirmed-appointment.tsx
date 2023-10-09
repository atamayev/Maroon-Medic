import useApproveAppointment from "src/custom-hooks/private-doctor/use-approve-appointment"
import Button from "../button"

interface ConfirmedAppointmentProps {
	status: AppointmentStatus
	setStatus: React.Dispatch<React.SetStateAction<AppointmentStatus>>
	appointment: DoctorDashboardData
}

export default function ConfirmedAppointment (props: ConfirmedAppointmentProps) {
	const { status, setStatus, appointment } = props
	const approveAppointment = useApproveAppointment()

	if (status !== "confirming") return null
	return (
		<span style={{ display: "block" }}>
			<Button
				colorClass = "bg-green-600"
				hoverClass = "hover:bg-green-700"
				onClick = {() =>
					approveAppointment(
						setStatus,
						appointment.appointmentsId
					)}
				title = "Approve Appointment"
				textColor = "text-white"
			/>
			<Button
				colorClass="bg-red-600"
				hoverClass="hover:bg-red-700"
				onClick = {() => setStatus("pending")}
				title = "X"
				textColor = "text-white"
				className = "mx-2"
			/>
		</span>
	)
}
