import { Card } from "react-bootstrap"

const PastAppointmentCard = ({ appointment }: { appointment: DoctorDashboardData }) => {
  return (
    <Card style = {{ margin: "0 10px", position: "relative" }} className = "mb-3">
      <Card.Body>
        <Card.Title>
          Appointment with {appointment.Patient_FirstName} {appointment.Patient_LastName} on {appointment.appointment_date}
        </Card.Title>
      </Card.Body>
    </Card>
  )
}

export default PastAppointmentCard
