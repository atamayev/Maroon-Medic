import React, {useState} from 'react'
import {useNavigate} from "react-router-dom";
import LoginAndRegistrationForm from '../../Components/login-and-registration-form.js';
import Header from '../header.js';
import {handleLoginSubmit} from "../../Custom Hooks/handle-submits.js"
import {useVerifyForPatients} from "../../Custom Hooks/user-verification-snippets.js"

export default function PatientLogin() {
  const type = "Patient"
  const [login_information_object, setLogin_information_object] = useState({login_type: type});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  useVerifyForPatients(); //Makes sure the user isn't logged in already. If so, re-directs

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
        VetOrPatient = {type}
        loading = {loading}
        loginOrSignUp = 'Login'
        showPassword = {showPassword}
        setShowPassword = {setShowPassword}
      />
    </>
  )
}
