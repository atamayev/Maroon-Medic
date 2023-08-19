import { Card } from "react-bootstrap"
import PastAppointmentsMap from "./past-appointments-map"

const PastAppointmentsSection = ({pastAppointments} : {pastAppointments: DoctorDashboardData[]}) => {
  return (
    <Card style = {{margin: "0 10px" }}>
      <Card.Header>
        <h1>Past Appointments</h1>
      </Card.Header>
      <Card.Body>
        <PastAppointmentsMap pastDoctorAppointments = {pastAppointments} />
      </Card.Body>
    </Card>
  )
}

export default PastAppointmentsSection
