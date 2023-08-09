import _ from "lodash"
import { Card, Button} from "react-bootstrap"
import { RenderMessageSection } from "../../../components/saved-message-section"
import { useConfirmationMessage } from "../../../custom-hooks/use-confirmation-message"
import { handleTogglePetType } from "../../../custom-hooks/account-details-hooks/select"
import { useHandleCheckboxChange } from "../../../custom-hooks/account-details-hooks/callbacks"

interface Props {
  listDetails: DoctorListDetails
  servicedPets: ServicedPetItem[]
  expandedPetTypes: string[]
  setServicedPets: React.Dispatch<React.SetStateAction<ServicedPetItem[]>>
  setExpandedPetTypes: React.Dispatch<React.SetStateAction<string[]>>
}

export default function RenderPetsSection (props: Props) {
  return (
    <Card className = "mb-3">
      <Card.Header>
        Serviced Pets
      </Card.Header>
      <Card.Body>
        <RenderIsPets {...props} />
      </Card.Body>
    </Card>
  )
}

function RenderIsPets (props: Props) {
  const { listDetails, servicedPets, expandedPetTypes, setServicedPets, setExpandedPetTypes } = props
  const [petsConfirmation, setPetsConfirmation] = useConfirmationMessage()

  type PetTypesType = {
    [key: string]: ServicedPetItem[]
  }

  const petTypes: PetTypesType = {}
  if (listDetails.pets) {
    listDetails.pets.forEach(petType => {
      if (!petTypes[petType.Pet_type]) petTypes[petType.Pet_type] = []
      petTypes[petType.Pet_type].push(petType)
    })
  }

  const isTogglePetType = (pets: ServicedPetItem[], petType: string) => {
    if (pets.length <= 1) return null

    const isOpen = expandedPetTypes.includes(petType)

    const RenderIsOpen = () => {
      if (isOpen) return <>^</>
      return <>v</>
    }

    return (
      <Button onClick={() => handleTogglePetType(petType, setExpandedPetTypes)}>
        <RenderIsOpen />
      </Button>
    )
  }

  const handleCheckboxChange = useHandleCheckboxChange(servicedPets, setServicedPets, setPetsConfirmation)

  const RenderShowPetsSection = ({pets, petType} : {pets: ServicedPetItem[], petType: string}) => {
    if (pets.length > 1 && !expandedPetTypes.includes(petType)) return null

    return (
      <div>
        {pets.map(pet => {
          return (
            <div key = {pet.pet_listID} style = {{ paddingLeft: "20px" }}>
              <input
                type = "checkbox"
                id = {`${petType}-${pet.pet_listID}`}
                name = "pet"
                value = {pet.pet_listID}
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

  const RenderPets = () => {
    return (
      <>
        {Object.entries(petTypes).map(([petType, pets]) => (
          <div key = {petType} style = {{ marginBottom: "10px" }}>
            <label htmlFor = {petType}>{petType}</label>
            {isTogglePetType(pets, petType)}
            <RenderShowPetsSection pets = {pets} petType = {petType} />
          </div>
        ))}
      </>
    )
  }

  if (_.isEmpty(_.uniq(listDetails.pets.map((item) => item.Pet_type)))) return <>Loading...</>

  return (
    <>
      <RenderPets />
      <RenderMessageSection
        confirmationMessage = {petsConfirmation}
        whatIsBeingSaved = "Pets Serviced"
      />
    </>
  )
}
