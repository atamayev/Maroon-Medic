
import Button from "src/components/button"

interface Props {
	handleAddEducation: () => GeneralEducationItem
	saveVetEducation: (selectedEducationObj: VetEducationItem) => void
	allChoicesFilled: boolean
}

export default function AddAndSaveVetEducationButton (props: Props) {
	const { handleAddEducation, saveVetEducation, allChoicesFilled } = props

	if (!allChoicesFilled) return null

	return (
		<Button
			className = "mt-3"
			colorClass = "bg-green-700"
			hoverClass = "hover:bg-green-800"
			title = "Add"
			onClick = {() => {
				const selectedEducationObj = handleAddEducation()
				saveVetEducation(selectedEducationObj as VetEducationItem)
			}}
			textColor = "text-white"
		/>
	)
}
