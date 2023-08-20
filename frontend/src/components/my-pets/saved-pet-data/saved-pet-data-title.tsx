import { Card, Button } from "react-bootstrap"

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
        variant = "danger"
        style = {{ float: "right" }}
        onClick = {() => handleShowModal({pet, setPetToDelete, setShowModal})}
      >
        X
      </Button>
    </Card.Title>
  )
}

export default SavedPetDataTitle
