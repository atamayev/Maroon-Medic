import { Modal } from "react-bootstrap"
import Button from "../button"
import deletePet from "src/helper-functions/patient/my-pets/delete-pet"

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
        <Button
          title = "Close"
          colorClass= "bg-gray-500"
          hoverClass = "hover:bg-gray-600"
          onClick = {() => handleCloseModal(setShowModal)}
        />

        <Button
          title = "Delete"
          colorClass= "bg-red-500"
          hoverClass = "hover:bg-red-600"
          onClick = {() => {
            deletePet(petToDelete!.pet_infoID, savedPetData, setSavedPetData, setPetConfirmation)
            handleCloseModal(setShowModal)
          }}
        />

      </Modal.Footer>
    </Modal>
  )
}

export default DeletePetModal
