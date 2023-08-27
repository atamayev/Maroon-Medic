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

const AddPetButton = (props: Props) => {
	const { newPetData } = props

	return (
		<div>
			<Button
				//need to make this button  a 'submit' button
				colorClass = "bg-green-500"
				hoverClass = "hover:bg-green-600"
				title = {`Add ${newPetName(newPetData.name)}`}
				disabled = {!areAllFieldsValid(newPetData)}
			/>
		</div>
	)
}

export default AddPetButton
