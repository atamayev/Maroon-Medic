import FormGroup from "../form-group"
import handlePetInfoInput from "src/helper-functions/patient/new-pet/handle-input-change/handle-pet-info-input"

interface Props {
	newPetData: PetItemForCreation
	setNewPetData: React.Dispatch<React.SetStateAction<PetItemForCreation>>
}

export default function PetNameSection (props: Props) {
	const { newPetData,  setNewPetData } = props

	return (
		<FormGroup
			className = "mb-3"
			label = "Pet Name:"
			type = "text"
			onChange = {(e) => handlePetInfoInput(e, newPetData, setNewPetData)}
			name = "name"
			placeholder = "Hedwig"
			required
			value = {newPetData.name || ""}
		/>
	)
}
