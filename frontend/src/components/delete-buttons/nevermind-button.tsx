import { Button } from "react-bootstrap"

interface Props {
  status: DeleteStatuses,
  setStatus: (status: DeleteStatuses) => void
}

const NevermindButton = ({status, setStatus}: Props) => {
  if (status !== "deleting") return null

  return (
    <Button
      variant = "secondary"
      onClick = {() => setStatus("initial")}
    >
      Nevermind
    </Button>
  )
}

export default NevermindButton
