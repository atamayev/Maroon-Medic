import React, {useState} from 'react'
import {useNavigate} from "react-router-dom";
import {handleRegisterSubmit} from "../../custom-hooks/handle-submits.js"
import { useConfirmNotLoggedIn } from '../../custom-hooks/user-verification-snippets.js';
import LoginAndRegistrationForm from '../../components/login-and-registration-form.js';
import Header from '../header.js';

export default function DoctorRegister() {
  const [register_information_object, setRegister_information_object] = useState({register_type: 'Doctor'});
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const type = "Vet"
  const [showPassword, setShowPassword] = useState(false);

  useConfirmNotLoggedIn();

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
