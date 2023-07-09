import _ from "lodash"
import moment from "moment"
import { useState, useEffect } from "react"
import { Card, Button, Modal  } from "react-bootstrap"
import { NonPatientAccess } from "../../../components/user-type-unauth"
import { deleteMyPets } from "../../../custom-hooks/my-pets-hooks/save-my-pets"
import { useConfirmationMessage } from "../../../custom-hooks/use-confirmation-message"
import useSimpleUserVerification from "../../../custom-hooks/use-simple-user-verification"
import { FillInsurances, FillPetTypes, fetchPetData } from "../../../custom-hooks/my-pets-hooks/my-pets"
import Header from "../../header"
import PatientHeader from "../patient-header"
import { AddPet } from "./add-pet"

function usePetData(userType) {
  const [savedPetData, setSavedPetData] = useState(JSON.parse(sessionStorage.getItem("PatientPetData")) || [])
  const [petTypes, setPetTypes] = useState([]);
  const [insurances, setInsurances] = useState([]);

  const fetchAndSetPetData = async () => {
    if (userType === "Patient") {
      try {
        const storedPetData = sessionStorage.getItem("PatientPetData");
        if (storedPetData) setSavedPetData(JSON.parse(storedPetData));
        else fetchPetData(setSavedPetData);

        const storedPetTypes = sessionStorage.getItem("PetTypes");
        if (storedPetTypes) setPetTypes(JSON.parse(storedPetTypes));
        else FillPetTypes(setPetTypes);

        const storedInsurances = sessionStorage.getItem("Insurances");
        if (storedInsurances) setInsurances(JSON.parse(storedInsurances));
        else FillInsurances(setInsurances);
      } catch (error) {
      }
    }
  };

  useEffect(() => {
    fetchAndSetPetData();
  }, [userType]);

  return { savedPetData, setSavedPetData, petTypes, insurances };
}

const handleShowModal = (pet, setPetToDelete, setShowModal) => {
  setPetToDelete(pet);
  setShowModal(true);
};

const handleCloseModal = (setShowModal) => {
  setShowModal(false);
};

export default function MyPets() {
  const { userType } = useSimpleUserVerification();
  const { savedPetData, setSavedPetData, petTypes, insurances } = usePetData(userType);
  const [petConfirmation, setPetConfirmation] = useConfirmationMessage();
  const [newPetData, setNewPetData] = useState({Name: "", Gender:"", DOB: "", Pet: "", Pet_type: "", insuranceName: ""});
  const [showAddPet, setShowAddPet] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [petToDelete, setPetToDelete] = useState(null);

  if (userType !== "Patient") return <NonPatientAccess/>

  const renderSavedPetDataTitle = (pet) => {
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

  const renderSavedPetDataText = (pet) => {
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

  const renderSavedPetDataMap = () => {
    return (
      <>
        {savedPetData.map((pet) => (
          <Card key = {pet.pet_infoID} style = {{ width: "18rem", marginTop: "10px" }} className = "mb-3">
            <Card.Body>
              {renderSavedPetDataTitle(pet)}
              {renderSavedPetDataText(pet)}
            </Card.Body>
          </Card>
        ))}
      </>
    )
  }

  const renderModal = () => {
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
              deleteMyPets(petToDelete.pet_infoID, savedPetData, setSavedPetData, setPetConfirmation);
              handleCloseModal(setShowModal);
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }

  const renderSavedPetData = () => {
    if (_.isEmpty(savedPetData)) return null
    return (
      <>
        {renderSavedPetDataMap()}
        {renderModal()}
      </>
    )
  }

  const renderShowAddPet = () => {
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

  const renderAddPet = () => {
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
      {renderSavedPetData()}
      {renderShowAddPet()}
      {renderAddPet()}
    </>
  )
};
