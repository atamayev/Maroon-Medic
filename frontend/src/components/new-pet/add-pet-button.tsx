import Button from "../button"
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


const newPetName = (petName: string | null) => {
  if (!petName) return "Pet"
  return {petName}
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
        //need to make this button  a 'submit' button
        colorClass = "bg-amber-500"
        hoverClass = "hover:bg-amber-600"
        title = {`Add ${newPetName(newPetData.Name)}`}
        onClick = {() => {
          addPet(newPetData, setNewPetData, setPetConfirmation, savedPetData, setSavedPetData, setShowAddPet)
        }}
        disabled = {!areAllFieldsValid(newPetData)}
      />
    </div>
  )
}

export default AddPetButton
