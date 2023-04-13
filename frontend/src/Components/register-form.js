import React from 'react'
import {Card, Button, Form, Alert } from 'react-bootstrap'
import {Link} from "react-router-dom";

export default function RegisterForm({ 
        handleSubmit, 
        register_information_object, 
        setRegister_information_object, 
        passwordConfirm, 
        setpasswordConfirm, 
        error, 
        type, 
        loading 
    }) {
  return (
    <>
    <Card>
        <Card.Body>
            <h2 className = "text-center mb-4">{type} Sign Up</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group id = "email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type = "email" id="email"  placeholder="Username" name="username" value={register_information_object.email} onChange={(event) => setRegister_information_object({...register_information_object, email: event.target.value})} required/>
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
        Already have an account? <Link to = {`/${type}-login`}>Log In</Link>
    </div>
    </>
  )
}
