const PastAppointmentCard = ({ appointment }: { appointment: DoctorDashboardData }) => {
	return (
		<div className="mb-3 relative" style={{ margin: "0 10px" }}>
			<div className="p-4 border border-brown-400 bg-yellow-100 rounded">
				<h1 className="text-brown-800 text-lg">
          Appointment with {appointment.Patient_FirstName} {appointment.Patient_LastName} on {appointment.appointmentDate}
				</h1>
			</div>
		</div>
	)
}

export default PastAppointmentCard
