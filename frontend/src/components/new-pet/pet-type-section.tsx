import _ from "lodash"
import { observer } from "mobx-react"
import { useContext } from "react"
import { AppContext } from "src/contexts/maroon-context"
import FormGroup from "../form-group"
import handlePetInfoInput from "src/helper-functions/patient/new-pet/handle-input-change/handle-pet-info-input"

interface Props {
	newPetData: PetItemForCreation
	setNewPetData: React.Dispatch<React.SetStateAction<PetItemForCreation>>
}

function PetTypeSection (props: Props) {
	const { newPetData, setNewPetData } = props
	const appContext = useContext(AppContext)

	if (_.isNull(appContext.petTypes)) return null

	return (
		<FormGroup
			as = "select"
			onChange = {(e) => handlePetInfoInput(e, newPetData, setNewPetData, appContext.petTypes!)}
			name = "petType"
			required
			id = "formPetType"
			label = "Type of Pet"
			value = {newPetData.pet || ""}
		>
			<option value = "" disabled>Select</option>
			{appContext.petTypes.map((petType) => (
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
