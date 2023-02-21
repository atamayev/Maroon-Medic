import React from 'react'
import { Nav } from 'react-bootstrap';

export default function DoctorHeader() {

  return (
    <>
        <Nav justify variant = "pills" className="justify-content-center">
                <Nav.Item>
                    <Nav.Link href = '/vet-dashboard' eventKey = "link-1">
                    Dashboard
                    </Nav.Link>
                </Nav.Item>

            <Nav.Item>
                <Nav.Link href = "/vet-account-details" className="link-2">
                    Account Details
                </Nav.Link>
            </Nav.Item>

            <Nav.Item>
                <Nav.Link href = "/vet-settings" eventKey = "link-3">
                Settings
                </Nav.Link>
            </Nav.Item>

        </Nav>
    </>
  )
};
