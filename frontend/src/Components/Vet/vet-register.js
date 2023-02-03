import React, {useRef, useState, useEffect, useContext} from 'react'
import {Card, Button, Form, Alert } from 'react-bootstrap'
import {Link, useNavigate} from "react-router-dom";
import VetDataService from "../../Services/vet-service.js"
import { UUIDContext } from '../../Wraps/UUIDContext.js';

export default function VetRegister() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [error, setError] = useState("")
  const register_type = 'Doctor';
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const { DoctorUUID, checkDoctorUUID } = useContext(UUIDContext);

  useEffect(()=>{
    checkDoctorUUID()
    if(DoctorUUID){
      navigate(`/dashboard`)
    }
  });

  const handleSubmit = async (e) =>{
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }
    try {
      setError("")
      setLoading(true)
      await VetDataService.register(emailRef.current.value, passwordRef.current.value, register_type);
      navigate("/new-vet")
      console.log('Registered');
    } catch (err) {
      console.log('err in registration')
      setError(err.response.data);
    }
    setLoading(false)
  };

  return (
    <>
        <Card>
            <Card.Body>
                <h2 className = "text-center mb-4">Vet Sign Up</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id = "email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type = "email" ref = {emailRef} required/>
                    </Form.Group>
                    <Form.Group id = "Password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type = "password" ref = {passwordRef} required/>
                    </Form.Group>
                    <Form.Group id = "Password Confirm">
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control type = "password" ref = {passwordConfirmRef} required/>
                    </Form.Group>
                    <br/>
                    <Button disabled = {loading} className = "w-100" type = "submit">Sign Up</Button>
                </Form>
            </Card.Body>
        </Card>
        <div className='w-100 text-center mt-2'>
            Already have an account? <Link to = "/vet-login">Log In</Link>
        </div>
    </>
  )
}