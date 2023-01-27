import React, {useState, useContext} from 'react'
import {Card, Button, Form, Alert } from 'react-bootstrap'
import {Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../Contexts/authContext.js';

export default function Login() {
  //Creates 3 states, two of which are for text, another for error (when incorrect login)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const {login} = useContext(AuthContext) // figure out if verify will be inside login, or seperated
  //think it should be seperate - but then idk (would it make sense to put verify inside the login function?)

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/")
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