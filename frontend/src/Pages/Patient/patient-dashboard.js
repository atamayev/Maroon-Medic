import React, {useEffect, useState, useContext} from 'react'
import {Card} from 'react-bootstrap';
import DataService from "../../Services/data-service.js"
import { VerifyContext } from '../../Contexts/VerifyContext.js';
import Header from '../header.js';
import { UserIsUnAuthDoctor } from '../../Components/user-type-unauth.js';

export default function PatientDashboard() {
  const {user_verification} = useContext(VerifyContext)
  const [dashboardData, setDashboardData] = useState({});
  const [user_type, setUser_type] = useState(null);

  useEffect(() => {
    user_verification()
    .then(result => {
      if (result.verified === true) {
        setUser_type(result.user_type)
        if(result.user_type === 'Patient'){
          try{
            const storedDashboardData = sessionStorage.getItem("PatientDashboardData")
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
      const response = await DataService.fillPatientDashboard()
      if (response){
        setDashboardData(response.data);
        sessionStorage.setItem("PatientDashboardData", JSON.stringify(response.data))
      }else{
        console.log('no response')
      }
    }catch(error){
      console.log('unable to fillPatientDashboard', error)
    }
  }

  if(user_type === 'Doctor' || user_type !== 'Patient'){
    return(
      <UserIsUnAuthDoctor user_type = {user_type} />
    )
  }

  return (
    <div>
        <Header dropdown = {true} search = {true}/>
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
