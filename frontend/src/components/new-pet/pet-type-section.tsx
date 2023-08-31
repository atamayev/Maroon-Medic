import FormGroup from "../form-group"
import handlePetInfoInput from "src/helper-functions/patient/new-pet/handle-input-change/handle-pet-info-input"

interface Props {
  newPetData: PetItemForCreation
  petTypes: ServicedPetItem[]
  setNewPetData: React.Dispatch<React.SetStateAction<PetItemForCreation>>
}

export default function PetTypeSection (props: Props) {
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
			{petTypes.map((petType) => (
				<option
					key = {petType.petListId}
					value = {petType.pet}
				>
					{petType.pet}
				</option>
			))}
		</FormGroup>
	)
}
