import { observer } from "mobx-react"

interface Props {
	appointment: DoctorDashboardData
	toggleOpen: () => void
}

function PastAppointmentCardHeader (props: Props) {
	const { appointment, toggleOpen} = props

	return (
		<div
			onClick = {toggleOpen}
			className = "flex justify-between items-center p-3 text-black cursor-pointer"
		>
			<div className = "flex space-x-4">
				<h1 className="text-brown-800 text-lg">
					Appointment with {appointment.patientFirstName} {appointment.patientLastName} on {appointment.appointmentDate}
				</h1>
			</div>
		</div>
	)
}

export default observer(PastAppointmentCardHeader)
