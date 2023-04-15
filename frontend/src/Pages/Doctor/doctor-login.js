import React, {useState, useEffect, useContext} from 'react'
import {useNavigate} from "react-router-dom";
import { VerifyContext } from '../../Contexts/VerifyContext.js';
import Header from '../header.js';
import LoginAndRegistrationForm from '../../Components/login-and-registration-form.js';
import {handleLoginSubmit} from '../../Components/login-and-register-handle-submit.js';

export default function DoctorLogin() {
  const [login_information_object, setLogin_information_object] = useState({login_type: 'Doctor'});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {user_verification} = useContext(VerifyContext);
  const type = "Vet"

  useEffect(()=>{
    console.log('in doctorlogin UseEffect')
    user_verification()
      .then(result => {
        if (result.verified === true && result.user_type === 'Doctor') {
          navigate(`/vet-dashboard`);
        }
        else if (result.verified === true && result.user_type === 'Patient') {
          navigate(`/patient-dashboard`);
        }
      })
  }, []);  

  return (
    <>
      <Header dropdown = {true} search = {true}/>
      <LoginAndRegistrationForm
        handleSubmit={(e) =>
          handleLoginSubmit(
            {
              e,
              login_information_object,
              navigate,
              setError,
              setLoading,
              VetOrPatient: type
            }
        )}
        credentials = {login_information_object}
        setCredentials = {setLogin_information_object}
        error = {error}
        type = {type}
        loading = {loading}
        loginOrSignUp = 'Login'
      />
    </>
  )
};
