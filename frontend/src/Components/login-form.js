import React from 'react'
import {Card, Button, Form, Alert } from 'react-bootstrap'
import {Link} from "react-router-dom";

export default function LoginForm({ handleSubmit, login_information_object, setLogin_information_object, error, type }) {
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className = "text-center mb-4">{type} Log In</h2>
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
            <Link to = {`/${type}-forgot-password`}>Forgot Password?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        Need an account? <Link to = {`/${type}-register`}>Sign Up</Link> 
    </div>
    </>
  )
}
