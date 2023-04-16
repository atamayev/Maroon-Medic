import React, { useState, useEffect, useContext } from 'react';
import {useNavigate} from "react-router-dom";
import PrivateDoctorDataService from "../../Services/private-doctor-data-service.js"
import { VerifyContext } from '../../Contexts/VerifyContext.js';
import NewAccountForm from '../../Components/new-account-form.js';
import Header from '../header.js';
import {handleNewUserSubmit} from "../../Custom Hooks/handle-submits.js"

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
              if (result.data === false) {
                navigate('vet-register');
              }else if (result.data === true) {
              }else{
                navigate('/vet-register');
              }
            })
        }else if (result.verified === true && result.user_type === 'Patient') {
          navigate('/patient-dashboard');
        }else{
          navigate('/vet-register');
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
