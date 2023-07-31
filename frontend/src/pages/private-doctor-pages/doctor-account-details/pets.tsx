import _ from "lodash"
import { Card, Button} from "react-bootstrap"
import { RenderMessageSection } from "../../../components/saved-message-section"
import { useConfirmationMessage } from "../../../custom-hooks/use-confirmation-message"
import { handleTogglePetType } from "../../../custom-hooks/account-details-hooks/select"
import { useHandleCheckboxChange } from "../../../custom-hooks/account-details-hooks/callbacks"

export default function RenderPetsSection (props) {
  return (
    <Card className = "mb-3">
      <Card.Header>
        Serviced Pets
      </Card.Header>
      <Card.Body>
        {RenderIsPets(props)}
      </Card.Body>
    </Card>
  )
}

function RenderIsPets (props) {
  const { listDetails, servicedPets, expandedPetTypes, setServicedPets, setExpandedPetTypes } = props
  const [petsConfirmation, setPetsConfirmation] = useConfirmationMessage()

  const petTypes = {}
  if (listDetails.pets) {
    listDetails.pets.forEach(petType => {
      if (!petTypes[petType.Pet_type]) petTypes[petType.Pet_type] = []
      petTypes[petType.Pet_type].push(petType)
    })
  }

  const isTogglePetType = (pets, petType) => {
    if (pets.length <= 1) return null

    const isOpen = expandedPetTypes.includes(petType)
    const renderIsOpen = () => {
      if (isOpen) return "^"
      return "v"
    }

    return (
      <Button onClick={() => handleTogglePetType(petType, setExpandedPetTypes)}>
        {renderIsOpen()}
      </Button>
    )
  }

  const handleCheckboxChange = useHandleCheckboxChange(servicedPets, setServicedPets, setPetsConfirmation)

  const renderShowPetsSection = (pets, petType) => {
    if (pets.length > 1 && !expandedPetTypes.includes(petType)) return null

    return (
      <div>
        {pets.map(pet => {
          return (
            <div key = {pet.pet_listID} style = {{ paddingLeft: "20px" }}>
              <input
                type = "checkbox"
                id = {`${petType}-${pet?.pet_listID}`}
                name = "pet"
                value = {pet?.pet_listID}
                checked = {servicedPets.find((serviced) => serviced.pet_listID === pet.pet_listID) !== undefined}
                onChange = {(event) => {handleCheckboxChange(event, pet)}}
              />
              <label htmlFor = {`${petType}-${pet.pet_listID}`}>{pet.Pet}</label>
            </div>
          )
        })}
      </div>
    )
  }

  const renderPets = () => {
    return (
      <>
        {Object.entries(petTypes).map(([petType, pets]) => (
          <div key = {petType} style = {{ marginBottom: "10px" }}>
            <label htmlFor = {petType}>{petType}</label>
            {isTogglePetType(pets, petType)}
            {renderShowPetsSection(pets, petType)}
          </div>
        ))}
      </>
    )
  }

  if (_.isEmpty(_.uniq(listDetails.pets?.map((item) => item.Category_name)))) return <>Loading...</>

  return (
    <>
      {renderPets()}
      <RenderMessageSection
        confirmationMessage = {petsConfirmation}
        whatIsBeingSaved = "Pets Serviced"
      />
    </>
  )
}
