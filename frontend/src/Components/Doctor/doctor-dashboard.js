import React, {useEffect, useState, useContext} from 'react'
import {Link} from "react-router-dom";
import {Button, Card} from 'react-bootstrap';
import DataService from "../../Services/data-service.js"
import { VerifyContext } from '../../Contexts/VerifyContext.js';
import DoctorHeader from './doctor-header.js';

export default function DoctorDashboard() {
  const {DoctorVerifyToken, PatientVerifyToken, user_verification} = useContext(VerifyContext)
  const [dashboardData, setDashboardData] = useState({});

  useEffect(() => {
    console.log("in doctor-dashboard useEffect");
    user_verification()
    .then(result => {
      if (result === true) {
        console.log(`Used ${DoctorDashboard.name} useEffect`);
        const storedDashboardData = sessionStorage.getItem("dashboardData")
        if (storedDashboardData){
          setDashboardData(JSON.parse(storedDashboardData));
        }else{
          console.log('fetching data from db (elsed)')
          DashboardData();
        }
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
        setDashboardData(response.data);
        sessionStorage.setItem("dashboardData", JSON.stringify(response.data))
      }else{
        console.log('no response')
      }
    }catch(error){
      console.log('unable to fillDoctorDashboard', error)
    }
  }

  if(PatientVerifyToken){
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
      <DoctorHeader/>
        <p>Welcome back, Dr. {dashboardData.LastName}</p>
        <Card style={{margin: '0 10px' }}>
          <Card.Body>
            {dashboardData ? (
              <div>
              <Card.Title>Dr. {dashboardData.FirstName} {dashboardData.LastName}</Card.Title>
                <Card.Text>
                    My Birthdate is: {dashboardData.DOB_month} {dashboardData.DOB_day}, {dashboardData.DOB_year}<br></br>
                    I am {dashboardData.Gender}<br></br>
                    My email is {dashboardData.email}
                </Card.Text>
              </div>
            ):
            (
              <Card.Title>Loading Data...</Card.Title>
            )
            }
            
          </Card.Body>
       </Card>
    </div>
  )
};
