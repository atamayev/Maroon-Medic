import React, {useEffect, useState, useContext} from 'react'
import {Card, Badge , Tooltip } from 'react-bootstrap';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import PrivatePatientDataService from '../../Services/private-patient-data-service.js';
import { VerifyContext } from '../../Contexts/VerifyContext.js';
import Header from '../header.js';
import { NonPatientAccess } from '../../Components/user-type-unauth.js';
import moment from 'moment';

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
  const [personalInfo, setPersonalInfo] = useState(JSON.parse(sessionStorage.getItem('PatientPersonalInfo')));
  const [dashboardData, setDashboardData] = useState([]);
  const [pastAppointments, setPastAppointments] = useState([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [user_type, setUser_type] = useState(null);
  const newPatient = document.cookie.split(';').some((item) => item.trim().startsWith('PatientNew_User'));

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
    })
    .catch(error => {
      console.error(error);
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const sessionInfo = sessionStorage.getItem('PatientPersonalInfo');
      if (sessionInfo) {
        setPersonalInfo(JSON.parse(sessionInfo));
        clearInterval(interval); // Clear the interval once the data is set
      }
    }, 10); // Check every 10 miliseconds
  
    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (dashboardData.length > 0) {
      const now = moment();
      const pastAppointments = dashboardData.filter(appointment =>
        moment(appointment.appointment_date, "MMMM Do, YYYY, h:mm A") < now
      );
      const upcomingAppointments = dashboardData.filter(appointment =>
        moment(appointment.appointment_date, "MMMM Do, YYYY, h:mm A") >= now
      );
  
      setPastAppointments(pastAppointments);
      setUpcomingAppointments(upcomingAppointments);
    }
  }, [dashboardData]);

  if(user_type !== 'Patient'){
    return(
      <NonPatientAccess/>
    )
  }

  const AppointmentCard = ({appointment, index}) =>{
    return(
      <>
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
      </>
    )
  };

  const renderUpcomingAppointments = (upcomingAppointments) =>{
    if (upcomingAppointments.length){
      return(
        <>
          {upcomingAppointments.map((appointment, index) => (
            <AppointmentCard key={index} appointment={appointment} index={index} />
          ))}
        </>
      )
    }else{
      return(
        <>
          No upcoming appointments
        </>
      )
    }
  }

  const renderPastAppointments = (pastAppointments) =>{
    if (pastAppointments.length){
      return(
        <>
          {pastAppointments.map((appointment, index) => (
            <AppointmentCard key={index} appointment={appointment} index={index} />
          ))}
        </>
      )
    }else{
      return(
        <>
          No past appointments
        </>
      )
    }
  }

  const renderDashboardData = () => {
    if (dashboardData.length) {
      return (
        <>
          <Card style={{margin: '0 10px' }}className='mb-3'>
            <Card.Header>
              <h1>Upcoming Appointments</h1>
            </Card.Header>
            <Card.Body>
              {renderUpcomingAppointments(upcomingAppointments)}
            </Card.Body>
          </Card>

          <Card style={{margin: '0 10px' }}>
            <Card.Header>
              <h1>Past Appointments</h1>
            </Card.Header>
            <Card.Body>
              {renderPastAppointments(pastAppointments)}
            </Card.Body>
          </Card>
        </>
      );
    } else {
      return (
        <div>No upcoming appointments</div>
      );
    }
  };  

  return (
    <div>
      <Header dropdown={true} search={true} />
      {personalInfo ? (<>
        <p>Welcome{newPatient?(<> to MaroonMedic</>):(<> back</>)}, {personalInfo.FirstName}</p>
        </>) : 
        (<>
          Loading...
        </>)}
        {renderDashboardData()}
    </div>
  );
};
