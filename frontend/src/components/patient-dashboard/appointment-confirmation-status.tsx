import { useState } from "react"

function AppointmentConfirmationStatus ({ appointment }: { appointment: PatientDashboardData }) {
	const [showTooltip, setShowTooltip] = useState(false)
	let badgeText = ""
	let tooltipText = ""

	if (appointment.doctorConfirmationStatus === false) {
		badgeText = "Pending approval"
		tooltipText = `Dr. ${appointment.doctorFirstName} has not yet approved your appointment.`
	} else {
		badgeText = "Appointment approved"
		tooltipText = `Dr. ${appointment.doctorFirstName} is looking forward to the appointment.`
	}

	function TooltipMessage () {
		if (!showTooltip) return null
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
			className="relative"
		>
			<span
				className={
					`absolute top-2 right-2 rounded-full px-2 py-1 border-2
          ${appointment.doctorConfirmationStatus === false ? "border-yellow-400" : ""}`}
			>
				{badgeText}
			</span>
			<TooltipMessage />
		</div>
	)
}

export default AppointmentConfirmationStatus
