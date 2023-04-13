import React, {useState, useEffect, useContext} from 'react'
import {useNavigate} from "react-router-dom";
import DataService from "../../Services/data-service.js"
import { VerifyContext } from '../../Contexts/VerifyContext.js';
import RegisterForm from '../../Components/register-form.js';
import Header from '../header.js';

export default function DoctorRegister() {
  const [register_information_object, setRegister_information_object] = useState({register_type: 'Doctor'});
  const [passwordConfirm, setpasswordConfirm] = useState('');
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {user_verification} = useContext(VerifyContext);

  useEffect(()=>{
    console.log('in doctor register useEffect')
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
    if (register_information_object.password !== passwordConfirm) {
      return setError("Passwords do not match")
    }
    try {
      setLoading(true)
      const response = await DataService.register(register_information_object);
      if (response.data === true){
        console.log('Registered');
        navigate("/new-vet")
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
      <RegisterForm
        handleSubmit={handleSubmit}
        register_information_object={register_information_object}
        setRegister_information_object={setRegister_information_object}
        passwordConfirm = {passwordConfirm}
        setpasswordConfirm = {setpasswordConfirm}
        error={error}
        type="Vet"
        loading = {loading}
      />
    </>
  )
};
