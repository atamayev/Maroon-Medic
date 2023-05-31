import React, {useEffect, useState, useContext} from 'react'
import {Card, Badge , Tooltip } from 'react-bootstrap';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import PrivatePatientDataService from '../../Services/private-patient-data-service.js';
import { VerifyContext } from '../../Contexts/VerifyContext.js';
import Header from '../header.js';
import { NonPatientAccess } from '../../Components/user-type-unauth.js';

async function fetchPatientDashboardData(setDashboardData){
  try{
    const response = await PrivatePatientDataService.fillPatientDashboard()
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

export default function PatientDashboard() {
  const {user_verification} = useContext(VerifyContext)
  const [dashboardData, setDashboardData] = useState([]);
  const [user_type, setUser_type] = useState(null);

  useEffect(() => {
    user_verification()
    .then(result => {
      if (result.verified === true) {
        setUser_type(result.user_type)
        if(result.user_type === 'Patient'){
          try{
            // const storedDashboardData = sessionStorage.getItem("PatientDashboardData")
            // if (storedDashboardData){
            //   setDashboardData(JSON.parse(storedDashboardData));
            // }else{
              fetchPatientDashboardData(setDashboardData);
            // }
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

  if(user_type !== 'Patient'){
    return(
      <NonPatientAccess/>
    )
  }

  return (
    <div>
        <Header dropdown = {true} search = {true}/>
        {dashboardData.length ?
          <>
          <h1>Upcoming Appointments</h1>
            {dashboardData.map((appointment, index) => (
              <Card key={index} style={{ margin: '0 10px', position: 'relative' }}>
                <Card.Body>
                  <Card.Title>
                    Appointment with Dr. {appointment.Doctor_FirstName} {appointment.Doctor_LastName} on {appointment.appointment_date}
                    {appointment.Doctor_confirmation_status === 0 ? (
                      <OverlayTrigger
                          placement="top"
                          overlay={<Tooltip id={`tooltip-top`}>Dr. {appointment.Doctor_FirstName} has not yet approved your appointment.</Tooltip>}
                      >
                          <Badge pill style={{ position: 'absolute', top: '10px', right: '10px', border: '2px solid yellow' }}>
                              Pending approval
                          </Badge>
                      </OverlayTrigger>
                    ) : (
                      <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id={`tooltip-top`}>Dr. {appointment.Doctor_FirstName} is looking forward to the appointment.</Tooltip>}
                        >
                          <Badge pill variant="success" style={{ position: 'absolute', top: '10px', right: '10px' }}>
                            Appointment approved
                          </Badge>
                      </OverlayTrigger>
                      )}
                  </Card.Title>
                </Card.Body>
              </Card>
            ))}
          </>   
                : <p>No past or upcoming appointments</p> /* or whatever you want to show when dashboardData is not defined */
            }
    </div>
  );
};
