import React, {useState} from 'react'
import DoctorHeader from '../doctor-header.js';
import {Card, CardGroup, Col, Row } from 'react-bootstrap'
import {Link} from "react-router-dom";

export default function DoctorSettings() {

  return (
    <>
        <DoctorHeader/>
        <CardGroup>
        <Link to = "/vet-settings/personal-information" style={{ textDecoration: 'none' }}>
            <Card border="primary" style={{ width: '18rem' }}>
                <Card.Body>
                <Card.Title>Personal Information</Card.Title>
                </Card.Body>
            </Card>
        </Link>

        <Link to = "/vet-settings/privacy" style={{ textDecoration: 'none' }}>
            <Card border="primary" style={{ width: '18rem' }}>
                <Card.Body>
                <Card.Title>Privacy</Card.Title>
                </Card.Body>
            </Card>
        </Link>

        <Link to = "/vet-settings/login-and-security" style={{ textDecoration: 'none' }}>
            <Card border="primary" style={{ width: '18rem' }}>
                <Card.Body>
                <Card.Title>Login & Security</Card.Title>
                </Card.Body>
            </Card>
        </Link>
        </CardGroup>
    </>
  )
};
