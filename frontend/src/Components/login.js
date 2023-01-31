import React, {useState, useEffect} from 'react'
import {Card, Button, Form, Alert } from 'react-bootstrap'
import {Link, useNavigate } from "react-router-dom";
import VetDataService from '../Services/vet-service'

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function checkUUID(){
    const cookieName = "UUID=";
    const decodedCookie = document.cookie; // when https, will need to decode
    const cookies = decodedCookie.split(";");
    for(let i = 0; i <cookies.length; i++) {
      let cookie = cookies[i];
      while (cookie.charAt(0) == ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.startsWith(cookieName)) { // if cookie with UUID exists, navigate to edit-profile
        navigate(`/edit-profile`)
      }
    }
    return null;
  }

  useEffect(()=>{
    checkUUID()
  });
  
  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
      await VetDataService.login(email, password);
      navigate("/dashboard")
      console.log('Logged in');
    } catch (err) {
      setError(err.response.data);
    }
  };
  
  return (
    <>
        <Card>
            <Card.Body>
                <h2 className = "text-center mb-4">Log In</h2>
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
                    <Button type = "submit" className="btn btn-primary">Log In</Button>
                </Form>
                <div className='w-100 text-center mt-3'>
                  <Link to = "/forgot-password">Forgot Password?</Link>
                </div>
                </Card.Body>
        </Card>
        <div className='w-100 text-center mt-2'>
            Need an account? <Link to = "/register">Sign Up</Link> 
        </div>
    </>
  )
}