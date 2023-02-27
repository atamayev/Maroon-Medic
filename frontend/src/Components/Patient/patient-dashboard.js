import React, {useEffect, useState, useContext} from 'react'
import {Link} from "react-router-dom";
import {Button, Card} from 'react-bootstrap';
import DataService from "../../Services/data-service.js"
import { VerifyContext } from '../../Contexts/VerifyContext.js';

export default function PatientDashboard() {
  const {user_verification} = useContext(VerifyContext)
  const [dashboardData, setDashboardData] = useState({});
  const [user_type, setUser_type] = useState(null);

  useEffect(() => {
    console.log("in patient-dashboard useEffect");
    user_verification()
    .then(result => {
      if (result.verified === true && result.PatientToken) {
        console.log(`Used ${PatientDashboard.name} useEffect`);
        setUser_type('Patient')
        const storedDashboardData = sessionStorage.getItem("PatientDashboardData")
        if (storedDashboardData){
          setDashboardData(JSON.parse(storedDashboardData));
        }else{
          console.log('fetching data from db (elsed)')
          DashboardData();
        }
      }
      else if (result.verified === true && result.DoctorToken){
        setUser_type('Doctor')
      }
      else{
        console.log('Unverified')
      }
    })
    .catch(error => {
      console.error(error);
    });
  }, []);
 
  async function DashboardData (){
    try{
      const response = await DataService.fillPatientDashboard()
      if (response){
        // console.log(response.data)
        setDashboardData(response.data);
        sessionStorage.setItem("PatientDashboardData", JSON.stringify(response.data))
      }else{
        console.log('no response')
      }
    }catch(error){
      console.log('unable to fillPatientDashboard', error)
    }
  }

  if (user_type === 'Doctor'){
    return(
      <Card>
        <Card.Body>
        <p>Unautorized to view Patient Dashboard</p>
        <Link to= {'/vet-dashboard'}>
              <Button variant="primary">
                  <p>Return to Doctor Dashboard</p>
              </Button>
        </Link>
        </Card.Body>
      </Card>
    )
  }

  if(user_type !== 'Patient'){
    return(
      <Card>
        <Card.Body>
          <p>Please register or login first </p>;
          <Link to= {'/patient-register'}>
              <Button variant="primary">
                  <p>Register</p>
              </Button>
        </Link>
        <Link to= {'/patient-login'}>
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
        <p>This is the Patient Dashboard Page</p>
        <Card style={{margin: '0 10px' }}>
          <Card.Body>
            <Card.Title>{dashboardData.FirstName} {dashboardData.LastName}</Card.Title>
            <Card.Text>
                My Birthdate is: {dashboardData.DOB_month} {dashboardData.DOB_day}, {dashboardData.DOB_year}<br></br>
                I am {dashboardData.Gender}<br></br>
                My email is {dashboardData.email}
              </Card.Text>
          </Card.Body>
       </Card>
    </div>
  )
};
