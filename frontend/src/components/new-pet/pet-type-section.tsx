import FormGroup from "../form-group"
import handlePetInfoInput from "src/helper-functions/patient/new-pet/handle-input-change/handle-pet-info-input"

interface Props {
  newPetData: PetItemForCreation
  petTypes: ServicedPetItem[]
  setNewPetData: React.Dispatch<React.SetStateAction<PetItemForCreation>>
}

const PetTypeSection = (props: Props) => {
	const { newPetData, petTypes, setNewPetData } = props

	return (
		<FormGroup
			as = "select"
			onChange = {(e) => handlePetInfoInput(e, newPetData, setNewPetData, petTypes)}
			name = "petType"
			required
			id = "formPetType"
			label = "Type of Pet"
			value = {newPetData.pet || ""}
		>
			<option value = "" disabled>Select</option>
			{petTypes.map((PetType) => (
				<option
					key = {PetType.pet_listID}
					value = {PetType.pet}
				>
					{PetType.pet}
				</option>
			))}
		</FormGroup>
	)
}

export default PetTypeSection
