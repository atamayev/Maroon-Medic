import React, {useState, useEffect, useContext} from 'react'
import {Card, Button, Form, Alert } from 'react-bootstrap'
import {Link, useNavigate, useLocation} from "react-router-dom";
import DataService from "../../Services/data-service.js"
import { UUIDContext } from '../../Wraps/UUIDContext.js';

export default function DoctorLogin() {
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const login_type = 'Doctor';
  const cookie_monster = document.cookie;
  const { checkUUID } = useContext(UUIDContext);

  useEffect(()=>{
    console.log('in doctorlogin')
    if(checkUUID('DoctorUUID=')===true){
      navigate(`/vet-dashboard`)
    }
  }, []);
  
  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
      setError("")
      await DataService.login(email, password, login_type);
      navigate("/vet-dashboard")
      console.log('Navigating to Dashboard');
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <>
      <Card>
        <Card.Body>
            <h2 className = "text-center mb-4">Vet Log In</h2>
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
                <Button type = "submit" className="btn btn-primary w-100">Log In</Button>
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
