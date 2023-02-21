import React, {useEffect, useContext} from 'react'
import { Link } from "react-router-dom";
import {Button, Card} from 'react-bootstrap';
import { VerifyContext } from '../../Contexts/VerifyContext.js';
import DoctorHeader from './doctor-header.js';

export default function DoctorAccountDetails() {
  const {user_verification, DoctorVerifyToken, PatientVerifyToken} = useContext(VerifyContext);

  useEffect(()=>{
    console.log('in editDoctor useEffect')
    user_verification()
    .then(result => {
      if (result === true) {
        console.log(`Used ${DoctorAccountDetails.name} useEffect`);
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
      <DoctorHeader/>
      <p>This is the Edit Profile Page</p>
        <Link to= {'/vet-dashboard'}>
              <Button variant="primary">
                  <p>Dashboard</p>
              </Button>
        </Link>
    </div>
  )
};
