import usePetsCheckboxChange from "src/custom-hooks/account-details/callbacks/use-pets-checkbox-change"

interface Props {
  pets: ServicedPetItem[]
  petType: string
  servicedPets: ServicedPetItem[]
  setServicedPets: React.Dispatch<React.SetStateAction<ServicedPetItem[]>>
  setPetsConfirmation: (conf: ConfirmationMessage) => void
  expandedPetTypes: string[]
}
const ShowPetsSection = (props: Props) => {
  const { pets, petType, servicedPets, setServicedPets, setPetsConfirmation, expandedPetTypes } = props

  const handleCheckboxChange = usePetsCheckboxChange(servicedPets, setServicedPets, setPetsConfirmation)

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

export default ShowPetsSection
