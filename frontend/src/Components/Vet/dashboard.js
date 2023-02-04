import React, {useEffect, useState, useContext} from 'react'
import {Link} from "react-router-dom";
import {Button, Card} from 'react-bootstrap';
import VetDataService from "../../Services/vet-service.js"
import { UUIDContext } from '../../Wraps/UUIDContext.js';
import { VerifyContext } from '../../Wraps/VerifyContext.js';

export default function Dashboard() {
  // const [verifyToken, setverifyToken] = useState(false) // wheather or not user verified
  const {verifyToken, user_verification} = useContext(VerifyContext)
  const { DoctorUUID, checkDoctorUUID } = useContext(UUIDContext);
  const [dashboardData, setDashboardData] = useState({});
  const cookie_monster = document.cookie;

  useEffect(()=>{
    user_verification(cookie_monster);
    checkDoctorUUID();
    console.log('verifyToken', verifyToken)
    console.log('DoctorUUID',DoctorUUID)
    // DashboardData(
    if (verifyToken && DoctorUUID){
        console.log('verify and uuid')
        DashboardData();
    }
  }, []);
 
  async function DashboardData (){
    console.log('in dashboard data')
    if(cookie_monster){
      console.log('in cookies')
          try{
            const response = await VetDataService.fillDashboard(cookie_monster)
            if (response){
              console.log(response.data)
              setDashboardData(response.data);
            }else{
              console.log('no response')
            }
          }catch(error){
            console.log('unable to fill in dashboard data', error)
          }
      }
    else{
      console.log('no cookies')
    }
  }

  if(!DoctorUUID && !verifyToken){
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

  if(!verifyToken){
    return(
      <Card>
        <Card.Body>
          <p>Please register first </p>;
          <Link to= {'/register'}>
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
        <p>This is the Dashboard Page</p>
        <Card style={{margin: '0 10px' }}>
          <Card.Body>
            <Card.Title>{dashboardData.FirstName} {dashboardData.LastName}</Card.Title>
            <Card.Text>
                My Birthdate is: {dashboardData.DOB_month}/{dashboardData.DOB_day}/{dashboardData.DOB_year}<br></br>
                I am {dashboardData.Gender}<br></br>
                My email is {dashboardData.email}
              </Card.Text>
          </Card.Body>
       </Card>
    </div>
  )
}