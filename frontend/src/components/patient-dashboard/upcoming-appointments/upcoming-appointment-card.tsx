import AppointmentConfirmationStatus from "../appointment-confirmation-status"
import MessageSection from "../message-section"

const UpcomingAppointmentCard = ({ appointment }: { appointment: PatientDashboardData }) => {
	return (
		<div className="mb-3 bg-yellow-100 border border-brown-400 rounded" style={{ margin: "0 10px", position: "relative" }}>
			<div className="p-4">
				<div className="flex justify-between items-center mb-2">
					<span className="text-brown-800 font-bold">
						Appointment with Dr. {appointment.doctorFirstName} {appointment.doctorLastName} on {appointment.appointmentDate}
					</span>
					<AppointmentConfirmationStatus appointment={appointment} />
				</div>
				<div className="text-amber-700">
					<MessageSection appointment={appointment} />
				</div>
			</div>
		</div>
	)
}

export default UpcomingAppointmentCard
