import { observer } from "mobx-react"
import PendingAppointment from "../pending-appointment"
import ConfirmedAppointment from "../confirmed-appointment"

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
			<PendingAppointment
				status={status}
				setStatus={setStatus}
			/>
			<ConfirmedAppointment
				status={status}
				setStatus={setStatus}
				appointment={appointment}
			/>
		</div>
	)
}

export default observer(UpcomingAppointmentCardBody)
