import Button from "../button"

function areAllFieldsValid(petData: PetItemForCreation) {
	if (
		!petData.name ||
		!petData.gender ||
		!petData.dateOfBirth ||
		!petData.petType ||
		!petData.insuranceName
	) {
		return false
	}
	return true
}

const newPetName = (petName: string | null) => {
	if (!petName) return "Pet"
	return petName
}

interface Props {
	newPetData: PetItemForCreation
}

export default function AddPetButton (props: Props) {
	const { newPetData } = props

	return (
		<div>
			<Button
				colorClass = "bg-green-600"
				hoverClass = "hover:bg-green-700"
				title = {`Add ${newPetName(newPetData.name)}`}
				disabled = {!areAllFieldsValid(newPetData)}
				textColor = "text-white"
			/>
		</div>
	)
}
