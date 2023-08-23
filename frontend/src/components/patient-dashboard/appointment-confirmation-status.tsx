import { useState } from "react"

const AppointmentConfirmationStatus = ({ appointment }: { appointment: PatientDashboardData }) => {
  const [showTooltip, setShowTooltip] = useState(false)
  let badgeText = ""
  let tooltipText = ""

  if (appointment.Doctor_confirmation_status === false) {
    badgeText = "Pending approval"
    tooltipText = `Dr. ${appointment.Doctor_FirstName} has not yet approved your appointment.`
  } else {
    badgeText = "Appointment approved"
    tooltipText = `Dr. ${appointment.Doctor_FirstName} is looking forward to the appointment.`
  }

  const TooltipMessage = () => {
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
          ${appointment.Doctor_confirmation_status === false ? "border-yellow-400" : ""}`}
      >
        {badgeText}
      </span>
      <TooltipMessage />
    </div>
  )
}

export default AppointmentConfirmationStatus
