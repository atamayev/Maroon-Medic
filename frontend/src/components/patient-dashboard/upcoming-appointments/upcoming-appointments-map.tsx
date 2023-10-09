import _ from "lodash"
import UpcomingAppointmentCard from "./upcoming-appointment-card"
import { sortPatientAppointmentsByDate } from "src/utils/sort-appointments-by-date"

interface Props {
	upcomingPatientAppointments: PatientDashboardData[]
}

function UpcomingAppointmentsMap (props: Props) {
	const { upcomingPatientAppointments } = props

	if (_.isEmpty(upcomingPatientAppointments)) return <>No upcoming appointments</>

	const sortedUpcomingAppointments = sortPatientAppointmentsByDate(upcomingPatientAppointments)

	return (
		<>
			{sortedUpcomingAppointments.map((appointment) => (
				<UpcomingAppointmentCard key = {appointment.appointmentsId} appointment = {appointment} />
			))}
		</>
	)
}

export default UpcomingAppointmentsMap
