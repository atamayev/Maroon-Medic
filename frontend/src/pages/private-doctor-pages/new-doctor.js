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

  const verifyNewDoctor = async () => {
    const result = await user_verification();
    if (result.verified === true && result.user_type === 'Doctor') {
      try {
        const doctorResult = PrivateDoctorDataService.newDoctorConfirmation()
        if (doctorResult.data === false) navigate('/vet-register');
      } catch (error) {
        if (error.response.status === 401) invalidUserAction(error.response.data)
      }
    }
    else if (result.verified === true && result.user_type === 'Patient') navigate('/patient-dashboard');
    else navigate('/vet-register');
  }

  useEffect(() => {
    verifyNewDoctor()
  }, []);

  return (
    <>
      <Header/>
      <NewAccountForm
        handleSubmit = {(e) =>
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
