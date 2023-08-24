import _ from "lodash"
import UpcomingAppointmentCard from "./upcoming-appointment-card"

const UpcomingAppointmentsMap = ({ upcomingPatientAppointments } : { upcomingPatientAppointments: PatientDashboardData[] }) => {
	if (_.isEmpty(upcomingPatientAppointments)) return <>No upcoming appointments</>
	return (
		<>
			{upcomingPatientAppointments.map((appointment) => (
				<UpcomingAppointmentCard key = {appointment.appointmentsID} appointment = {appointment} />
			))}
		</>
	)
}

export default UpcomingAppointmentsMap
