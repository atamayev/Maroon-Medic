interface Props {
	appointment: DoctorDashboardData
}

export default function MessageSection (props: Props) {
	const { appointment } = props

	if (!appointment.patientMessage) return null
	return (
		<div>
			Patient Message:
			{" " + appointment.patientMessage}
		</div>
	)
}
