import UpcomingAppointmentsMap from "./upcoming-appointments-map"

interface Props {
	upcomingDoctorAppointments: DoctorDashboardData[]
}
export default function UpcomingAppointmentsSection (props: Props) {
	const { upcomingDoctorAppointments } = props

	return (
		<div className="border border-brown-400 bg-yellow-100 rounded ml-2 mr-2">
			<div className="p-4 bg-amber-400 text-white">
				<h1>Past Appointments</h1>
			</div>
			<div className="p-4">
				<UpcomingAppointmentsMap
					upcomingDoctorAppointments = {upcomingDoctorAppointments}
				/>
			</div>
		</div>
	)
}
