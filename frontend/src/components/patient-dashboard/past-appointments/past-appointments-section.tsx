import PastAppointmentsMap from "./past-appointments-map"

interface Props {
	pastAppointments: PatientDashboardData[]
}

function PastAppointmentsSection (props: Props) {
	const { pastAppointments } = props

	return (
		<div className="my-3 bg-yellow-100 border border-brown-400 rounded mx-3">
			<div className="p-4 bg-amber-200 border-b border-brown-400">
				<h1 className="text-brown-800 font-bold">Past Appointments</h1>
			</div>
			<div className="p-4">
				<PastAppointmentsMap pastPatientAppointments={pastAppointments} />
			</div>
		</div>
	)
}

export default PastAppointmentsSection
