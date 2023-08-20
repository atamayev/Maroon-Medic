import { Form, Card, Container, Row, Col } from "react-bootstrap"
import SavedConfirmationMessage from "../../../components/saved-confirmation-message"
import DeleteButton from "src/components/new-pet/delete-button"
import PetNameSection from "src/components/new-pet/name-section"
import PetGenderSection from "src/components/new-pet/gender-section"
import DOBSection from "src/components/new-pet/DOB-section"
import PetTypeSection from "src/components/new-pet/pet-type-section"
import InsuranceSection from "src/components/new-pet/insurance-section"
import AddPetButton from "src/components/new-pet/add-pet-button"

interface AddPetProps {
  newPetData: PetItemForCreation
  setNewPetData: React.Dispatch<React.SetStateAction<PetItemForCreation>>
  petTypes: ServicedPetItem[]
  insurances: InsuranceItem[]
  petConfirmation: ConfirmationMessage
  setPetConfirmation: (conf: ConfirmationMessage) => void
  setShowAddPet: React.Dispatch<React.SetStateAction<boolean>>
  savedPetData: SavedPetItem[]
  setSavedPetData: React.Dispatch<React.SetStateAction<SavedPetItem[]>>
}

const NewPet = (props: AddPetProps) => {
  const { newPetData, setNewPetData, petTypes, insurances, petConfirmation,
    setPetConfirmation, setShowAddPet, savedPetData, setSavedPetData } = props

  return (
    <>
      <Card>
        <Container>
          <Row>
            <Col xs = {8}></Col>
            <Col xs = {4}>
              <DeleteButton
                setNewPetData = {setNewPetData}
                setShowAddPet = {setShowAddPet}
              />
            </Col>
          </Row>
        </Container>
        <Card.Body>
          <Form>
            <PetNameSection
              newPetData = {newPetData}
              petTypes = {petTypes}
              insurances = {insurances}
              setNewPetData = {setNewPetData}
            />

            <PetGenderSection
              newPetData = {newPetData}
              petTypes = {petTypes}
              insurances = {insurances}
              setNewPetData = {setNewPetData}
            />

            <DOBSection
              newPetData = {newPetData}
              petTypes = {petTypes}
              insurances = {insurances}
              setNewPetData = {setNewPetData}
            />

            <PetTypeSection
              newPetData = {newPetData}
              petTypes = {petTypes}
              insurances = {insurances}
              setNewPetData = {setNewPetData}
            />

            <InsuranceSection
              newPetData = {newPetData}
              petTypes = {petTypes}
              insurances = {insurances}
              setNewPetData = {setNewPetData}
            />

            Upload image area
            <AddPetButton
              newPetData = {newPetData}
              setNewPetData = {setNewPetData}
              setPetConfirmation = {setPetConfirmation}
              setShowAddPet = {setShowAddPet}
              savedPetData = {savedPetData}
              setSavedPetData = {setSavedPetData}
            />

          </Form>
          <SavedConfirmationMessage
            confirmationMessage = {petConfirmation}
            whatIsBeingSaved = "Pet"
          />
        </Card.Body>
      </Card>
    </>
  )
}

export default NewPet
