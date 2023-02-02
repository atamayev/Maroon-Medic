import React, {useRef, useState, useEffect} from 'react'
import {Card, Button, Form, Alert } from 'react-bootstrap'
import {Link, useNavigate} from "react-router-dom";
import VetDataService from '../Services/vet-service'

export default function VetRegister() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  function checkDoctorUUID(){
    const cookieName = "DoctorUUID=";
    const decodedCookie = document.cookie; // when https, will need to decode
    const cookies = decodedCookie.split(";");
    for(let i = 0; i <cookies.length; i++) {
      let cookie = cookies[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.startsWith(cookieName)) { // if cookie with DoctorUUID exists, navigate to dashboard
        navigate(`/dashboard`)
      }
    }
    return null;
  }

  useEffect(()=>{
    checkDoctorUUID()
  });

  const handleSubmit = async (e) =>{
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }
    try {
      setError("")
      setLoading(true)
      await VetDataService.register(emailRef.current.value, passwordRef.current.value);
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
                <h2 className = "text-center mb-4">Sign Up</h2>
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