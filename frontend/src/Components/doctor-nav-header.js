import React from 'react'
import { Nav } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

export default function DoctorNavHeader(props) {
  const location = useLocation();
  const isActive = location.pathname.startsWith(props.href);

  return (
    <Nav.Item>
      <Nav.Link href={props.href} eventKey={props.eventKey} active={isActive}>
        {props.title}
      </Nav.Link>
    </Nav.Item>
  )
}
