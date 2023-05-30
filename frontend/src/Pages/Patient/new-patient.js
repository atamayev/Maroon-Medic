import React, { useState, useEffect, useContext } from 'react';
import {useNavigate} from "react-router-dom";
import PrivatePatientDataService from '../../Services/private-patient-data-service.js';
import { VerifyContext } from '../../Contexts/VerifyContext.js';
import NewAccountForm from '../../Components/new-account-form.js';
import Header from '../header.js';
import {handleNewUserSubmit} from "../../Custom Hooks/handle-submits.js"

export default function NewPatient () {
  const [newPatientInfo, setNewPatientInfo] = useState({});
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const {user_verification} = useContext(VerifyContext);
  const navigate = useNavigate();
      
  useEffect(() => {
    user_verification()
      .then(result => {
        if (result.verified === true && result.user_type === 'Patient') {
          PrivatePatientDataService.newPatientConfirmation()
          .then(result => {
            if (result.data === false) {
              navigate('/patient-register');
            }else if (result.data === true) {
            }else{
              navigate('/patient-register');
            }
          })
        }
        else if (result.verified === true && result.user_type === 'Doctor') {
          navigate(`/vet-dashboard`);
        }else{
          navigate('/patient-register')
        }
    })
  }, []);

  return (
    <>
      <Header/>
      <NewAccountForm
        handleSubmit={(e) =>
          handleNewUserSubmit(
            {
              e,
              newInfo: newPatientInfo,
              navigate,
              setError,
              setLoading,
              VetOrPatient: "Patient"
            }
        )}
        newInfo = {newPatientInfo}
        setNewInfo= {setNewPatientInfo}
        error = {error}
        loading = {loading}
      />
    </>
  );
};
