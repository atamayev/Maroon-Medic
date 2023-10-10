import { useState } from "react"
import UpcomingAppointmentCardHeader from "./upcoming-appointment-card-header"
import UpcomingAppointmentCardBody from "./upcoming-appointment-card-body"

interface Props {
	appointment: PatientDashboardData
}

export default function UpcomingAppointmentCard (props: Props) {
	const { appointment } = props
	const [isOpen, setIsOpen] = useState(false)

	return (
		<div className="my-3 relative border border-brown-400 bg-yellow-100 rounded">
			<div className="p-4">
				<UpcomingAppointmentCardHeader
					appointment={appointment}
					toggleOpen={() => setIsOpen(!isOpen)}
				/>
				<UpcomingAppointmentCardBody
					isOpen={isOpen}
					appointment={appointment}
				/>
			</div>
		</div>
	)
}
