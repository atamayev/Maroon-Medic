import Button from "../button"

interface Props {
  status: AppointmentStatus,
  setStatus: React.Dispatch<React.SetStateAction<AppointmentStatus>>
}

const PendingAppointment = (props: Props) => {
  const { status, setStatus } = props

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
