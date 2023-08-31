import _ from "lodash"
import UpcomingAppointmentCard from "./upcoming-appointment-card"

export default function UpcomingAppointmentsMap ({ upcomingDoctorAppointments, dashboardData, setDashboardData } :
  { upcomingDoctorAppointments: DoctorDashboardData[],
    dashboardData: DoctorDashboardData[],
    setDashboardData: React.Dispatch<React.SetStateAction<DoctorDashboardData[]>>
   }
) {
	if (_.isEmpty(upcomingDoctorAppointments)) return <>No upcoming appointments</>
	return (
		<>
			{upcomingDoctorAppointments.map((appointment) => (
				<UpcomingAppointmentCard
					key = {appointment.appointmentsId}
					appointment = {appointment}
					dashboardData = {dashboardData}
					setDashboardData = {setDashboardData}
				/>
			))}
		</>
	)
}
