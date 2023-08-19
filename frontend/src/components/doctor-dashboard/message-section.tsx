const MessageSection = ({ appointment }: { appointment: DoctorDashboardData }) => {
  if (!appointment.patient_message) return null
  return (
    <span style={{ display: "block" }}>
      Patient Message:
      {" " + appointment.patient_message}
    </span>
  )
}

export default MessageSection
