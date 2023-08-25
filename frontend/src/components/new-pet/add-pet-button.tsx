import Button from "../button"

function areAllFieldsValid(petData: PetItemForCreation) {
	if (
		!petData.Name ||
		!petData.Gender ||
		!petData.DOB ||
		!petData.Pet_type ||
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
				title = {`Add ${newPetName(newPetData.Name)}`}
				disabled = {!areAllFieldsValid(newPetData)}
			/>
		</div>
	)
}

export default AddPetButton
