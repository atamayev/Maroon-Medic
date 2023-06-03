import React, { useState, useEffect, useContext } from 'react'
import { Card, Button } from 'react-bootstrap'
import PrivatePatientDataService from '../../../Services/private-patient-data-service'
import { VerifyContext } from '../../../Contexts/VerifyContext'
import { NonPatientAccess } from '../../../Components/user-type-unauth'
import moment from 'moment'
import PatientHeader from '../patient-header'
import Header from '../../header'
import AddPet from './AddPet'
import { useConfirmationMessage } from '../../../Custom Hooks/useConfirmationMessage'
import { handleDeletePet } from '../../../Custom Hooks/Hooks for My Pets/delete'
import { handleAddPet } from '../../../Custom Hooks/Hooks for My Pets/add'

async function fetchPetData(setPetData){
  try{
    const response = await PrivatePatientDataService.fetchPetData()
    if (response){
      setPetData(response.data);
      sessionStorage.setItem("PatientPetData", JSON.stringify(response.data))
    }else{
      console.log('no response')
    }
  }catch(error){
    console.log('unable to fillPet Data', error)
  }
}

async function FillPetTypes(setPetTypes){ 
  try{
    const response = await PrivatePatientDataService.fillPetTypes();
    if (response){
      setPetTypes(response.data);
        sessionStorage.setItem("PetTypes", JSON.stringify(response.data));
    }else{
      console.log('no response');
    }
  }catch(error){
    console.log('unable to fill PetTypes', error)
  }
}

export default function MyPets() {
  const {user_verification} = useContext(VerifyContext)
  const [savedPetData, setSavedPetData] = useState(JSON.parse(sessionStorage.getItem("PatientPetData")) || [])
  const [petData, setPetData] = useState([]);
  const [user_type, setUser_type] = useState(null);
  const [petTypes, setPetTypes] = useState([]);
  const [servicesConfirmation, setServicesConfirmation] = useConfirmationMessage();
  const [showAddPet, setShowAddPet] = useState(false);

  useEffect(() => {
    user_verification()
    .then(result => {
      if (result.verified === true) {
        setUser_type(result.user_type)
        if(result.user_type === 'Patient'){
          try{
            const storedPetData = sessionStorage.getItem("PatientPetData")
            if (storedPetData){
              setPetData(JSON.parse(storedPetData));
            }else{
              fetchPetData(setPetData);
            }

            const storedPetTypes = sessionStorage.getItem("PetTypes")
            if(storedPetTypes){
              setPetTypes(JSON.parse(storedPetTypes));
            }else{
              FillPetTypes(setPetTypes);
            }
          }catch(error){
            console.log(error)
          }
        }
      }
    })
    .catch(error => {
      console.error(error);
    });
  }, []);

  if(user_type !== 'Patient'){
    return(
      <NonPatientAccess/>
    )
  }

  return (
    <>
      <Header dropdown = {true} search = {true}/>
      <PatientHeader/>
      {console.log(petData)}
      {savedPetData.length ? (
        <>
          {savedPetData.map((pet, index) => (
          <Card key={index} style={{ width: '18rem', marginTop: '10px' }} className='mb-3'>
            <Card.Body>
              <Card.Title>
                {pet.Name}
                <Button variant="danger" style={{ float: 'right' }} onClick={() => handleDeletePet(pet.pet_infoID, petData, setPetData)}>X</Button>
              </Card.Title>
              <Card.Text>
                <p>Gender: {pet.Gender}</p>
                <p>Date of Birth: {pet.DOB}</p>
                {/* Add other pet details as needed */}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
        </>
      ) : 
      (<>
      </>)}
      {showAddPet ? (
        <>
        </>
      )
      :
      (
        <>
          <Button variant="primary" onClick={() => {
            handleAddPet(petData, setPetData);
            setShowAddPet(true);
          }}>Add a Pet
          </Button>
        </>
      )}

      {showAddPet && 
        <AddPet 
          petData = {petData}
          setPetData = {setPetData}
          petTypes = {petTypes}
          servicesConfirmation = {servicesConfirmation}
          setServicesConfirmation = {setServicesConfirmation}
          setShowAddPet = {setShowAddPet}
        />
      }
    </>
  )
};
