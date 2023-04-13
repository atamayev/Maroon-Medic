import React, { useState, useEffect, useContext } from 'react';
import {useNavigate} from "react-router-dom";
import PrivateDoctorDataService from "../../Services/private-doctor-data-service.js"
import { VerifyContext } from '../../Contexts/VerifyContext.js';
import NewAccountForm from '../../Components/new-account-form.js';

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
  
  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        setError("")
        setLoading(true)
        const bool = await PrivateDoctorDataService.addingDoctorInfo(newDoctorInfo)
        if(bool.data === true){
          // navigate("/vet-dashboard");// this would be more efficient i think, but when navigate is used, the data doesn't load in time
          window.location.href = '/vet-dashboard';
        }
      } catch (error) {
        console.log('err in adding data 1',error)
        setError(error.response.data);
      }
      setLoading(false)
  }

  return (
  <NewAccountForm
    handleSubmit={handleSubmit}
    newInfo={newDoctorInfo}
    setNewInfo={setNewDoctorInfo}
    error={error}
    loading = {loading}
  />
  );
};
