import Button from "../button"

interface Props {
  status: DeleteStatuses,
  setStatus: (status: DeleteStatuses) => void
}

const InitialDeleteButton = ({ status, setStatus }: Props) => {
	if (status !== "initial") return null

	return (
		<Button
			className = "mt-3 mx-3"
			colorClass = "bg-red-600"
			hoverClass = "hover:bg-red-700"
			title = "Delete"
			onClick = {() => setStatus("deleting")}
		/>
	)
}

export default InitialDeleteButton
