import Button from "../button"

interface Props {
	status: DeleteStatuses,
	setStatus: (status: DeleteStatuses) => void
}

export default function NevermindButton ({ status, setStatus }: Props) {
	if (status !== "deleting") return null

	return (
		<Button
			className = "mt-3 mx-3 font-normal"
			colorClass = "bg-amber-600"
			hoverClass = "hover:bg-amber-700"
			title = "Nevermind"
			onClick = {() => setStatus(undefined)}
			textColor = "text-white"
		/>
	)
}
