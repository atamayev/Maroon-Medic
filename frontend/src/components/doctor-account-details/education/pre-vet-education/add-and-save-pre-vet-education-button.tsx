
import Button from "src/components/button"

interface Props {
	handleAddEducation: () => GeneralEducationItem
	saveEducation: (selectedEducationObj: PreVetEducationItem) => void
	allChoicesFilled: boolean
}

export default function AddAndSavePreVetEducationButton (props: Props) {
	const { handleAddEducation, saveEducation, allChoicesFilled } = props

	if (!allChoicesFilled) return null

	return (
		<Button
			className = "mt-3 font-medium"
			colorClass = "bg-green-700"
			hoverClass = "hover:bg-green-800"
			title = "Add"
			onClick = {() => {
				const selectedEducationObj = handleAddEducation()
				saveEducation(selectedEducationObj as PreVetEducationItem)
			}}
			textColor = "text-white"
		/>
	)
}
