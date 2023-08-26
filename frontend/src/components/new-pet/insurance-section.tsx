import FormGroup from "../form-group"
import handlePetInfoInput from "src/helper-functions/patient/new-pet/handle-input-change/handle-pet-info-input"

interface Props {
  newPetData: PetItemForCreation
  insurances: InsuranceItem[]
  setNewPetData: React.Dispatch<React.SetStateAction<PetItemForCreation>>
}

const InsuranceSection = (props: Props) => {
	const { newPetData, insurances, setNewPetData } = props

	return (
		<FormGroup
			as = "select"
			onChange = {
				(e) => handlePetInfoInput(e, newPetData, setNewPetData, insurances)
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
					key = {insurance.insurance_listID}
					value = {insurance.Insurance_name}
				>
					{insurance.Insurance_name}
				</option>
			))}
		</FormGroup>
	)
}

export default InsuranceSection
