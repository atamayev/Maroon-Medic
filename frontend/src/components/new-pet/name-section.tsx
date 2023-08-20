import FormGroup from "../form-group"
import handleInputChange from "src/custom-hooks/new-pet/handle-input-change"

interface Props {
  newPetData: PetItemForCreation
  petTypes: ServicedPetItem[]
  insurances: InsuranceItem[]
  setNewPetData: React.Dispatch<React.SetStateAction<PetItemForCreation>>
}

const PetNameSection = (props: Props) => {
  const { newPetData, petTypes, insurances, setNewPetData } = props
  return (
    <FormGroup
      id = "formPetName"
      className = {"mb-3"}
      label = "Pet Name:"
      type = "text"
      onChange = {(e) => handleInputChange(e, newPetData, petTypes, insurances, setNewPetData)}
      name = "Name"
    />
  )
}

export default PetNameSection
