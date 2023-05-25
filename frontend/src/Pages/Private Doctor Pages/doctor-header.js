import React from 'react'
import { Nav } from 'react-bootstrap';
import DoctorNavHeader from '../../Components/doctor-nav-header';

export default function DoctorHeader() {
  const currentPath = window.location.pathname;
  return (
    <Nav justify variant="pills" className="justify-content-center">
      <DoctorNavHeader
        href="/vet-dashboard"
        eventKey="link-1"
        title="Dashboard"
        active={currentPath === '/vet-dashboard'}
      />
      <DoctorNavHeader
        href="/vet-calendar"
        eventKey="link-2"
        title="Calendar"
        active={currentPath === '/vet-calendar'}
      />
      <DoctorNavHeader
        href="/vet-account-details"
        eventKey="link-3"
        title="Account Details"
        active={currentPath === '/vet-account-details'}
      />
      <DoctorNavHeader
        href="/vet-settings"
        eventKey="link-4"
        title="Settings"
        active={currentPath === '/vet-settings'}
      />
    </Nav>
  );
};
