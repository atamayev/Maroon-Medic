//incomplete


import React, {useState, useEffect, useContext} from 'react'
import {Card, Button, Form, Alert } from 'react-bootstrap'
import {Link, useNavigate } from "react-router-dom";
import VetDataService from "../../Services/vet-service.js"
import { UUIDContext } from '../../Wraps/UUIDContext.js';

export default function PatientLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");
  const login_type = 'Patient';
  const { PatientUUID, checkPatientUUID } = useContext(UUIDContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    checkPatientUUID()
    if(PatientUUID){
      navigate(`/patient-profile`)
    }
  });
  
  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
      setError("")
      setLoading(true)
      await VetDataService.login(email, password, login_type);
      navigate("/new-patient")
      console.log('Logged in');
    } catch (err) {
      setError(err.response.data);
    }
    setLoading(false)
  };
  
  return (
    <>
        <Card>
            <Card.Body>
                <h2 className = "text-center mb-4">Patient Log In</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group id = "email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" id="email"  placeholder="Username" name="username" value={email} onChange={(event) => setEmail(event.target.value)}  required/>
                    </Form.Group>
                    <Form.Group id = "Password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" className="form-control" id="password" placeholder="Password" name="password" value={password} onChange={(event) => setPassword(event.target.value)} required/>
                    </Form.Group>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {/* <Button disabled = {loading} className = "w-100"type = "submit">Log In</Button> */}
                    <br/>
                    <Button disabled = {loading} type = "submit" className="btn btn-primary w-100">Log In</Button>
                </Form>
                <div className='w-100 text-center mt-3'>
                  <Link to = "/forgot-password">Forgot Password?</Link>
                </div>
                </Card.Body>
        </Card>
        <div className='w-100 text-center mt-2'>
            Need an account? <Link to = "/vet-register">Sign Up</Link> 
        </div>
    </>
  )
}