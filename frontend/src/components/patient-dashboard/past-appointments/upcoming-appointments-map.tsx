import _ from "lodash"
import PastAppointmentCard from "./past-appointment-card"

function PastAppointmentsMap ({ pastPatientAppointments } : { pastPatientAppointments: PatientDashboardData[] }) {
	if (_.isEmpty(pastPatientAppointments)) return <>No past appointments</>
	return (
		<>
			{pastPatientAppointments.map((appointment) => (
				<PastAppointmentCard key = {appointment.appointmentsId} appointment = {appointment} />
			))}
		</>
	)
}

export default PastAppointmentsMap
