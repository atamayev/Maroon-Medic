import { Badge } from "react-bootstrap"

const ApprovedAppointment = ({ status } : { status: AppointmentStatus }) => {
  if (status !== "approved") return null
  return (
    <Badge pill style = {{ position: "absolute", top: "10px", right: "10px" }}>
      Appointment approved
    </Badge>
  )
}

export default ApprovedAppointment
