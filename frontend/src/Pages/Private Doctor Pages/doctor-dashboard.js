import React, {useEffect, useState, useContext} from 'react'
import {Card, Badge , Button } from 'react-bootstrap';
import PrivateDoctorDataService from "../../Services/private-doctor-data-service.js"
import { VerifyContext } from '../../Contexts/VerifyContext.js';
import DoctorHeader from './doctor-header.js';
import Header from '../header.js';
import { NonDoctorAccess } from '../../Components/user-type-unauth.js';

async function fetchDoctorDashboardData(setDashboardData){
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

export default function DoctorDashboard() {
  const {user_verification} = useContext(VerifyContext)
  const [personalInfo, setPersonalInfo] = useState(JSON.parse(sessionStorage.getItem('DoctorPersonalInfo')));
  const [dashboardData, setDashboardData] = useState([]);
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
            // const storedDashboardData = sessionStorage.getItem("DoctorDashboardData")
            // if (storedDashboardData){
            //   setDashboardData(JSON.parse(storedDashboardData));
            // }else{
              fetchDoctorDashboardData(setDashboardData);
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

  useEffect(() => {
    const interval = setInterval(() => {
      const sessionInfo = sessionStorage.getItem('DoctorPersonalInfo');
      if (sessionInfo) {
        setPersonalInfo(JSON.parse(sessionInfo));
      }
    }, 10); // Check every 10 miliseconds

    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, []);

  if(user_type !== 'Doctor'){
    return(
      <NonDoctorAccess/>
    )
  }

  async function approveAppointment (setStatus, AppointmentsID) {
    try{
      const response = await PrivateDoctorDataService.confirmAppointment(AppointmentsID)
      if (response.status === 200) {
        // Update the Doctor_confirmation_status for the specific appointment
        const updatedDashboardData = dashboardData.map(appointment => {
          if (appointment.AppointmentsID === AppointmentsID) {
            return { ...appointment, Doctor_confirmation_status: 1 };
          }
          return appointment;
        });
  
        setDashboardData(updatedDashboardData);
        setStatus('approved');
      }else{
        console.log('no response')
        setStatus('pending');
      }
    }catch(error){
      console.log('unable to fillDoctorDashboard', error)
      setStatus('pending');
    }
  };
  

  const AppointmentCard = ({ appointment, index }) => {
    const [status, setStatus] = useState(appointment.Doctor_confirmation_status === 0 ? 'pending' : 'approved');
  
    return (
      <Card key={index} style={{ margin: '0 10px', position: 'relative' }} className='mb-3'>
        <Card.Body>
          <Card.Title>
            Appointment with {appointment.Patient_FirstName} {appointment.Patient_FirstName} on {appointment.appointment_date}
            {status === 'pending' && (
              <Button onClick={() => setStatus('confirming')}>Pending approval</Button>
            )}
            {status === 'confirming' && (
              <div>
                <Button variant="success" onClick={e => approveAppointment(setStatus, appointment.AppointmentsID)}>Check</Button>
                <Button variant="danger" onClick={() => setStatus('pending')}>X</Button>
              </div>
            )}
            {status === 'approved' && (
              <Badge pill variant="success" style={{ position: 'absolute', top: '10px', right: '10px' }}>
                Appointment approved
              </Badge>
            )}
          </Card.Title>
        </Card.Body>
      </Card>
    );
  };

  const renderDashboardData = () => {
    if (dashboardData.length) {
      // console.log(dashboardData);
      return (
        <>
          <h1>Upcoming Appointments</h1>
          {dashboardData.map((appointment, index) => (
            <AppointmentCard key={index} appointment={appointment} index={index} />
          ))}
        </>
      );
    } else {
      return (
        <div>No upcoming appointments</div>
      );
    }
  };  

  return (
    <>
      <Header dropdown = {true}/>
      <DoctorHeader/>
      {personalInfo ? (<>
        <p>Welcome{newDoctor?(<> to MaroonMedic</>):(<> back</>)}, Dr. {personalInfo.LastName}</p>
        </>) : 
        (<>
          Loading...
        </>)}
        
        <Card style={{margin: '0 10px' }}>
          <Card.Body>
            {renderDashboardData()}
          </Card.Body>
       </Card>
    </>
  )
};
