import React from 'react'
import { Nav } from 'react-bootstrap';
import AccountNavHeader from '../../Components/account-nav-header';

export default function PatientHeader() {
  const currentPath = window.location.pathname;
  return (
    <Nav justify variant="pills" className="justify-content-center">
      <AccountNavHeader
        href="/patient-dashboard"
        eventKey="link-1"
        title="Dashboard"
        active={currentPath === '/patient-dashboard'}
      />
      <AccountNavHeader
        href="/my-pets"
        eventKey="link-2"
        title="My Pets"
        active={currentPath === '/my-pets'}
      />
      <AccountNavHeader
        href="/patient-account-details"
        eventKey="link-3"
        title="Account Details"
        active={currentPath === '/patient-account-details'}
      />
      <AccountNavHeader
        href="/patient-settings"
        eventKey="link-4"
        title="Settings"
        active={currentPath === '/patient-settings'}
      />
    </Nav>
  );
};
