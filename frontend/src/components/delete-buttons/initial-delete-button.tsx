import { Button } from "react-bootstrap"

interface Props {
  status: DeleteStatuses,
  setStatus: (status: DeleteStatuses) => void
}

const InitialDeleteButton = ({status, setStatus}: Props) => {
  if (status !== "initial") return null

  return (
    <Button
      variant = "danger"
      onClick = {() => setStatus("deleting")}
    >
      Delete
    </Button>
  )
}

export default InitialDeleteButton
