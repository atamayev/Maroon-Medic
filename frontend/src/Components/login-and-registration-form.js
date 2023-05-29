import React from 'react'
import {Card, Button, Form, Alert } from 'react-bootstrap'
import {Link} from "react-router-dom";
import FormGroup from './form-group';

export default function LoginAndRegistrationForm({ 
  handleSubmit, 
  credentials, 
  setCredentials, 
  setPasswordConfirm,
  error,
  VetOrPatient,
  loginOrSignUp,
  loading,
  showPassword,
  setShowPassword }) {

  const renderPasswordConfirm = ()=>{
    if (loginOrSignUp === 'Sign up'){
      return(
        <FormGroup
          id = "confirm-password"
          label = "Password Confirmation"
          type={showPassword ? "text" : "password"} // Switch input type based on showPassword state
          placeholder= "Confirm Password"
          onChange={(event) => setPasswordConfirm(event.target.value)}
          required
      />
      )
    }
  }

  const renderSubLoginInfo = ()=>{
    if (loginOrSignUp === 'Login'){
      return(
        <>
          <div className='w-100 text-center mt-3'>
            <Link to = {`/${VetOrPatient.toLowerCase()}-forgot-password`}>Forgot Password?</Link>
          </div>
          <div className='w-100 text-center mt-2'>
            Need an account? <Link to = {`/${VetOrPatient.toLowerCase()}-register`}>Sign Up</Link> 
          </div>
        </>

      )
    }
  }

  const renderSubRegisterInfo = ()=>{
    if (loginOrSignUp === 'Sign up'){
      return(
        <div className='w-100 text-center mt-2'>
          Already have an account? <Link to = {`/${VetOrPatient.toLowerCase()}-login`}>Log In</Link>
        </div>
      )
    }  
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  const renderShowPasswordButton = () =>{
    if('password' in credentials){
      if(credentials.password.length){
        return(
          <Button onClick={togglePasswordVisibility} className='mt-3'>
            {showPassword ? "Hide Password" : "Show Password"}
          </Button>
        )
      }
    }
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className = "text-center mb-4">{VetOrPatient} {loginOrSignUp}</h2>
          <Form onSubmit={handleSubmit}>
            <FormGroup
              id = "email"
              label = "Email"
              type = "email"
              placeholder= "Username"
              onChange={(event) => setCredentials({...credentials, email: event.target.value})}
              required
            />
            <FormGroup
              id = "password"
              label = "Password"
              type={showPassword ? "text" : "password"} // Switch input type based on showPassword state
              placeholder= "Password"
              onChange={(event) => setCredentials({...credentials, password: event.target.value})}
              required
            />
            {renderPasswordConfirm()}
            {renderShowPasswordButton()}
              <br/>
              {error && <Alert variant="danger">{error}</Alert>}
              <br/>
              <Button disabled = {loading} className = "w-100"type = "submit">{loginOrSignUp}</Button>
          </Form>
            {renderSubLoginInfo()}
            {renderSubRegisterInfo()}
        </Card.Body>
      </Card>
    </>
  )
}
