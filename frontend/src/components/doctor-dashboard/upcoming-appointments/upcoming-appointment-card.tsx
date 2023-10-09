import { useState } from "react"
import UpcomingAppointmentCardHeader from "./upcoming-appointment-card-header"
import UpcomingAppointmentCardBody from "./upcoming-appointment-card-body"

const returnDoctorConfirmationStatus = (appointment: DoctorDashboardData) => {
	if (!appointment.doctorConfirmationStatus) return "pending"
	return "approved"
}

interface Props {
	appointment: DoctorDashboardData
}

export default function UpcomingAppointmentCard (props: Props) {
	const { appointment } = props
	const [isOpen, setIsOpen] = useState(false)
	const [status, setStatus] = useState<AppointmentStatus>(returnDoctorConfirmationStatus(appointment))

	return (
		<div className="my-3 relative border border-brown-400 bg-yellow-100 rounded" style={{ margin: "10px" }}>
			<div className="p-4">
				<UpcomingAppointmentCardHeader
					appointment={appointment}
					toggleOpen={() => setIsOpen(!isOpen)}
					status={status}
				/>

				<UpcomingAppointmentCardBody
					isOpen={isOpen}
					appointment={appointment}
					status={status}
					setStatus={setStatus}
				/>
			</div>
		</div>
	)
}
