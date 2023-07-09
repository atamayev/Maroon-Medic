import { Form, Button, Card,Container, Row, Col } from "react-bootstrap"
import FormGroup from "../../../components/form-group"
import { addMyPets } from "../../../custom-hooks/my-pets-hooks/save-my-pets"
import { renderMessageSection } from "../../../components/saved-message-section"

const ifPetTypeSelected = (value, petTypes, newPetData, setNewPetData) => {
  // Find the selected pet type by its ID
  let selectedPetType = petTypes.find(PetType => PetType.pet_listID === JSON.parse(value))
  let newPet = {
    ...newPetData,
    Pet: selectedPetType.Pet,
    Pet_type: selectedPetType.Pet_type,
    pet_listID: selectedPetType.pet_listID
  }

  setNewPetData(newPet)
}

const ifInsuranceSelected = (value, insurances, newPetData, setNewPetData) => {
  // Find the selected insurance by its ID
  let selectedInsurance = insurances.find(insurance => insurance.insurance_listID === JSON.parse(value))
  let newPet = {
    ...newPetData,
    insuranceName: selectedInsurance.Insurance_name,
    insurance_listID: selectedInsurance.insurance_listID
  }

  setNewPetData(newPet)
}

function areAllFieldsValid(petData) {
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

const handleInputChange = (event, petTypes, insurances, newPetData, setNewPetData) => {
  let value = event.target.value

  if (event.target.name === "Pet_type") ifPetTypeSelected(value, petTypes, newPetData, setNewPetData)
  else if (event.target.name === "insurance") ifInsuranceSelected(value, insurances, newPetData, setNewPetData)
  else {
    let newPet = { ...newPetData, [event.target.name]: value }
    setNewPetData(newPet)
  }
}

export const AddPet = (props) => {
  const { newPetData, setNewPetData, petTypes, insurances, petConfirmation, setPetConfirmation, setShowAddPet, savedPetData, setSavedPetData } = props

  const renderNewPetName = () => {
    if (!newPetData.Name) return <>Pet</>
    return <>{newPetData.Name}</>
  }

  const renderDeleteButton = () => {
    return (
      <Button
        variant = "danger"
        onClick = {() =>
        {
          setNewPetData({})
          setShowAddPet(false)
        }}
      >
        X
      </Button>
    )
  }

  const renderNameSection = () => {
    return (
      <FormGroup
        id = "formPetName"
        className = {"mb-3"}
        label = "Pet Name:"
        type = "text"
        onChange = {(e) => handleInputChange (e, petTypes, insurances, newPetData, setNewPetData)}
        name = "Name"
      />
    )
  }

  const renderGenderSection = () => {
    return (
      <Form.Group id = "formPetGender">
        <Form.Label>Gender</Form.Label>
        <Form.Check type = "radio" label = "Male" name = "Gender" value = "Male" onChange = {(e) => handleInputChange (e, petTypes, insurances, newPetData, setNewPetData)} />
        <Form.Check type = "radio" label = "Female" name = "Gender" value = "Female" onChange = {(e) => handleInputChange (e, petTypes, insurances, newPetData, setNewPetData)} />
      </Form.Group>
    )
  }

  const renderDOBSection = () => {
    return (
      <FormGroup
        id = "formPetDob"
        className = {"mb-3"}
        label = "Date of Birth"
        type = "date"
        onChange = {(e) => handleInputChange (e, petTypes, insurances, newPetData, setNewPetData)}
        name = "DOB"
      />
    )
  }

  const renderPetTypeSection = () => {
    return (
      <Form.Group id = "formPetType">
        <Form.Label>Type of Pet</Form.Label>
        <Form.Control
          as = "select"
          defaultValue = {""}
          onChange = {(e) => handleInputChange (e, petTypes, insurances, newPetData, setNewPetData)}
          name = "Pet_type"
          required
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
        </Form.Control>
      </Form.Group>
    )
  }

  const renderInsuranceSection = () => {
    return (
      <Form.Group id = "formInsurance">
        <Form.Label>Insurance</Form.Label>
        <Form.Control
          as = "select"
          defaultValue = {""}
          onChange = {(e) => handleInputChange (e, petTypes, insurances, newPetData, setNewPetData)}
          name = "insurance"
          required
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
        </Form.Control>
      </Form.Group>
    )
  }

  const renderAddButton = () => {
    return (
      <div>
        <Button
          variant = "primary"
          type = "submit"
          disabled = {!areAllFieldsValid(newPetData)} // Check for both field validity
          onClick = {(e) => {
            e.preventDefault()
            addMyPets(newPetData, setNewPetData, setPetConfirmation, savedPetData, setSavedPetData, setShowAddPet)
          }}
        >
          Add {renderNewPetName()}
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
              {renderDeleteButton()}
            </Col>
          </Row>
        </Container>
        <Card.Body>
          <Form>
            {renderNameSection()}

            {renderGenderSection()}

            {renderDOBSection()}

            {renderPetTypeSection()}

            {renderInsuranceSection()}

            Upload image area
            {renderAddButton()}
          </Form>
          {renderMessageSection(petConfirmation, "Pet")}
        </Card.Body>
      </Card>
    </>
  )
}
