import _ from "lodash"
import UpcomingAppointmentCard from "./upcoming-appointment-card"

const UpcomingAppointmentsMap = ({ upcomingDoctorAppointments, dashboardData, setDashboardData } :
  { upcomingDoctorAppointments: DoctorDashboardData[],
    dashboardData: DoctorDashboardData[],
    setDashboardData: React.Dispatch<React.SetStateAction<DoctorDashboardData[]>>
   }
) => {
  if (_.isEmpty(upcomingDoctorAppointments)) return <>No upcoming appointments</>
  return (
    <>
      {upcomingDoctorAppointments.map((appointment) => (
        <UpcomingAppointmentCard
          key = {appointment.appointmentsID}
          appointment = {appointment}
          dashboardData = {dashboardData}
          setDashboardData = {setDashboardData}
        />
      ))}
    </>
  )
}

export default UpcomingAppointmentsMap
