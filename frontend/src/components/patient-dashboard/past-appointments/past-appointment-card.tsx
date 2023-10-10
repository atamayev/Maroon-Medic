import { useState } from "react"
import PastAppointmentCardHeader from "./past-appointment-card-header"
import PastAppointmentCardBody from "./past-appointment-card-body"

interface Props {
	appointment: PatientDashboardData
}

export default function PastAppointmentCard (props: Props) {
	const { appointment } = props
	const [isOpen, setIsOpen] = useState(false)

	return (
		<div className="my-3 relative">
			<div className="p-4 border border-brown-400 bg-yellow-100 rounded">
				<PastAppointmentCardHeader
					appointment={appointment}
					toggleOpen={() => setIsOpen(!isOpen)}
				/>
				<PastAppointmentCardBody
					isOpen={isOpen}
					appointment={appointment}
				/>
			</div>
		</div>
	)
}
