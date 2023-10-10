interface Props {
	appointment: PatientDashboardData
}

export default function MessageSection (props: Props) {
	const { appointment } = props
	if (!appointment.patientMessage) return null
	return (
		<span>
			Your Message:
			{" " + appointment.patientMessage}
		</span>
	)
}
