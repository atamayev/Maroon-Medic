import React from 'react'
import { Nav } from 'react-bootstrap';

export default function DoctorNavHeader(props) {
  return (
    <Nav.Item>
        <Nav.Link href = {props.href} eventKey = {props.eventKey}>
        {props.title}
        </Nav.Link>
    </Nav.Item>
  )
}
