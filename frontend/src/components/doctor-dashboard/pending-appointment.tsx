import { Button } from "react-bootstrap"

const PendingAppointment = ({ status, setStatus } :
  { status: AppointmentStatus,
    setStatus: React.Dispatch<React.SetStateAction<AppointmentStatus>>
  }
) => {
  if (status !== "pending") return null
  return (
    <Button
      variant = "warning"
      onClick = {() => {setStatus("confirming")}}
    >
      Pending approval
    </Button>
  )
}

export default PendingAppointment
