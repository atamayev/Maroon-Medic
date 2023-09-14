import useApproveAppointment from "src/custom-hooks/use-approve-appointment"
import Button from "../button"

interface ConfirmedAppointmentProps {
	status: AppointmentStatus
	setStatus: React.Dispatch<React.SetStateAction<AppointmentStatus>>
	appointment: DoctorDashboardData
}

export default function ConfirmedAppointment (props: ConfirmedAppointmentProps) {
	const { status, setStatus, appointment } = props

	if (status !== "confirming") return null
	return (
		<span style={{ display: "block" }}>
			<Button
				colorClass = "bg-green-600"
				hoverClass = "hover:bg-green-700"
				onClick = {
					() => useApproveAppointment({
						setStatus,
						appointmentsId: appointment.appointmentsId
					})
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
