import { Card } from "react-bootstrap"
import Button from "src/components/button"

interface Props {
  pet: SavedPetItem
  setPetToDelete: React.Dispatch<React.SetStateAction<SavedPetItem | null>>
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

const handleShowModal = (props: Props) => {
  const {pet, setPetToDelete, setShowModal} = props
  setPetToDelete(pet)
  setShowModal(true)
}

const SavedPetDataTitle = (props: Props) => {
  const {pet, setPetToDelete, setShowModal} = props

  return (
    <Card.Title>
      {pet.Name}
      <Button
        colorClass = "bg-red-500"
        hoverClass = "hover:bg-red-600"
        title = "X"
        onClick = {() => handleShowModal({pet, setPetToDelete, setShowModal})}
        className = "float-right"
      />
    </Card.Title>
  )
}

export default SavedPetDataTitle
