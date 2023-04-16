import React, {useState, useEffect, useContext} from 'react'
import {useNavigate} from "react-router-dom";
import { VerifyContext } from '../../Contexts/VerifyContext.js';
import Header from '../header.js';
import LoginAndRegistrationForm from '../../Components/login-and-registration-form.js';
import { handleRegisterSubmit } from '../../Components/handle-submits.js';

export default function PatietRegister() {
  const type = "Patient"
  const [register_information_object, setRegister_information_object] = useState({register_type: type});
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {user_verification} = useContext(VerifyContext);

  useEffect(()=>{
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

  return (
    <>
      <Header dropdown = {true} search = {true}/>
      <LoginAndRegistrationForm
        handleSubmit={(e) =>
          handleRegisterSubmit(
            {
              e,
              register_information_object,
              passwordConfirm,
              navigate,
              setError,
              setLoading,
              VetOrPatient: type
            }
        )}
        credentials = {register_information_object}
        setCredentials = {setRegister_information_object}
        passwordConfirm = {passwordConfirm}
        setPasswordConfirm = {setPasswordConfirm}
        error = {error}
        VetOrPatient = {type}
        loading = {loading}
        loginOrSignUp = 'Sign up'
      />
    </>
  )
};
