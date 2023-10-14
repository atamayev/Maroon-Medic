import FormGroup from "../form-group"
import handlePetInfoInput from "src/helper-functions/patient/new-pet/handle-input-change/handle-pet-info-input"

interface Props {
	newPetData: PetItemForCreation
	setNewPetData: React.Dispatch<React.SetStateAction<PetItemForCreation>>
}

export default function DOBSection (props: Props) {
	const { newPetData, setNewPetData } = props

	return (
		<FormGroup
			id = "formPetDob"
			className = "mb-3"
			label = "Date of Birth"
			type = "date"
			onChange = {(e) => handlePetInfoInput(e, newPetData, setNewPetData)}
			name = "dateOfBirth"
			value = {newPetData.dateOfBirth || ""}
			required
		/>
	)
}
