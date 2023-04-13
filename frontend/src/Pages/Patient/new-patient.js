import React, { useState, useEffect, useContext } from 'react';
import {useNavigate} from "react-router-dom";
import DataService from "../../Services/data-service.js"
import { VerifyContext } from '../../Contexts/VerifyContext.js';
import NewAccountForm from '../../Components/new-account-form.js';

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
        DataService.newPatientConfirmation()
        .then(result => {
          if (result.data === false) {
            navigate('patient-register');
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
  
  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        setError("")
        setLoading(true)
        const bool = await DataService.addingPatientInfo(newPatientInfo)
        if(bool.data === true){
          // navigate("/dashboard");// this would be more efficient i think, but when navigate is used, the data doesn't load in time
          window.location.href = '/patient-dashboard';
        }
      } catch (err) {
        console.log('err in adding data 1',err)
        setError(err.response.data);
      }
      setLoading(false)
  }

  return (
    <NewAccountForm
    handleSubmit={handleSubmit}
    newInfo={newPatientInfo}
    setNewInfo={setNewPatientInfo}
    error={error}
    loading = {loading}
  />
  );
};
