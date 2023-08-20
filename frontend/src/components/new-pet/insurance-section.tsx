import FormGroup from "../form-group"
import handleInputChange from "src/custom-hooks/new-pet/handle-input-change"

interface Props {
  newPetData: PetItemForCreation
  petTypes: ServicedPetItem[]
  insurances: InsuranceItem[]
  setNewPetData: React.Dispatch<React.SetStateAction<PetItemForCreation>>
}

const InsuranceSection = (props: Props) => {
  const { newPetData, petTypes, insurances, setNewPetData } = props

  return (
    <FormGroup
      as = "select"
      defaultValue = {""}
      onChange = {
        (e) => handleInputChange(e, newPetData, petTypes, insurances, setNewPetData)
      }
      name = "insurance"
      required
      id = "formInsurance"
      label = "Insurance"
    >
      <option value = "" disabled>Select</option>
      {insurances.map((insurance) => (
        <option
          key = {insurance.insurance_listID}
          value = {insurance.insurance_listID}
        >
          {insurance.Insurance_name}
        </option>
      ))}
    </FormGroup>
  )
}

export default InsuranceSection
