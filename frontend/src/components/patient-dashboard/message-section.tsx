const MessageSection = ({appointment} : {appointment: PatientDashboardData}) => {
  if (!appointment.patient_message) return null
  return (
    <span style = {{ display: "block" }}>
      Your Message: {""}
      {appointment.patient_message}
    </span>
  )
}

export default MessageSection
