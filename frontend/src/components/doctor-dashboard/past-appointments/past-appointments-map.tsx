import _ from "lodash"
import PastAppointmentCard from "./past-appointment-card"
import { sortDoctorAppointmentsByDate } from "src/utils/sort-appointments-by-date"

interface Props {
	pastDoctorAppointments: DoctorDashboardData[]
}

export default function PastAppointmentsMap (props: Props) {
	const { pastDoctorAppointments } = props

	if (_.isEmpty(pastDoctorAppointments)) return <>No past appointments</>

	const sortedPastAppointments = sortDoctorAppointmentsByDate(pastDoctorAppointments)

	return (
		<>
			{sortedPastAppointments.map((appointment) => (
				<PastAppointmentCard key = {appointment.appointmentsId} appointment = {appointment} />
			))}
		</>
	)
}
