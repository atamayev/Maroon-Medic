import _ from "lodash"
import moment from 'moment'
import { useState, useEffect, useContext } from 'react'
import { Card, Button, Modal  } from 'react-bootstrap'
import { VerifyContext } from '../../../contexts/verify-context'
import { NonPatientAccess } from '../../../components/user-type-unauth'
import { deleteMyPets } from '../../../custom-hooks/my-pets-hooks/save-my-pets'
import { invalidUserAction } from '../../../custom-hooks/user-verification-snippets'
import PrivatePatientDataService from '../../../services/private-patient-data-service'
import { useConfirmationMessage } from '../../../custom-hooks/use-confirmation-message'
import Header from '../../header'
import PatientHeader from '../patient-header'
import { AddPet } from './add-pet'

async function fetchPetData(setSavedPetData) {
  try {
    const response = await PrivatePatientDataService.fetchPetData()
    if (response) {
      setSavedPetData(response.data);
      sessionStorage.setItem("PatientPetData", JSON.stringify(response.data))
    }
  } catch(error) {
    if (error.response.status === 401) invalidUserAction(error.response.data)
  }
}

async function FillPetTypes(setPetTypes) { 
  try {
    const response = await PrivatePatientDataService.fillPetTypes();
    if (response) {
      setPetTypes(response.data);
      sessionStorage.setItem("PetTypes", JSON.stringify(response.data));
    }
  } catch(error) {
    if (error.response.status === 401) invalidUserAction(error.response.data)
  }
}

async function FillInsurances(setInsurances) { 
  try {
    const response = await PrivatePatientDataService.fillInsurances();
    if (response) {
      setInsurances(response.data);
      sessionStorage.setItem("Insurances", JSON.stringify(response.data));
    }
  } catch(error) {
    if (error.response.status === 401) invalidUserAction(error.response.data)
  }
}

export default function MyPets() {
  const {userVerification} = useContext(VerifyContext);
  const [savedPetData, setSavedPetData] = useState(JSON.parse(sessionStorage.getItem("PatientPetData")) || [])
  const [newPetData, setNewPetData] = useState({Name: '', Gender:'', DOB: '', petType: '', insuranceName: ''});
  const [userType, setUserType] = useState(null);
  const [petTypes, setPetTypes] = useState([]);
  const [insurances, setInsurances] = useState([]);
  const [petConfirmation, setPetConfirmation] = useConfirmationMessage();
  const [showAddPet, setShowAddPet] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [petToDelete, setPetToDelete] = useState(null);
  
  const verifyAndSetPetData = async () => {
    const result = await userVerification();
    if (result.verified === true) {
      setUserType(result.userType);
      if (result.userType === 'Patient') {
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
    }
  };

  useEffect(() => {
    verifyAndSetPetData();
  }, []);

  if (userType !== 'Patient') return <NonPatientAccess/>

  const handleShowModal = (pet) => {
    setPetToDelete(pet);
    setShowModal(true);
  };
  
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const renderSavedPetDataTitle = (pet) => {
    return (
      <Card.Title>
        {pet.Name}
        <Button 
          variant = "danger" 
          style = {{ float: 'right' }} 
          onClick = {() => handleShowModal(pet)}
        >
          X
        </Button>
      </Card.Title>
    )
  }

  const renderSavedPetDataText = (pet) => {
    return (
      <Card.Text>
        <p>{pet.Pet}</p>
        <p>Gender: {pet.Gender}</p>
        <p>Date of Birth: {moment(pet.DOB).format('MMMM Do, YYYY')}</p>
        <p>Insurance Name: {pet.insuranceName}</p>
        {/* Add other pet details as needed */}
      </Card.Text>
    )
  }

  const renderSavedPetDataMap = () => {
    return (
      <>
        {savedPetData.map((pet, index) => (
          <Card key = {index} style = {{ width: '18rem', marginTop: '10px' }} className = 'mb-3'>
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
      <Modal show = {showModal} onHide = {handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete {petToDelete?.Name}?</Modal.Body>
        <Modal.Footer>
          <Button variant = "secondary" onClick = {handleCloseModal}>
            Close
          </Button>
          <Button 
            variant = "danger" 
            onClick = {() => {
              deleteMyPets(petToDelete.pet_infoID, savedPetData, setSavedPetData, setPetConfirmation);
              handleCloseModal();
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }

  const renderSavedPetData = () => {
    if (_.isEmpty(savedPetData)) return <></>
    return (
      <>
        {renderSavedPetDataMap()}
        {renderModal()}
      </>
    )
  }

  const renderShowAddPet = () => {
    if (showAddPet) return <></>
    return (
      <>
        <Button 
          variant = "primary" 
          onClick = {() => {setShowAddPet(true)}}
        >Add a Pet
        </Button>
     </>
    )
  }
  
  return (
    <>
      <Header dropdown = {true} search = {true}/>
      <PatientHeader/>
      {renderSavedPetData()}
      {renderShowAddPet()}
      {showAddPet && 
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
      }
    </>
  )
};
