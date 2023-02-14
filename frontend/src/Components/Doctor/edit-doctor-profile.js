import React, {useEffect, useContext} from 'react'
import { Link, useLocation } from "react-router-dom";
import {Button, Card} from 'react-bootstrap';
import { UUIDContext } from '../../Contexts/UUIDContext.js';

export default function EditDoctorProfile() {
  const { DoctorUUID, checkUUID } = useContext(UUIDContext);
  const location = useLocation();
  // also needs verify when navigate to page.

  useEffect(()=>{
    console.log('in edit doctor useEffect')
    // if check uuid or verify context false--> re-direct to login/register
  }, []);

  if(!DoctorUUID){
    return(
      <Card>
        <Card.Body>
          <p>Please register or login first </p>;
          <Link to= {'/vet-register'}>
              <Button variant="primary">
                  <p>Register</p>
              </Button>
        </Link>
      </Card.Body>
    </Card>
    )
  }

  return (
    <div>
      {DoctorUUID}
        <p>This is the Edit Profile Page</p>
          <Link to= {'/vet-dashboard'}>
                <Button variant="primary">
                    <p>Dashboard</p>
                </Button>
          </Link>
    </div>
  )
}
