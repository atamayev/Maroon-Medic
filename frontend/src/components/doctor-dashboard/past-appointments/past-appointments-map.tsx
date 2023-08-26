import _ from "lodash"
import PastAppointmentCard from "./past-appointment-card"

const PastAppointmentsMap = ({ pastDoctorAppointments } : { pastDoctorAppointments: DoctorDashboardData[] }) => {
	if (_.isEmpty(pastDoctorAppointments)) return <>No past appointments</>
	return (
		<>
			{pastDoctorAppointments.map((appointment) => (
				<PastAppointmentCard key = {appointment.AppointmentsID} appointment = {appointment} />
			))}
		</>
	)
}

export default PastAppointmentsMap
