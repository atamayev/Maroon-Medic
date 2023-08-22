import { Button } from "react-bootstrap"
import addPet from "src/helper-functions/patient/new-pet/add-pet"

function areAllFieldsValid(petData: PetItemForCreation) {
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


const RenderNewPetName = ({ petName } : { petName: string | null }) => {
  if (!petName) return <>Pet</>
  return <>{petName}</>
}

interface Props {
  newPetData: PetItemForCreation
  setNewPetData: React.Dispatch<React.SetStateAction<PetItemForCreation>>
  setPetConfirmation: (conf: ConfirmationMessage) => void
  setShowAddPet: React.Dispatch<React.SetStateAction<boolean>>
  savedPetData: SavedPetItem[]
  setSavedPetData: React.Dispatch<React.SetStateAction<SavedPetItem[]>>
}

const AddPetButton = (props: Props) => {
  const { newPetData, setNewPetData, setPetConfirmation,
    setShowAddPet, savedPetData, setSavedPetData } = props

  return (
    <div>
      <Button
        variant = "primary"
        type = "submit"
        disabled = {!areAllFieldsValid(newPetData)}
        onClick = {() => {
          addPet(newPetData, setNewPetData, setPetConfirmation, savedPetData, setSavedPetData, setShowAddPet)
        }}
      >
        Add
        <RenderNewPetName petName = {newPetData.Name}/>
      </Button>
    </div>
  )
}

export default AddPetButton
