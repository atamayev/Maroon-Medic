import Button from "src/components/button"
import useSaveDescription from "src/custom-hooks/account-details/save/doctor-account-details/use-save-description"

interface Props {
	description: string
	setDescriptionConfirmation: (conf: ConfirmationMessage) => void
}

export default function SaveDescriptionButton (props: Props) {
	const { description, setDescriptionConfirmation } = props

	return (
		<Button
			className = "mt-3 text-medium"
			colorClass = "bg-green-700"
			hoverClass = "hover:bg-green-800"
			title = "Save"
			onClick = {() => useSaveDescription(description, setDescriptionConfirmation)}
			textColor = "text-white"
		/>
	)
}
