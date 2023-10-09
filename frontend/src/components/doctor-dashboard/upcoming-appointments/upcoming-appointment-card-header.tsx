import { observer } from "mobx-react"
import MessageSection from "../message-section"
import AppointmentApprovalStatus from "../appointment-approval-status.sx"

interface Props {
	appointment: DoctorDashboardData
	toggleOpen: () => void
	status: AppointmentStatus
}

function UpcomingAppointmentCardHeader (props: Props) {
	const { appointment, toggleOpen, status} = props

	return (
		<div
			onClick = {toggleOpen}
			className = "flex justify-between items-center p-3 text-black cursor-pointer"
		>
			<div className = "flex space-x-4">
				<h1 className="text-brown-800 text-lg">
					Appointment with {appointment.patientFirstName} {appointment.patientLastName} on {appointment.appointmentDate}
				</h1>
				<div>
					<MessageSection appointment={appointment} />
					<AppointmentApprovalStatus status={status} />
				</div>
			</div>
		</div>
	)
}

export default observer(UpcomingAppointmentCardHeader)
