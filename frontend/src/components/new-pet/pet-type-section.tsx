import FormGroup from "../form-group"
import handleInputChange from "src/helper-functions/patient/new-pet/handle-input-change/handle-input-change"

interface Props {
  newPetData: PetItemForCreation
  petTypes: ServicedPetItem[]
  insurances: InsuranceItem[]
  setNewPetData: React.Dispatch<React.SetStateAction<PetItemForCreation>>
}

const PetTypeSection = (props: Props) => {
  const { newPetData, petTypes, insurances, setNewPetData } = props

  return (
    <FormGroup
      as = "select"
      defaultValue = {""}
      onChange = {
        (e) => handleInputChange(e, newPetData, petTypes, insurances, setNewPetData)
      }
      name = "Pet_type"
      required
      id = "formPetType"
      label = "Type of Pet"
    >
      <option value = "" disabled>Select</option>
      {petTypes.map((PetType) => (
        <option
          key = {PetType.pet_listID}
          value = {PetType.pet_listID}
        >
          {PetType.Pet}
        </option>
      ))}
    </FormGroup>
  )
}

export default PetTypeSection
