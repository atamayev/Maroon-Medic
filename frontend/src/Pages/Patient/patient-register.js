import React, {useState, useEffect, useContext} from 'react'
import {useNavigate} from "react-router-dom";
import DataService from "../../Services/data-service.js"
import { VerifyContext } from '../../Contexts/VerifyContext.js';
import Header from '../header.js';
import LoginAndRegistrationForm from '../../Components/login-and-registration-form.js';

export default function PatietRegister() {
  const [register_information_object, setRegister_information_object] = useState({register_type: 'Patient'});
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {user_verification} = useContext(VerifyContext);

  useEffect(()=>{
    console.log('in Patient Register useEffect')
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
    setError("")
    e.preventDefault();
    if (register_information_object.password !== passwordConfirm) {
      return setError("Passwords do not match")
    }
    try {
      setLoading(true)
      const response = await DataService.register(register_information_object);
      if (response.data === true){
        navigate("/new-patient")
        console.log('Registered');
      }else{
        console.log('Registration didnt work');
      }
    } catch (error) {
      console.log('error in registration')
      setError(error.response.data);
    }
    setLoading(false)
  };

  return (
    <>
      <Header dropdown = {true} search = {true} className = "d-flex align-items-center justify-content-center w-100"/>
      <LoginAndRegistrationForm
        handleSubmit={handleSubmit}
        credentials={register_information_object}
        setCredentials={setRegister_information_object}
        passwordConfirm = {passwordConfirm}
        setPasswordConfirm = {setPasswordConfirm}
        error={error}
        type="Patient"
        loading = {loading}
        loginOrSignUp = 'Sign up'
      />
    </>

  )
};
