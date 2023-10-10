import Button from "../button"

interface Props {
	status: AppointmentStatus,
	setStatus: React.Dispatch<React.SetStateAction<AppointmentStatus>>
}

export default function PendingAppointment (props: Props) {
	const { status, setStatus } = props

	if (status !== "pending") return null
	return (
		<>
			<Button
				colorClass = "bg-green-700"
				hoverClass = "hover:bg-green-800"
				onClick = {() => {setStatus("confirming-approval")}}
				title = "Approve Appointment"
				textColor = "text-white"
			/>

			<Button
				colorClass = "bg-red-600"
				hoverClass = "hover:bg-red-700"
				onClick = {() => {setStatus("confirming-denied")}}
				title = "Decline Appointment"
				textColor = "text-white"
				className = "mx-2"
			/>
		</>
	)
}
