import React, {useState, useEffect, useContext} from 'react'
import {Card, Button, Form, Alert } from 'react-bootstrap'
import {Link, useNavigate} from "react-router-dom";
import DataService from "../../Services/data-service.js"
import { VerifyContext } from '../../Contexts/VerifyContext.js';

export default function PatietRegister() {
  const [register_information_object, setRegister_information_object] = useState({register_type: 'Patient'});
  const [passwordConfirm, setpasswordConfirm] = useState('');
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const {user_verification} = useContext(VerifyContext)

  useEffect(()=>{
    console.log('in Patient Register useEffect')
    user_verification()
      .then(result => {
        if (result === true) {
          navigate(`/patient-dashboard`);
        }
      })
  }, []);

  const handleSubmit = async (e) =>{
    e.preventDefault();
    if (register_information_object.password !== passwordConfirm) {
      return setError("Passwords do not match")
    }
    try {
      setError("")
      setLoading(true)
      await DataService.register(register_information_object);
      navigate("/new-patient")
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
                <h2 className = "text-center mb-4">Patient Sign Up</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                <Form.Group id = "email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type = "email" id="email"  placeholder="Username" name="username" value={register_information_object.email} onChange={(event) => setRegister_information_object({...register_information_object, email: event.target.value})}  required/>
                    </Form.Group>
                    <Form.Group id = "Password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type = "password" id="password" placeholder="Password" name="password" value={register_information_object.password} onChange={(event) => setRegister_information_object({...register_information_object, password: event.target.value})} required/>
                    </Form.Group>
                    <Form.Group id = "Password Confirm">
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control type = "password" id="confirm-password" placeholder="Confirm Password" name="confirm-password" value={passwordConfirm} onChange={(event) => setpasswordConfirm(event.target.value)} required/>
                    </Form.Group>
                    <br/>
                    <Button disabled = {loading} className = "w-100" type = "submit">Sign Up</Button>
                </Form>
            </Card.Body>
        </Card>
        <div className='w-100 text-center mt-2'>
            Already have an account? <Link to = "/patient-login">Log In</Link>
        </div>
    </>
  )
};
