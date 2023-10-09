interface Props {
	appointment: DoctorDashboardData
}

export default function PastAppointmentCard (props: Props) {
	const { appointment } = props

	return (
		<div className="my-3 relative" style={{ margin: "10px" }}>
			<div className="p-4 border border-brown-400 bg-yellow-100 rounded">
				<h1 className="text-brown-800 text-lg">
					Appointment with {appointment.patientFirstName} {appointment.patientLastName} on {appointment.appointmentDate}
				</h1>
			</div>
		</div>
	)
}
