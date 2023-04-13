import React, {useState, useEffect, useContext} from 'react'
import {useNavigate} from "react-router-dom";
import DataService from "../../Services/data-service.js"
import { VerifyContext } from '../../Contexts/VerifyContext.js';
import LoginForm from '../../Components/login-form.js';

export default function PatientLogin() {
  const [login_information_object, setLogin_information_object] = useState({login_type: 'Patient'});
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const {user_verification} = useContext(VerifyContext);

  useEffect(()=>{
    console.log('in Patientlogin UseEffect')
    user_verification()
    .then(result => {
      if (result.verified === true && result.user_type === 'Patient') {
        navigate(`/patient-dashboard`);
      }
      else if (result.verified === true && result.user_type === 'Doctor') {
        navigate(`/vet-dashboard`);
      }
    })
  }, []);

  const handleSubmit = async (e) =>{
    e.preventDefault();
    setError("")
    try {
      const response = await DataService.login(login_information_object);
      if (response.data === true){
        navigate("/patient-dashboard")
        console.log('Navigating to Patient Dashboard');
      }else{
        console.log('Login didnt work');
      }
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <>
      <LoginForm
        handleSubmit={handleSubmit}
        login_information_object={login_information_object}
        setLogin_information_object={setLogin_information_object}
        error={error}
        type="Patient"
      />
    </>
  )
}
