import Button from "../button"

interface Props {
  status: DeleteStatuses,
  setStatus: (status: DeleteStatuses) => void
}

const NevermindButton = ({status, setStatus}: Props) => {
  if (status !== "deleting") return null

  return (
    <Button
      className = "mt-3 mx-3"
      colorClass = "bg-amber-600"
      hoverClass = "hover:bg-amber-700"
      title = "Nevermind"
      onClick = {() => setStatus("initial")}
    />
  )
}

export default NevermindButton
