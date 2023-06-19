import React, { useState, useEffect, useContext } from 'react';
import {useNavigate} from "react-router-dom";
import { VerifyContext } from '../../contexts/verify-context.js';
import NewAccountForm from '../../components/new-account-form.js';
import {handleNewUserSubmit} from "../../custom-hooks/handle-submits.js"
import { invalidUserAction } from '../../custom-hooks/user-verification-snippets.js';
import PrivatePatientDataService from '../../services/private-patient-data-service.js';
import Header from '../header.js';

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
              if (result.data === false) navigate('/patient-register')
              else if (result.data === true) ;//do nothing
              else navigate('/patient-register')
            })
            .catch (error => {
              if (error.response.status === 401) invalidUserAction(error.response.data)
            })
        }
        else if (result.verified === true && result.user_type === 'Doctor') navigate(`/vet-dashboard`)
        else navigate('/patient-register')
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
