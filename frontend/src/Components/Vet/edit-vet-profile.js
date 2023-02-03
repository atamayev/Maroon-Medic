import React, {useEffect, useContext} from 'react'
import { Link } from "react-router-dom";
import {Button, Card} from 'react-bootstrap';
import { UUIDContext } from '../../Wraps/UUIDContext.js';

export default function EditVetProfile() {
  const { DoctorUUID, checkDoctorUUID } = useContext(UUIDContext);

  useEffect(()=>{
    checkDoctorUUID()
  });

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
          <Link to= {'/dashboard'}>
                <Button variant="primary">
                    <p>Dashboard</p>
                </Button>
          </Link>
    </div>
  )
}
