import UpcomingAppointmentsMap from "./upcoming-appointments-map"

interface Props {
	upcomingAppointments: PatientDashboardData[]
}

function UpcomingAppointmentsSection (props: Props) {
	const { upcomingAppointments } = props

	return (
		<div className="mb-3 bg-yellow-100 border border-brown-400 rounded mx-3">
			<div className="p-4 bg-amber-200 border-b border-brown-400">
				<h1 className="text-brown-800 font-bold">Upcoming Appointments</h1>
			</div>
			<div className="p-4">
				<UpcomingAppointmentsMap upcomingPatientAppointments={upcomingAppointments} />
			</div>
		</div>
	)
}

export default UpcomingAppointmentsSection
