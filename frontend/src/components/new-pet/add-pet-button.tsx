import Button from "../button"
import areAllNewPetFieldsValid from "src/utils/field-checks/new-pet-field-checks"

const newPetName = (petName: string | null) => {
	if (!petName) return "Pet"
	return petName
}

interface Props {
	newPetData: PetItemForCreation
	medications: NewPetMedicationItem[]
	procedures: NewPetProcedureItem[]
}

export default function AddPetButton (props: Props) {
	const { newPetData, medications, procedures } = props

	return (
		<div>
			<Button
				colorClass = "bg-green-600"
				hoverClass = "hover:bg-green-700"
				title = {`Add ${newPetName(newPetData.name)}`}
				disabled = {!areAllNewPetFieldsValid(newPetData, medications, procedures)}
				textColor = "text-white"
			/>
		</div>
	)
}
