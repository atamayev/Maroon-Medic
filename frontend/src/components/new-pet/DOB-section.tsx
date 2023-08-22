import FormGroup from "../form-group"
import handleInputChange from "src/helper-functions/patient/new-pet/handle-input-change/handle-input-change"

interface Props {
  newPetData: PetItemForCreation
  petTypes: ServicedPetItem[]
  insurances: InsuranceItem[]
  setNewPetData: React.Dispatch<React.SetStateAction<PetItemForCreation>>
}

const DOBSection = (props: Props) => {
  const { newPetData, petTypes, insurances, setNewPetData } = props

  return (
    <FormGroup
      id = "formPetDob"
      className = {"mb-3"}
      label = "Date of Birth"
      type = "date"
      onChange = {(e) => handleInputChange(e, newPetData, petTypes, insurances, setNewPetData)}
      name = "DOB"
    />
  )
}

export default DOBSection
