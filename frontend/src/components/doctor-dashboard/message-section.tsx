export default function MessageSection ({ appointment }: { appointment: DoctorDashboardData }) {
	if (!appointment.patientMessage) return null
	return (
		<span style={{ display: "block" }}>
      Patient Message:
			{" " + appointment.patientMessage}
		</span>
	)
}
