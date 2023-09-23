import _ from "lodash"
import Button from "../button"

interface Props {
	status: DeleteStatuses,
	setStatus: (status: DeleteStatuses) => void
}

export default function InitialDeleteButton ({ status, setStatus }: Props) {
	if (!_.isUndefined(status)) return null

	return (
		<Button
			className = "mt-3 mx-3 font-normal"
			colorClass = "bg-red-600"
			hoverClass = "hover:bg-red-700"
			title = "Delete"
			onClick = {() => setStatus("deleting")}
			textColor = "text-white"
		/>
	)
}
