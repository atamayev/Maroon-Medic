import React, {useState, useEffect, useContext} from 'react'
import {useNavigate} from "react-router-dom";
import DataService from "../../Services/data-service.js"
import { VerifyContext } from '../../Contexts/VerifyContext.js';
import Header from '../header.js';
import LoginAndRegistrationForm from '../../Components/login-and-registration-form.js';

export default function DoctorLogin() {
  const [login_information_object, setLogin_information_object] = useState({login_type: 'Doctor'});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {user_verification} = useContext(VerifyContext);

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
  
  const handleSubmit = async (e) =>{
    e.preventDefault();
    setError("")
    try {
      setLoading(true)
      const response = await DataService.login(login_information_object);
      if (response.data === true){
        navigate("/vet-dashboard")
        console.log('Navigating to Doctor Dashboard');
      }else{
        console.log('Login didnt work');
      }
    } catch (err) {
      setError(err.response.data);
    }
    setLoading(false)
  };

  return (
    <>
      <Header dropdown = {true} search = {true}/>
      <LoginAndRegistrationForm
        handleSubmit={handleSubmit}
        credentials={login_information_object}
        setCredentials={setLogin_information_object}
        error={error}
        type="Vet"
        loading = {loading}
        loginOrSignUp = 'Login'
      />
    </>
  )
};
