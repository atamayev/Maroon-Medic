import React, {useState, useEffect, useContext} from 'react'
import {Card, Button, Form, Alert } from 'react-bootstrap'
import {Link, useNavigate} from "react-router-dom";
import DataService from "../../Services/data-service.js"
import { VerifyContext } from '../../Contexts/VerifyContext.js';

export default function PatientLogin() {
  const [login_information_object, setLogin_information_object] = useState({login_type: 'Patient'});
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const {user_verification} = useContext(VerifyContext)

  useEffect(()=>{
    console.log('in Patientlogin UseEffect')
    user_verification()
      .then(result => {
        if (result === true) {
          navigate(`/patient-dashboard`);
        }
      })
  }, []);
  
  const handleSubmit = async (e) =>{
    e.preventDefault();
    setError("")
    try {
      await DataService.login(login_information_object);
      navigate("/patient-dashboard")
      console.log('Navigating to Patient Dashboard');
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <>
      <Card>
        <Card.Body>
            <h2 className = "text-center mb-4">Patient Log In</h2>
            <Form onSubmit={handleSubmit}>
            <Form.Group id = "email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" id="email"  placeholder="Username" name="username" value={login_information_object.email} onChange={(event) => setLogin_information_object({...login_information_object, email: event.target.value})} required/>
                </Form.Group>
                <Form.Group id = "Password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" className="form-control" id="password" placeholder="Password" name="password" value={login_information_object.password} onChange={(event) => setLogin_information_object({...login_information_object, password: event.target.value})} required/>
                </Form.Group>
                {error && <Alert variant="danger">{error}</Alert>}
                {/* <Button disabled = {loading} className = "w-100"type = "submit">Log In</Button> */}
                <br/>
                <Button type = "submit" className="btn btn-primary w-100">Log In</Button>
            </Form>
            <div className='w-100 text-center mt-3'>
              <Link to = "/forgot-password">Forgot Password?</Link>
            </div>
          </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
          Need an account? <Link to = "/patient-register">Sign Up</Link> 
      </div>
    </>
  )
}
