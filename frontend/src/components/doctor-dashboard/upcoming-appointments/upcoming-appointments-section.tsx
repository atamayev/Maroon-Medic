import { Card } from "react-bootstrap"
import UpcomingAppointmentsMap from "./upcoming-appointments-map"

const UpcomingAppointmentsSection = ({ upcomingDoctorAppointments, dashboardData, setDashboardData } :
  { upcomingDoctorAppointments: DoctorDashboardData[],
    dashboardData: DoctorDashboardData[],
    setDashboardData: React.Dispatch<React.SetStateAction<DoctorDashboardData[]>>
   }
) => {
  return (
    <Card style = {{margin: "0 10px" }}>
      <Card.Header>
        <h1>Past Appointments</h1>
      </Card.Header>
      <Card.Body>
        <UpcomingAppointmentsMap
          upcomingDoctorAppointments = {upcomingDoctorAppointments}
          dashboardData = {dashboardData}
          setDashboardData = {setDashboardData}
        />
      </Card.Body>
    </Card>
  )
}

export default UpcomingAppointmentsSection
