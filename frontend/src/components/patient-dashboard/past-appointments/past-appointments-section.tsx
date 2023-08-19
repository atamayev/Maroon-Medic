import { Card } from "react-bootstrap"
import PastAppointmentsMap from "./upcoming-appointments-map"

const PastAppointmentsSection = ({ pastAppointments } : {pastAppointments: PatientDashboardData[]}) => {
  return (
    <>
      <Card style = {{margin: "0 10px" }}>
        <Card.Header>
          <h1>Past Appointments</h1>
        </Card.Header>
        <Card.Body>
          <PastAppointmentsMap pastPatientAppointments = {pastAppointments} />
        </Card.Body>
      </Card>
    </>
  )
}

export default PastAppointmentsSection
