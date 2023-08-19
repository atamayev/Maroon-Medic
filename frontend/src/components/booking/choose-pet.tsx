import _ from "lodash"
import { Link } from "react-router-dom"
import { Button } from "react-bootstrap"
import { handlePetChange } from "src/custom-hooks/public-doctor-hooks/booking-page-hooks"
import FormGroup from "../form-group"

interface ChoosePetProps extends BaseBookingProps {
  savedPetData: SavedPetItem[]
  setSelectedPet: React.Dispatch<React.SetStateAction<SavedPetItem | null>>
}

const ChoosePet = (props: ChoosePetProps) => {
  const { savedPetData, setSelectedPet, selectedPet, setSelectedService, setSelectedLocation, setSelectedDay, setSelectedTime } = props

  if (_.isEmpty(savedPetData)) {
    return (
      <div className="col-md-6">
        You need to add a pet to make an appointment
        <Link to = {"/my-pets"}>
          <Button variant="primary">
            <p>Add a Pet</p>
          </Button>
        </Link>
      </div>
    )
  }

  if (savedPetData.length === 1) return <div className="col-md-6">Selected Pet: {selectedPet?.Name}</div>

  return (
    <div className="col-md-6">
      <FormGroup
        as = "select"
        id = "petSelect"
        label = "Select a pet"
        onChange ={(e) =>
          handlePetChange(
            e,
            savedPetData,
            setSelectedPet,
            setSelectedService,
            setSelectedLocation,
            setSelectedDay,
            setSelectedTime
          )
        }
      >
        <option>Select...</option>
        {savedPetData.map((pet, index) => (
          <option key={index} value={pet.pet_infoID}>
            {pet.Name}
          </option>
        ))}
      </FormGroup>
    </div>
  )
}

export default ChoosePet
