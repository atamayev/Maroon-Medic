import { OverlayTrigger, Tooltip, Badge } from "react-bootstrap"

const AppointmentConfirmationStatus = ({appointment} : {appointment: PatientDashboardData}) => {
  if (appointment.Doctor_confirmation_status === false) {
    return (
      <OverlayTrigger
        placement = "top"
        overlay = {<Tooltip id = {"tooltip-top"}>Dr. {appointment.Doctor_FirstName} has not yet approved your appointment.</Tooltip>}
      >
        <Badge pill style = {{ position: "absolute", top: "10px", right: "10px", border: "2px solid yellow" }}>
          Pending approval
        </Badge>
      </OverlayTrigger>
    )
  }
  return (
    <OverlayTrigger
      placement = "top"
      overlay = {<Tooltip id = {"tooltip-top"}>Dr. {appointment.Doctor_FirstName} is looking forward to the appointment.</Tooltip>}
    >
      <Badge pill style = {{ position: "absolute", top: "10px", right: "10px" }}>
        Appointment approved
      </Badge>
    </OverlayTrigger>
  )
}

export default AppointmentConfirmationStatus
