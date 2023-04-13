import React from 'react'
import { Nav } from 'react-bootstrap';
import DoctorNavHeader from '../../Components/doctor-nav-header';

export default function DoctorHeader() {

  return (
    <Nav justify variant = "pills" className="justify-content-center">
        <DoctorNavHeader href = '/vet-dashboard' eventKey = "link-1" title='Dashboard'/>
        <DoctorNavHeader href = '/vet-account-details' eventKey = "link-2" title='Account Details'/>
        <DoctorNavHeader href = '/vet-settings' eventKey = "link-3" title='Settings'/>
    </Nav>
  )
};
