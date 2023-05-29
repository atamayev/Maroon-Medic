import React, {useState} from 'react'
import {useNavigate} from "react-router-dom";
import Header from '../header.js';
import LoginAndRegistrationForm from '../../Components/login-and-registration-form.js';
import {handleRegisterSubmit} from "../../Custom Hooks/handle-submits.js"
import {useVerifyForVets} from "../../Custom Hooks/user-verification-snippets.js"

export default function DoctorRegister() {
  const [register_information_object, setRegister_information_object] = useState({register_type: 'Doctor'});
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const type = "Vet"
  const [showPassword, setShowPassword] = useState(false);

  useVerifyForVets();//Makes sure the user isn't logged in already. If so, re-directs

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
        credentials={register_information_object}
        setCredentials={setRegister_information_object}
        passwordConfirm = {passwordConfirm}
        setPasswordConfirm = {setPasswordConfirm}
        error= {error}
        VetOrPatient = {type}
        loading = {loading}
        loginOrSignUp = 'Sign up'
        showPassword = {showPassword}
        setShowPassword = {setShowPassword}
      />
    </>
  )
};
