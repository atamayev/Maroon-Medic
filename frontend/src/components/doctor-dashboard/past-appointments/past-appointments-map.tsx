import _ from "lodash"
import PastAppointmentCard from "./past-appointment-card"

export default function PastAppointmentsMap ({ pastDoctorAppointments } : { pastDoctorAppointments: DoctorDashboardData[] }) {
	if (_.isEmpty(pastDoctorAppointments)) return <>No past appointments</>
	return (
		<>
			{pastDoctorAppointments.map((appointment) => (
				<PastAppointmentCard key = {appointment.appointmentsId} appointment = {appointment} />
			))}
		</>
	)
}
