import React, {useEffect, useContext} from 'react'
import { Link } from "react-router-dom";
import {Button, Card} from 'react-bootstrap';
import { UUIDContext } from '../../Contexts/UUIDContext.js';
import { VerifyContext } from '../../Contexts/VerifyContext.js';

export default function EditDoctorProfile() {
  const {checkUUID} = useContext(UUIDContext);
  const {user_verification, DoctorVerifyToken, PatientVerifyToken} = useContext(VerifyContext);
  // also needs verify when navigate to page.

  useEffect(()=>{
    console.log('in editDoctor useEffect')
    user_verification()
    .then(result => {
      if (result === true) {
        return checkUUID();
      }
    })
    .then(checkUUIDResult => {
      if (checkUUIDResult === true) {
        console.log(`Used ${EditDoctorProfile.name} useEffect`);
      } else {
        throw new Error("Result from checkUUID is false");
      }
    })
    .catch(error => {
      console.error(error);
    });
  }, []);

  if(PatientVerifyToken){
    return(
      <Card>
        <Card.Body>
        <p>Unautorized to edit Doctor Details </p>;
        <Link to= {'/patient-edit-profile'}>
              <Button variant="primary">
                  <p>Return to Patient Edit Profile</p>
              </Button>
        </Link>
        </Card.Body>
      </Card>
    )
  }

  if(!DoctorVerifyToken){
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
      <p>This is the Edit Profile Page</p>
        <Link to= {'/vet-dashboard'}>
              <Button variant="primary">
                  <p>Dashboard</p>
              </Button>
        </Link>
    </div>
  )
};
