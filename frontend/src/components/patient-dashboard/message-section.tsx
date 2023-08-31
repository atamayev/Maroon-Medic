function MessageSection ({ appointment } : { appointment: PatientDashboardData }) {
	if (!appointment.patientMessage) return null
	return (
		<span style = {{ display: "block" }}>
      Your Message: {""}
			{appointment.patientMessage}
		</span>
	)
}

export default MessageSection
