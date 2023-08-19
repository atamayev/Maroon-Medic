import { Card } from "react-bootstrap"
import UpcomingAppointmentsMap from "./upcoming-appointments-map"

const UpcomingAppointmentsSection = ({ upcomingAppointments } : {upcomingAppointments: PatientDashboardData[]}) => {
  return (
    <>
      <Card style = {{margin: "0 10px" }} className = "mb-3">
        <Card.Header>
          <h1>Upcoming Appointments</h1>
        </Card.Header>
        <Card.Body>
          <UpcomingAppointmentsMap upcomingPatientAppointments = {upcomingAppointments} />
        </Card.Body>
      </Card>
    </>
  )
}

export default UpcomingAppointmentsSection
