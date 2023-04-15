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
  loading }) {

  const renderPasswordConfirm = ()=>{
    if (loginOrSignUp === 'Sign up'){
      return(
        <FormGroup
        id = "confirm-password"
        label = "Password Confirmation"
        type = "password"
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
              type = "password"
              placeholder= "Password"
              onChange={(event) => setCredentials({...credentials, password: event.target.value})}
              required
            />
            {renderPasswordConfirm()}
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
