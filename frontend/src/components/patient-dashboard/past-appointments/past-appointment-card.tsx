import { Card } from "react-bootstrap"
import AppointmentConfirmationStatus from "../appointment-confirmation-status"

const PastAppointmentCard = ({appointment}: {appointment: PatientDashboardData}) => {
  return (
    <>
      <Card style = {{ margin: "0 10px", position: "relative" }}>
        <Card.Body>
          <Card.Title>
            Appointment with Dr. {appointment.Doctor_FirstName} {appointment.Doctor_LastName} on {appointment.appointment_date}
            <AppointmentConfirmationStatus appointment = {appointment} />
          </Card.Title>
        </Card.Body>
      </Card>
    </>
  )
}

export default PastAppointmentCard
