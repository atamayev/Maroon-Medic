import Button from "../button"

const PendingAppointment = ({ status, setStatus } :
  { status: AppointmentStatus,
    setStatus: React.Dispatch<React.SetStateAction<AppointmentStatus>>
  }
) => {
  if (status !== "pending") return null
  return (
    <Button
      colorClass = "bg-amber-600"
      hoverClass = "hover:bg-amber-700"
      onClick = {() => {setStatus("confirming")}}
      title = "Pending approval"
    />
  )
}

export default PendingAppointment
