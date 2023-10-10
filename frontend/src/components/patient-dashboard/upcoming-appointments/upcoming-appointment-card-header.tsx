import { observer } from "mobx-react"
import AppointmentConfirmationStatus from "../appointment-confirmation-status"

interface Props {
	appointment: PatientDashboardData
	toggleOpen: () => void
}

function UpcomingAppointmentCardHeader (props: Props) {
	const { appointment, toggleOpen } = props

	return (
		<div
			onClick = {toggleOpen}
			className = "flex justify-between items-center p-3 text-black cursor-pointer"
		>
			<div className = "flex space-x-4">
				<h1 className="text-brown-800 text-lg">
					Appointment with Dr. {appointment.doctorFirstName} {appointment.doctorLastName} on {appointment.appointmentDate}
				</h1>
				<AppointmentConfirmationStatus appointment={appointment} />
			</div>
		</div>
	)
}

export default observer(UpcomingAppointmentCardHeader)
