import React, {useState} from 'react'
import {useNavigate} from "react-router-dom";
import {handleLoginSubmit} from "../../custom-hooks/handle-submits.js"
import { useVerifyForVets } from '../../custom-hooks/user-verification-snippets.js';
import LoginAndRegistrationForm from '../../components/login-and-registration-form.js';
import Header from '../header.js';

export default function DoctorLogin() {
  const [login_information_object, setLogin_information_object] = useState({login_type: 'Doctor'});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const type = "Vet"

  useVerifyForVets(); //Makes sure the user isn't logged in already. If so, re-directs

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
};
