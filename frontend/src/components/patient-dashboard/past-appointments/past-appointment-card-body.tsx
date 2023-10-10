import { observer } from "mobx-react"
import MessageSection from "../message-section"

interface Props {
	isOpen: boolean
	appointment: PatientDashboardData
}

function PastAppointmentCardBody (props: Props) {
	const { isOpen, appointment } = props

	return (
		<div className={`transition-all duration-300 ease-in-out ${isOpen ? "max-h-screen" : "max-h-0"} overflow-hidden`}>
			<MessageSection appointment={appointment} />
		</div>
	)
}

export default observer(PastAppointmentCardBody)
