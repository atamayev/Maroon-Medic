import AppointmentConfirmationStatus from "../appointment-confirmation-status"

const PastAppointmentCard = ({ appointment }: { appointment: PatientDashboardData }) => {
	return (
		<div className="mb-3 bg-yellow-100 border border-brown-400 rounded" style={{ margin: "0 10px", position: "relative" }}>
			<div className="p-4">
				<div className="flex justify-between items-center">
					<span className="text-brown-800 font-bold">
            Appointment with Dr. {appointment.Doctor_FirstName} {appointment.Doctor_LastName} on {appointment.appointment_date}
					</span>
					<AppointmentConfirmationStatus appointment={appointment} />
				</div>
			</div>
		</div>
	)
}

export default PastAppointmentCard
