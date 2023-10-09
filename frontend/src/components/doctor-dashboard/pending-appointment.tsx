import Button from "../button"

interface Props {
	status: AppointmentStatus,
	setStatus: React.Dispatch<React.SetStateAction<AppointmentStatus>>
}

export default function PendingAppointment (props: Props) {
	const { status, setStatus } = props

	if (status !== "pending") return null
	return (
		<Button
			colorClass = "bg-amber-600"
			hoverClass = "hover:bg-amber-700"
			onClick = {() => {setStatus("confirming")}}
			title = "Pending approval"
			textColor = "text-white"
		/>
	)
}
