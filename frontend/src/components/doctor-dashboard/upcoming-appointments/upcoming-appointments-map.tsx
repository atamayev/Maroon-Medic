import _ from "lodash"
import UpcomingAppointmentCard from "./upcoming-appointment-card"

interface Props {
	upcomingDoctorAppointments: DoctorDashboardData[]
}

export default function UpcomingAppointmentsMap (props: Props) {
	const { upcomingDoctorAppointments } = props

	if (_.isEmpty(upcomingDoctorAppointments)) return <>No upcoming appointments</>
	return (
		<>
			{upcomingDoctorAppointments.map((appointment) => (
				<UpcomingAppointmentCard
					key = {appointment.appointmentsId}
					appointment = {appointment}
				/>
			))}
		</>
	)
}
