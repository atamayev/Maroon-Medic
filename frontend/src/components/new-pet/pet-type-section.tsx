import _ from "lodash"
import { useContext } from "react"
import { observer } from "mobx-react"
import AppContext from "src/contexts/maroon-context"
import FormGroup from "../form-group"
import ifPetTypeSelected from "src/helper-functions/patient/new-pet/handle-input-change/if-pet-type-selected"

interface Props {
	newPetData: PetItemForCreation
	setNewPetData: React.Dispatch<React.SetStateAction<PetItemForCreation>>
}

function PetTypeSection (props: Props) {
	const { newPetData, setNewPetData } = props
	const petTypes = useContext(AppContext).patientData?.petTypes

	if (_.isNil(petTypes)) return null

	return (
		<FormGroup
			as = "select"
			onChange = {(e) =>
				ifPetTypeSelected(e.target.value, petTypes, newPetData, setNewPetData)
			}
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

export default observer(PetTypeSection)
