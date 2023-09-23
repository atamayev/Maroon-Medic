import _ from "lodash"
import { useContext } from "react"
import { AppContext } from "src/contexts/maroon-context"
import FormGroup from "../form-group"
import handlePetInfoInput from "src/helper-functions/patient/new-pet/handle-input-change/handle-pet-info-input"
import { observer } from "mobx-react"

interface Props {
	newPetData: PetItemForCreation
	setNewPetData: React.Dispatch<React.SetStateAction<PetItemForCreation>>
}

function InsuranceSection (props: Props) {
	const { newPetData, setNewPetData } = props
	const appContext = useContext(AppContext)

	if (_.isNull(appContext.insurances)) return null

	return (
		<FormGroup
			as = "select"
			onChange = {
				(e) => handlePetInfoInput(e, newPetData, setNewPetData, appContext.insurances!)
			}
			name = "insurance"
			required
			id = "formInsurance"
			label = "Insurance"
			value = {newPetData.insuranceName || ""}
		>
			<option value = "" disabled>Select</option>
			{appContext.insurances.map((insurance) => (
				<option
					key = {insurance.insuranceListId}
					value = {insurance.insuranceName}
				>
					{insurance.insuranceName}
				</option>
			))}
		</FormGroup>
	)
}

export default observer(InsuranceSection)
