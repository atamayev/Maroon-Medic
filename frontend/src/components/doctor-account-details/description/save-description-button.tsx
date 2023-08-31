import Button from "src/components/button"
import saveDescription from "src/helper-functions/account-details/save/doctor-account-details/save-description"

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
			onClick = {() => saveDescription(description, setDescriptionConfirmation)}
			textColor = "text-white"
		/>
	)
}
