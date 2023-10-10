import useApproveAppointment from "src/custom-hooks/private-doctor/use-approve-appointment"
import Button from "../button"
import useDenyAppointment from "src/custom-hooks/private-doctor/use-deny-appointment"

interface ConfirmedAppointmentProps {
	status: AppointmentStatus
	setStatus: React.Dispatch<React.SetStateAction<AppointmentStatus>>
	appointment: DoctorDashboardData
}

export default function ConfirmOrDenyAppointment (props: ConfirmedAppointmentProps) {
	const { status, setStatus, appointment } = props
	const approveAppointment = useApproveAppointment()
	const denyAppointment = useDenyAppointment()

	if (status !== "confirming-approval" && status !== "confirming-denied") return null
	if (status === "confirming-approval") {
		return (
			<>
				<Button
					colorClass = "bg-green-600"
					hoverClass = "hover:bg-green-700"
					onClick = {() =>
						approveAppointment(
							setStatus,
							appointment.appointmentsId
						)}
					title = "Confirm Appointment Approval"
					textColor = "text-white"
				/>
				<Button
					colorClass="bg-red-600"
					hoverClass="hover:bg-red-700"
					onClick = {() => setStatus("pending")}
					title = "Nevermind"
					textColor = "text-white"
					className = "mx-2"
				/>
			</>
		)
	}
	return (
		<>
			<Button
				colorClass = "bg-red-600"
				hoverClass = "hover:bg-red-700"
				onClick = {() =>
					denyAppointment(
						setStatus,
						appointment.appointmentsId
					)}
				title = "Confirm Appointment Denial"
				textColor = "text-white"
			/>
			<Button
				colorClass="bg-green-600"
				hoverClass="hover:bg-green-700"
				onClick = {() => setStatus("pending")}
				title = "Nevermind"
				textColor = "text-white"
				className = "mx-2"
			/>
		</>
	)
}
