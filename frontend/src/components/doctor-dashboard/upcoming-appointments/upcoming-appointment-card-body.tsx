import { observer } from "mobx-react"
import PendingAppointment from "../pending-appointment"
import ConfirmOrDenyAppointment from "../confirm-or-deny-appointment"
import MessageSection from "../message-section"

interface Props {
	isOpen: boolean
	appointment: DoctorDashboardData
	status: AppointmentStatus
	setStatus: React.Dispatch<React.SetStateAction<AppointmentStatus>>
}

function UpcomingAppointmentCardBody (props: Props) {
	const { isOpen, appointment, status, setStatus } = props

	return (
		<div className={`transition-all duration-300 ease-in-out ${isOpen ? "max-h-screen" : "max-h-0"} overflow-hidden`}>
			<MessageSection appointment={appointment} />

			<PendingAppointment
				status={status}
				setStatus={setStatus}
			/>
			<ConfirmOrDenyAppointment
				status={status}
				setStatus={setStatus}
				appointment={appointment}
			/>
		</div>
	)
}

export default observer(UpcomingAppointmentCardBody)
