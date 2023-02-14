import React, {useEffect, useState, useContext} from 'react'
import {Link} from "react-router-dom";
import {Button, Card} from 'react-bootstrap';
import DataService from "../../Services/data-service.js"
import { UUIDContext } from '../../Contexts/UUIDContext.js';
import { VerifyContext } from '../../Contexts/VerifyContext.js';

export default function DoctorDashboard() {
  const {DoctorVerifyToken, PatientVerifyToken, user_verification} = useContext(VerifyContext)
  const { DoctorUUID, PatientUUID, checkUUID} = useContext(UUIDContext);
  const [dashboardData, setDashboardData] = useState({});

  useEffect(() => {
    console.log("in doctor-dashboard useEffect");
    // if (pathname.startsWith("/vet-dashboard")) {
    user_verification()
    .then(result => {
      if (result === true) {
        return checkUUID();
      } else {
        throw new Error("Result from user_verification is false");
      }
    })
    .then(checkUUIDResult => {
      if (checkUUIDResult === true) {
        console.log(`Used ${DoctorDashboard.name} useEffect`);
        DashboardData();
      } else {
        throw new Error("Result from checkUUID is false");
      }
    })
    .catch(error => {
      console.error(error);
    });
    
  }, []);
 
  async function DashboardData (){
    try{
      const response = await DataService.fillDoctorDashboard()
      if (response){
        // console.log(response.data)
        setDashboardData(response.data);
      }else{
        console.log('no response')
      }
    }catch(error){
      console.log('unable to fillDoctorDashboard', error)
    }
  }

  if(PatientVerifyToken || PatientUUID){
    return(
      <Card>
        <Card.Body>
        <p>Unautorized to view Doctor Dashboard </p>;
        <Link to= {'/patient-dashboard'}>
              <Button variant="primary">
                  <p>Return to Patient Dashboard</p>
              </Button>
        </Link>
        </Card.Body>
      </Card>
    )
  }

  if(!DoctorUUID || !DoctorVerifyToken){
    return(
      <Card>
        <Card.Body>
          <p>Please register or login first </p>;
          <Link to= {'/vet-register'}>
              <Button variant="primary">
                  <p>Register</p>
              </Button>
        </Link>
        <Link to= {'/vet-login'}>
              <Button variant="primary">
                  <p>Login</p>
              </Button>
        </Link>
      </Card.Body>
    </Card>
    )
  }

  return (
    <div>
        <p>This is the Vet Dashboard Page</p>
        <Card style={{margin: '0 10px' }}>
          <Card.Body>
            <Card.Title>Dr. {dashboardData.FirstName} {dashboardData.LastName}</Card.Title>
            <Card.Text>
                My Birthdate is: {dashboardData.DOB_month} {dashboardData.DOB_day}, {dashboardData.DOB_year}<br></br>
                I am {dashboardData.Gender}<br></br>
                My email is {dashboardData.email}
              </Card.Text>
          </Card.Body>
       </Card>
    </div>
  )
}
