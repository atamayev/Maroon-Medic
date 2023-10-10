import { useState } from "react"

interface Props {
	appointment: PatientDashboardData
}

function AppointmentConfirmationStatus (props: Props) {
	const { appointment } = props

	const [showTooltip, setShowTooltip] = useState(false)
	let badgeText = ""
	let tooltipText = ""

	if (appointment.doctorConfirmationStatus === "Pending") {
		badgeText = "Pending approval"
		tooltipText = `Dr. ${appointment.doctorFirstName} has not yet approved your appointment.`
	} else if (appointment.doctorConfirmationStatus === "Approved") {
		badgeText = "Appointment approved"
		tooltipText = `Dr. ${appointment.doctorFirstName} is looking forward to the appointment.`
	} else {
		badgeText = "Appointment declined"
		tooltipText = `Dr. ${appointment.doctorFirstName} has declined the appointment.`
	}

	function TooltipMessage () {
		if (showTooltip === false) return null
		return (
			<div className="absolute top-0 right-0 transform translate-x-full translate-y-full bg-black text-white text-xs rounded p-2">
				{tooltipText}
			</div>
		)
	}

	return (
		<div
			onMouseEnter={() => setShowTooltip(true)}
			onMouseLeave={() => setShowTooltip(false)}
		>
			<span
				className = {
					`absolute top-2 right-2 px-2 py-1 text-black rounded-full
          				${!appointment.doctorConfirmationStatus ? "bg-green-500" : "bg-yellow-500"}`}
			>
				{badgeText}
			</span>
			<TooltipMessage />
		</div>
	)
}

export default AppointmentConfirmationStatus
