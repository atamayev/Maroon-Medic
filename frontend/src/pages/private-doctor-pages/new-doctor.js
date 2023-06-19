import React, { useState, useEffect, useContext } from 'react';
import {useNavigate} from "react-router-dom";
import { VerifyContext } from '../../contexts/verify-context.js';
import NewAccountForm from '../../components/new-account-form.js';
import {handleNewUserSubmit} from "../../custom-hooks/handle-submits.js"
import PrivateDoctorDataService from "../../services/private-doctor-data-service.js"
import { invalidUserAction } from '../../custom-hooks/user-verification-snippets.js';
import Header from '../header.js';

export default function NewDoctor () {
  const [newDoctorInfo, setNewDoctorInfo] = useState({});
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const {user_verification} = useContext(VerifyContext);
  const navigate = useNavigate();

  useEffect(() => {
    user_verification()
    .then(result => {
      if (result.verified === true && result.user_type === 'Doctor') {
        PrivateDoctorDataService.newDoctorConfirmation()
          .then(result => {
            if (result.data === false) navigate('/vet-register');
            else if (result.data === true) ;// do nothing
            else navigate('/vet-register');
          })
          .catch(error => {
            if (error.response.status === 401) invalidUserAction(error.response.data)
          })
      }
      else if (result.verified === true && result.user_type === 'Patient') navigate('/patient-dashboard');
      else navigate('/vet-register');
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
              newInfo: newDoctorInfo,
              navigate,
              setError,
              setLoading,
              VetOrPatient: "Vet"
            }
        )}
        newInfo = {newDoctorInfo}
        setNewInfo = {setNewDoctorInfo}
        error = {error}
        loading = {loading}
      />
    </>
  );
};
