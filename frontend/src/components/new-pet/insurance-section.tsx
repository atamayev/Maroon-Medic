import _ from "lodash"
import { useContext } from "react"
import { observer } from "mobx-react"
import AppContext from "src/contexts/maroon-context"
import FormGroup from "../form-group"
import ifInsuranceSelected from "src/helper-functions/patient/new-pet/handle-input-change/if-insurance-selected"

interface Props {
	newPetData: PetItemForCreation
	setNewPetData: React.Dispatch<React.SetStateAction<PetItemForCreation>>
}

function InsuranceSection (props: Props) {
	const { newPetData, setNewPetData } = props
	const insurances = useContext(AppContext).patientData?.insurances

	if (_.isNil(insurances)) return null

	return (
		<FormGroup
			as = "select"
			onChange = {
				(e) => ifInsuranceSelected(e.target.value, insurances, newPetData, setNewPetData)
			}
			name = "insurance"
			required
			id = "formInsurance"
			label = "Insurance"
			value = {newPetData.insuranceName || ""}
		>
			<option value = "" disabled>Select</option>
			{insurances.map((insurance) => (
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
