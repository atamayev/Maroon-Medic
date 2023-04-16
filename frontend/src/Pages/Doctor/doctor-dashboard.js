import React, {useEffect, useState, useContext} from 'react'
import {Card} from 'react-bootstrap';
import PrivateDoctorDataService from "../../Services/private-doctor-data-service.js"
import { VerifyContext } from '../../Contexts/VerifyContext.js';
import DoctorHeader from './doctor-header.js';
import Header from '../header.js';
import { NonDoctorAccess } from '../../Components/user-type-unauth.js';

export default function DoctorDashboard() {
  const {user_verification} = useContext(VerifyContext)
  const [dashboardData, setDashboardData] = useState({});
  const [user_type, setUser_type] = useState(null);
  const newDoctor = document.cookie.split(';').some((item) => item.trim().startsWith('DoctorNew_User'));

  useEffect(() => {
    user_verification()
    .then(result => {
      if (result.verified === true) {
        setUser_type(result.user_type)
        if(result.user_type === 'Doctor'){
          try{
            setUser_type('Doctor')
            const storedDashboardData = sessionStorage.getItem("DoctorDashboardData")
            if (storedDashboardData){
              setDashboardData(JSON.parse(storedDashboardData));
            }else{
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

  if(user_type !== 'Doctor'){
    return(
      <NonDoctorAccess/>
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
