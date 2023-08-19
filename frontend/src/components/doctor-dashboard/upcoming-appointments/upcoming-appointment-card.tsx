import { Card } from "react-bootstrap"
import { useState } from "react"
import MessageSection from "../message-section"
import PendingAppointment from "../pending-appointment"
import ConfirmedAppointment from "../confirmed-appointment"
import ApprovedAppointment from "../approved-appointment"

const returnDoctorConfirmationStatus = (appointment: DoctorDashboardData) => {
  if (appointment.Doctor_confirmation_status === false) return "pending"
  return "approved"
}

const UpcomingAppointmentCard = ({ appointment, dashboardData, setDashboardData } :
  { appointment: DoctorDashboardData,
    dashboardData: DoctorDashboardData[],
    setDashboardData: React.Dispatch<React.SetStateAction<DoctorDashboardData[]>>
  }) => {
  const [status, setStatus] = useState<AppointmentStatus>(returnDoctorConfirmationStatus(appointment))

  return (
    <Card style = {{ margin: "0 10px", position: "relative" }} className = "mb-3">
      <Card.Body>
        <Card.Title>
          Appointment with {appointment.Patient_FirstName} {appointment.Patient_LastName} on {appointment.appointment_date}
        </Card.Title>
        <Card.Text>
          <MessageSection appointment = {appointment} />
          <PendingAppointment status = {status} setStatus = {setStatus} />
          <ConfirmedAppointment
            status = {status}
            setStatus = {setStatus}
            appointment = {appointment}
            dashboardData = {dashboardData}
            setDashboardData = {setDashboardData}
          />
          <ApprovedAppointment status = {status} />
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default UpcomingAppointmentCard
