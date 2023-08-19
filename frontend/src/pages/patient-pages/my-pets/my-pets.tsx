import _ from "lodash"
import moment from "moment"
import { useState } from "react"
import { Card, Button, Modal  } from "react-bootstrap"
import UnauthorizedUser from "../../../components/unauthorized-user/unauthorized-user"
import { deletePet } from "src/custom-hooks/my-pets-hooks/delete-pet"
import { useConfirmationMessage } from "../../../custom-hooks/use-confirmation-message"
import useSimpleUserVerification from "../../../custom-hooks/use-simple-user-verification"
import { usePetData } from "src/custom-hooks/my-pets-hooks/my-pets"
import Header from "../../../components/header/header"
import PatientHeader from "../patient-header"
import { AddPet } from "./add-pet"

const handleShowModal = (
  pet: SavedPetItem,
  setPetToDelete: React.Dispatch<React.SetStateAction<SavedPetItem | null>>,
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setPetToDelete(pet)
  setShowModal(true)
}

const handleCloseModal = (setShowModal: React.Dispatch<React.SetStateAction<boolean>>) => {
  setShowModal(false)
}

export default function MyPets() {
  const { userType } = useSimpleUserVerification()
  const [petConfirmation, setPetConfirmation] = useConfirmationMessage()
  const [newPetData, setNewPetData] = useState<PetItemForCreation>(
    {Name: "", Gender:"", DOB: "", Pet: "", Pet_type: "", insuranceName: "", pet_listID: -1, insurance_listID: -1}
  )
  const [showAddPet, setShowAddPet] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [petToDelete, setPetToDelete] = useState<SavedPetItem | null>(null)
  const { savedPetData, setSavedPetData, petTypes, insurances } = usePetData(userType)
  if (userType !== "Patient") return <UnauthorizedUser vetOrpatient = {"patient"}/>

  const RenderSavedPetDataTitle = ({pet} : {pet: SavedPetItem}) => {
    return (
      <Card.Title>
        {pet.Name}
        <Button
          variant = "danger"
          style = {{ float: "right" }}
          onClick = {() => handleShowModal(pet, setPetToDelete, setShowModal)}
        >
          X
        </Button>
      </Card.Title>
    )
  }

  const RenderSavedPetDataText = ({pet} : {pet: SavedPetItem}) => {
    return (
      <div>
        <p>{pet.Pet}</p>
        <p>Gender: {pet.Gender}</p>
        <p>Date of Birth: {moment(pet.DOB).format("MMMM Do, YYYY")}</p>
        <p>Insurance Name: {pet.insuranceName}</p>
        {/* Add other pet details as needed */}
      </div>
    )
  }

  const RenderSavedPetDataMap = () => {
    return (
      <>
        {savedPetData.map((pet) => (
          <Card key = {pet.pet_infoID} style = {{ width: "18rem", marginTop: "10px" }} className = "mb-3">
            <Card.Body>
              <RenderSavedPetDataTitle pet = {pet} />
              <RenderSavedPetDataText pet = {pet} />
            </Card.Body>
          </Card>
        ))}
      </>
    )
  }

  const RenderModal = () => {
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

  const RenderSavedPetData = () => {
    if (_.isEmpty(savedPetData)) return null
    return (
      <>
        <RenderSavedPetDataMap />
        <RenderModal />
      </>
    )
  }

  const RenderShowAddPet = () => {
    if (showAddPet) return null
    return (
      <>
        <Button
          variant = "primary"
          onClick = {() => {setShowAddPet(true)}}
        >
          Add a Pet
        </Button>
      </>
    )
  }

  const RenderAddPet = () => {
    if (!showAddPet) return null
    return (
      <AddPet
        newPetData = {newPetData}
        setNewPetData = {setNewPetData}
        petTypes = {petTypes}
        insurances = {insurances}
        petConfirmation = {petConfirmation}
        setPetConfirmation = {setPetConfirmation}
        setShowAddPet = {setShowAddPet}
        savedPetData = {savedPetData}
        setSavedPetData = {setSavedPetData}
      />
    )
  }

  return (
    <>
      <Header dropdown = {true} search = {true}/>
      <PatientHeader/>
      <RenderSavedPetData />
      <RenderShowAddPet />
      <RenderAddPet />
    </>
  )
}
