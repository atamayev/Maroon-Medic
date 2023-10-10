import _ from "lodash"
import UpcomingAppointmentCard from "./upcoming-appointment-card"
import { sortDoctorAppointmentsByDate } from "src/utils/sort-appointments-by-date"

interface Props {
	upcomingDoctorAppointments: DoctorDashboardData[]
}

export default function UpcomingAppointmentsMap (props: Props) {
	const { upcomingDoctorAppointments } = props

	if (_.isEmpty(upcomingDoctorAppointments)) {
		return <>No upcoming appointments</>
	}

	const sortedUpcomingAppointments = sortDoctorAppointmentsByDate(upcomingDoctorAppointments)

	return (
		<>
			{sortedUpcomingAppointments.map((appointment) => (
				<UpcomingAppointmentCard
					key = {appointment.appointmentsId}
					appointment = {appointment}
				/>
			))}
		</>
	)
}
