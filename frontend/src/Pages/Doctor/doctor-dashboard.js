import React, {useEffect, useState, useContext} from 'react'
import {Link} from "react-router-dom";
import {Button, Card} from 'react-bootstrap';
import PrivateDoctorDataService from "../../Services/private-doctor-data-service.js"
import { VerifyContext } from '../../Contexts/VerifyContext.js';
import DoctorHeader from './doctor-header.js';
import Header from '../header.js';

export default function DoctorDashboard() {
  const {user_verification} = useContext(VerifyContext)
  const [dashboardData, setDashboardData] = useState({});
  const [user_type, setUser_type] = useState(null);
  const newDoctor = document.cookie.split(';').some((item) => item.trim().startsWith('DoctorNew_User'));

  useEffect(() => {
    console.log("in doctor-dashboard useEffect");
    user_verification()
    .then(result => {
      if (result.verified === true) {
        setUser_type(result.user_type)
        if(result.user_type === 'Doctor'){
          try{
            console.log(`Used ${DoctorDashboard.name} useEffect`);
            setUser_type('Doctor')
            const storedDashboardData = sessionStorage.getItem("DoctorDashboardData")
            if (storedDashboardData){
              setDashboardData(JSON.parse(storedDashboardData));
            }else{
              console.log('fetching data from db (elsed)')
              DashboardData();
            }
          }catch(error){
            console.log(error)
          }
        }
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
      const response = await PrivateDoctorDataService.fillDashboard()
      if (response){
        setDashboardData(response.data);
        sessionStorage.setItem("DoctorDashboardData", JSON.stringify(response.data))
      }else{
        console.log('no response')
      }
    }catch(error){
      console.log('unable to fillDoctorDashboard', error)
    }
  }

  if(user_type === 'Patient'){
    return(
      <>
        <Header dropdown = {true} search = {true}/>
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
      </>
    )
  }

  if(user_type !== 'Doctor'){
    return(
      <>
        <Header dropdown = {true} search = {true}/>
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
      </>
    )
  }

  const renderDashboardData = ()=>{
    if(dashboardData){
      return(
        <div>
        <Card.Title>Dr. {dashboardData.FirstName} {dashboardData.LastName}</Card.Title>
          <Card.Text>
              My Birthdate is: {dashboardData.DOB_month} {dashboardData.DOB_day}, {dashboardData.DOB_year}<br></br>
              I am {dashboardData.Gender}<br></br>
              My email is {dashboardData.email}
          </Card.Text>
        </div>
      )
    }else{
      return(
        <div>Loading...</div>
      )
    }
  }

  return (
    <>
      <Header dropdown = {true}/>
      <DoctorHeader/>
        <p>Welcome{newDoctor?(<> to MaroonMedic</>):(<> back</>)}, Dr. {dashboardData.LastName}</p>
        <Card style={{margin: '0 10px' }}>
          <Card.Body>
            {renderDashboardData()}
          </Card.Body>
       </Card>
    </>
  )
};
