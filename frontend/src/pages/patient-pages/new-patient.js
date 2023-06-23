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

  const verifyNewPatient = async () => {
    const result = await user_verification();

    if (result.verified === true && result.user_type === 'Patient') {
      try {
        const patientResult = await PrivatePatientDataService.newPatientConfirmation();
        if (patientResult.data === false) navigate('/patient-register');
      } catch (error) {
        if (error.response.status === 401) invalidUserAction(error.response.data);
      }
    } 
    else if (result.verified === true && result.user_type === 'Doctor') navigate(`/vet-dashboard`);
    else navigate('/patient-register');
  }
      
  useEffect(() => {
    verifyNewPatient();
  }, []);

  return (
    <>
      <Header/>
      <NewAccountForm
        handleSubmit = {(e) =>
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
        setNewInfo = {setNewPatientInfo}
        error = {error}
        loading = {loading}
      />
    </>
  );
};
