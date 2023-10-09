interface Props {
	appointment: DoctorDashboardData
}

export default function MessageSection (props: Props) {
	const { appointment } = props

	if (!appointment.patientMessage) return null
	return (
		<span style={{ display: "block" }}>
			Patient Message:
			{" " + appointment.patientMessage}
		</span>
	)
}
