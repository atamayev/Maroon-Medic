import { Form } from "react-bootstrap"
import handleInputChange from "src/custom-hooks/new-pet/handle-input-change"

interface Props {
  newPetData: PetItemForCreation
  petTypes: ServicedPetItem[]
  insurances: InsuranceItem[]
  setNewPetData: React.Dispatch<React.SetStateAction<PetItemForCreation>>
}

const PetGenderSection = (props: Props) => {
  const { newPetData, petTypes, insurances, setNewPetData } = props

  return (
    <Form.Group id = "formPetGender">
      <Form.Label>Gender</Form.Label>
      <Form.Check type = "radio" label = "Male" name = "Gender" value = "Male"
        onChange = {(e) => handleInputChange(e, newPetData, petTypes, insurances, setNewPetData)} />

      <Form.Check type = "radio" label = "Female" name = "Gender" value = "Female"
        onChange = {(e) => handleInputChange(e, newPetData, petTypes, insurances, setNewPetData)} />
    </Form.Group>
  )
}

export default PetGenderSection
