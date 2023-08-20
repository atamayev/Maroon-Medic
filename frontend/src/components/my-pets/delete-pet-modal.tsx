import { Button, Modal } from "react-bootstrap"
import { deletePet } from "src/custom-hooks/my-pets-hooks/delete-pet"

const handleCloseModal = (setShowModal: React.Dispatch<React.SetStateAction<boolean>>) => {
  setShowModal(false)
}

interface Props {
  showModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  petToDelete: SavedPetItem | null
  savedPetData: SavedPetItem[]
  setSavedPetData: React.Dispatch<React.SetStateAction<SavedPetItem[]>>
  setPetConfirmation: (conf: ConfirmationMessage) => void
}

const DeletePetModal = (props: Props) => {
  const { showModal, setShowModal, petToDelete, savedPetData, setSavedPetData, setPetConfirmation } = props

  return (
    <Modal show = {showModal} onHide = {() => handleCloseModal(setShowModal)}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete {petToDelete?.Name}?</Modal.Body>
      <Modal.Footer>
        <Button variant = "secondary" onClick = {() => handleCloseModal(setShowModal)}>
          Close
        </Button>
        <Button
          variant = "danger"
          onClick = {() => {
            deletePet(petToDelete!.pet_infoID, savedPetData, setSavedPetData, setPetConfirmation)
            handleCloseModal(setShowModal)
          }}
        >
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeletePetModal
