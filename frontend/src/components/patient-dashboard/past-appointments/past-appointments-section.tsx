import PastAppointmentsMap from "./upcoming-appointments-map"

function PastAppointmentsSection ({ pastAppointments }: { pastAppointments: PatientDashboardData[] }) {
	return (
		<div className="mb-3 bg-yellow-100 border border-brown-400 rounded" style={{ margin: "0 10px" }}>
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
