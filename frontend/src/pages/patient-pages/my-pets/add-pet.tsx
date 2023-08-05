import { Form, Button, Card, Container, Row, Col } from "react-bootstrap"
import FormGroup from "../../../components/form-group"
import { addPet } from "../../../custom-hooks/my-pets-hooks/save-my-pets"
import { RenderMessageSection } from "../../../components/saved-message-section"

const ifPetTypeSelected = (
  value: string,
  petTypes: ServicedPetItemType[],
  newPetData: PetItemType,
  setNewPetData: React.Dispatch<React.SetStateAction<PetItemType>>
) => {
  // Find the selected pet type by its ID
  const selectedPetType = petTypes.find(PetType => PetType.pet_listID === JSON.parse(value))
  if (selectedPetType) {
    const newPet = {
      ...newPetData,
      Pet: selectedPetType.Pet,
      Pet_type: selectedPetType.Pet_type,
      pet_listID: selectedPetType.pet_listID
    }

    setNewPetData(newPet)
  }
}

const ifInsuranceSelected = (
  value: string,
  insurances: InsuranceItemType[],
  newPetData: PetItemType,
  setNewPetData: React.Dispatch<React.SetStateAction<PetItemType>>
) => {
  // Find the selected insurance by its ID
  const selectedInsurance = insurances.find(insurance => insurance.insurance_listID === JSON.parse(value))
  if (selectedInsurance) {
    const newPet = {
      ...newPetData,
      insuranceName: selectedInsurance.Insurance_name,
      insurance_listID: selectedInsurance.insurance_listID
    }

    setNewPetData(newPet)
  }
}

function areAllFieldsValid(petData: PetItemType) {
  if (
    !petData.Name ||
    !petData.Gender ||
    !petData.DOB ||
    !petData.Pet_type ||
    !petData.insuranceName
  ) {
    return false
  }
  return true
}

const handleInputChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  newPetData: PetItemType,
  petTypes: ServicedPetItemType[],
  insurances: InsuranceItemType[],
  setNewPetData: React.Dispatch<React.SetStateAction<PetItemType>>
) => {
  const value = event.target.value

  if (event.target.name === "Pet_type") ifPetTypeSelected(value, petTypes, newPetData, setNewPetData)
  else if (event.target.name === "insurance") ifInsuranceSelected(value, insurances, newPetData, setNewPetData)
  else {
    const newPet = { ...newPetData, [event.target.name]: value }
    setNewPetData(newPet)
  }
}

interface AddPetProps {
  newPetData: PetItemType
  setNewPetData: React.Dispatch<React.SetStateAction<PetItemType>>
  petTypes: ServicedPetItemType[]
  insurances: InsuranceItemType[]
  petConfirmation: ConfirmationMessage
  setPetConfirmation: (conf: ConfirmationMessage) => void
  setShowAddPet: React.Dispatch<React.SetStateAction<boolean>>
  savedPetData: PetItemTypeWithID[]
  setSavedPetData: React.Dispatch<React.SetStateAction<PetItemTypeWithID[]>>
}

export const AddPet = (props: AddPetProps) => {
  const { newPetData, setNewPetData, petTypes, insurances, petConfirmation,
    setPetConfirmation, setShowAddPet, savedPetData, setSavedPetData } = props

  const RenderNewPetName = () => {
    if (!newPetData.Name) return <>Pet</>
    return <>{newPetData.Name}</>
  }

  const RenderDeleteButton = () => {
    return (
      <Button
        variant = "danger"
        onClick = {() =>
        {
          setNewPetData({} as PetItemType)
          setShowAddPet(false)
        }}
      >
        X
      </Button>
    )
  }

  const RenderNameSection = () => {
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

  const RenderGenderSection = () => {
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

  const RenderDOBSection = () => {
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

  const RenderPetTypeSection = () => {
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

  const RenderInsuranceSection = () => {
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

  const RenderAddButton = () => {
    return (
      <div>
        <Button
          variant = "primary"
          type = "submit"
          disabled = {!areAllFieldsValid(newPetData)} // Check for both field validity
          onClick = {() => {
            addPet(newPetData, setNewPetData, setPetConfirmation, savedPetData, setSavedPetData, setShowAddPet)
          }}
        >
          Add
          <RenderNewPetName />
        </Button>
      </div>
    )
  }

  return (
    <>
      <Card>
        <Container>
          <Row>
            <Col xs = {8}></Col>
            <Col xs = {4} className = "">
              <RenderDeleteButton />
            </Col>
          </Row>
        </Container>
        <Card.Body>
          <Form>
            <RenderNameSection />

            <RenderGenderSection />

            <RenderDOBSection />

            <RenderPetTypeSection />

            <RenderInsuranceSection />

            Upload image area
            <RenderAddButton />
          </Form>
          <RenderMessageSection
            confirmationMessage = {petConfirmation}
            whatIsBeingSaved = "Pet"
          />
        </Card.Body>
      </Card>
    </>
  )
}
