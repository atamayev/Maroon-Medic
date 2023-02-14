import React, {useState, useEffect, useContext} from 'react'
import {Card, Button, Form, Alert } from 'react-bootstrap'
import {Link, useNavigate} from "react-router-dom";
import DataService from "../../Services/data-service.js"
import { UUIDContext } from '../../Contexts/UUIDContext.js';

export default function PatietRegister() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setpasswordConfirm] = useState('');
  const [error, setError] = useState("")
  const register_type = 'Patient';
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const { checkUUID } = useContext(UUIDContext);

  useEffect(()=>{
    console.log('in Patient Register useEffect')
    checkUUID()
      .then(result => {
        if (result === true) {
          navigate(`/patient-dashboard`);
        }
      })
  }, []);

  const handleSubmit = async (e) =>{
    e.preventDefault();
    if (password !== passwordConfirm) {
      return setError("Passwords do not match")
    }
    try {
      setError("")
      setLoading(true)
      await DataService.register(email, password, register_type);
      navigate("/new-patient") // needs to change to new-patient
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
                        <Form.Control type = "email" id="email"  placeholder="Username" name="username" value={email} onChange={(event) => setEmail(event.target.value)}  required/>
                    </Form.Group>
                    <Form.Group id = "Password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type = "password" id="password" placeholder="Password" name="password" value={password} onChange={(event) => setPassword(event.target.value)} required/>
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
}