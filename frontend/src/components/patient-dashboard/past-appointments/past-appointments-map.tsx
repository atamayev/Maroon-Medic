import _ from "lodash"
import PastAppointmentCard from "./past-appointment-card"
import { sortPatientAppointmentsByDate } from "src/utils/sort-appointments-by-date"

interface Props {
	pastPatientAppointments: PatientDashboardData[]
}

export default function PastAppointmentsMap (props: Props) {
	const { pastPatientAppointments } = props
	if (_.isEmpty(pastPatientAppointments)) return <>No past appointments</>

	const sortedPastAppointments = sortPatientAppointmentsByDate(pastPatientAppointments)

	return (
		<>
			{sortedPastAppointments.map((appointment) => (
				<PastAppointmentCard key = {appointment.appointmentsId} appointment = {appointment} />
			))}
		</>
	)
}
