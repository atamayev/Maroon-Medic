import React, {useState} from 'react'
import DoctorHeader from '../doctor-header.js';
import {Card, Button, Form } from 'react-bootstrap'
import DataService from '../../../Services/data-service.js';

export default function DoctorPersonalInfo() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            // await DataService.login(email, password, login_type);
            console.log('Updated Informtion');
        } catch (err) {
            console.log(err.response.data);
        }
    };

  return (
    <div>
        <DoctorHeader/>
        <Card>
            <Card.Body>
                <Form onSubmit = {handleSubmit}>

                <Form.Group id = "firstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control id="firstName"  placeholder="Username" value={firstName} onChange={(event) => setFirstName(event.target.value)}/>
                </Form.Group>

                <Form.Group id = "lastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control id="lastName"  placeholder="Username" value={lastName} onChange={(event) => setLastName(event.target.value)}/>
                </Form.Group>

                <Form.Group id = "email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control id="email"  placeholder="Username" value={email} onChange={(event) => setEmail(event.target.value)}/>
                </Form.Group>

                <Form.Group id = "phone">
                    <Form.Label>Personal Phone Number</Form.Label>
                    <Form.Control id="phone"  placeholder="Username" value={phone} onChange={(event) => setPhone(event.target.value)}/>
                </Form.Group>
                <br/>
                <Button type = "submit" className="btn btn-primary w-100">Save</Button>
                </Form>
            </Card.Body>
        </Card>
    </div>
  )
};
