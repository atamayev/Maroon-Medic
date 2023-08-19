import { Card } from "react-bootstrap"
import AppointmentConfirmationStatus from "../appointment-confirmation-status"
import MessageSection from "../message-section"

const UpcomingAppointmentCard = ({appointment}: {appointment: PatientDashboardData}) => {
  return (
    <>
      <Card style = {{ margin: "0 10px", position: "relative" }}>
        <Card.Body>
          <Card.Title>
            Appointment with Dr. {appointment.Doctor_FirstName} {appointment.Doctor_LastName} on {appointment.appointment_date}
            <AppointmentConfirmationStatus appointment = {appointment} />
          </Card.Title>
          <Card.Text>
            <MessageSection appointment = {appointment} />
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  )
}

export default UpcomingAppointmentCard
