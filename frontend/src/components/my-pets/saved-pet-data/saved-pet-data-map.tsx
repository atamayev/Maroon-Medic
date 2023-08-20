import { Card } from "react-bootstrap"
import SavedPetDataTitle from "./saved-pet-data-title"
import SavedPetDataText from "./saved-pet-data-text"

interface Props {
  savedPetData: SavedPetItem[]
  setSavedPetData: React.Dispatch<React.SetStateAction<SavedPetItem[]>>
  setPetToDelete: React.Dispatch<React.SetStateAction<SavedPetItem | null>>
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

const SavedPetDataMap = (props: Props) => {
  const { savedPetData, setPetToDelete, setShowModal } = props

  return (
    <>
      {savedPetData.map((pet) => (
        <Card key = {pet.pet_infoID} style = {{ width: "18rem", marginTop: "10px" }} className = "mb-3">
          <Card.Body>
            <SavedPetDataTitle pet = {pet} setPetToDelete = {setPetToDelete} setShowModal = {setShowModal}/>
            <SavedPetDataText pet = {pet} />
          </Card.Body>
        </Card>
      ))}
    </>
  )
}

export default SavedPetDataMap
