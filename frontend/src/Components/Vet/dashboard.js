import React, {useEffect, useState, useContext} from 'react'
import {Link} from "react-router-dom";
import {Button, Card} from 'react-bootstrap';
import VetDataService from "../../Services/vet-service.js"
import { UUIDContext } from '../../Wraps/UUIDContext.js';

export default function Dashboard() {
  const [verifyToken, setverifyToken] = useState(false) // wheather or not user verified
  const [dashboardData, setDashboardData] = useState({});
  const { DoctorUUID, checkDoctorUUID } = useContext(UUIDContext);

  useEffect(()=>{
    user_verification();
    checkDoctorUUID();
  }, []);
  
  async function user_verification (){
    const cookies = document.cookie;
    if(cookies){
      try {
          const response = await VetDataService.verify(cookies)
        if(response.data.success === true){
          console.log('verified')
          setverifyToken(true);
          await DashboardData();
        }
        else{// if user not veriifed
          console.log('not verified')
          setverifyToken(false);
        }
      }catch(error){
        if(error.response.data.error === 'Token expired'){
          return(
            <div>
                <Card>
                  <Card.Body>
                    <p>Session Timed out. Please log in again </p>;
                    <Link to= {'/vet-login'}>
                      <Button variant="primary">
                          <p>Login</p>
                      </Button>
                    </Link>
                  </Card.Body>
                </Card>
            </div>
          )
        }
        console.log(error.response.data.error)
        setverifyToken(false);
      }
    }
    else{// if no token received
      console.log('not verified')
      setverifyToken(false);
    }
  }

  async function DashboardData (){
    const cookies = document.cookie;
    if(cookies){
          try{
            const response = await VetDataService.fillDashboard(cookies)
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
