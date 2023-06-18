import React, {useEffect, useState, useContext} from 'react'
import {Card, Badge , Tooltip } from 'react-bootstrap';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import PrivatePatientDataService from '../../Services/private-patient-data-service.js';
import { VerifyContext } from '../../Contexts/VerifyContext.js';
import Header from '../header.js';
import { NonPatientAccess } from '../../Components/user-type-unauth.js';
import moment from 'moment';
import PatientHeader from './patient-header.js';
import _ from "lodash"

async function fetchPatientDashboardData(setDashboardData) {
  try {
    const response = await PrivatePatientDataService.fillDashboard()
    if (response) {
      setDashboardData(response.data);
      sessionStorage.setItem("PatientDashboardData", JSON.stringify(response.data))
    }
  } catch(error) {
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
          if (result.user_type === 'Patient') {
            try {
              // const storedDashboardData = sessionStorage.getItem("PatientDashboardData")
              // if (storedDashboardData) {
              //   setDashboardData(JSON.parse(storedDashboardData));
              // } else {
                fetchPatientDashboardData(setDashboardData);
              // }
            } catch(error) {
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
    if (!_.isEmpty(dashboardData)) {
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

  if (user_type !== 'Patient') return <NonPatientAccess/>

  const renderAppointmentConfirmationStatus = (appointment) => {
    if (appointment.Doctor_confirmation_status === 0) {
      return (
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id={`tooltip-top`}>Dr. {appointment.Doctor_FirstName} has not yet approved your appointment.</Tooltip>}
        >
          <Badge pill style={{ position: 'absolute', top: '10px', right: '10px', border: '2px solid yellow' }}>
            Pending approval
          </Badge>
        </OverlayTrigger>
      )
    }
    return (
      <OverlayTrigger
        placement="top"
        overlay={<Tooltip id={`tooltip-top`}>Dr. {appointment.Doctor_FirstName} is looking forward to the appointment.</Tooltip>}
      >
        <Badge pill variant="success" style={{ position: 'absolute', top: '10px', right: '10px' }}>
          Appointment approved
        </Badge>
    </OverlayTrigger>
    )
  }
  
  const AppointmentCard = ({appointment, index}) => {
    return(
      <>
        <Card key={index} style={{ margin: '0 10px', position: 'relative' }}>
          <Card.Body>
            <Card.Title>
              Appointment with Dr. {appointment.Doctor_FirstName} {appointment.Doctor_LastName} on {appointment.appointment_date}
              {renderAppointmentConfirmationStatus(appointment)}
            </Card.Title>
          </Card.Body>
        </Card>
      </>
    )
  };

  const renderUpcomingAppointments = (upcomingAppointments) => {
    if (_.isEmpty(upcomingAppointments)) return <>No upcoming appointments</>
    return (
      <>
        {upcomingAppointments.map((appointment, index) => (
          <AppointmentCard key={index} appointment={appointment} index={index} />
        ))}
      </>
    )
  }

  const renderPastAppointments = (pastAppointments) => {
    if (_.isEmpty(pastAppointments)) return <>No past appointments</>
    return (
      <>
        {pastAppointments.map((appointment, index) => (
          <AppointmentCard key={index} appointment={appointment} index={index} />
        ))}
      </>
    )
  }

  const renderDashboardData = () => {
    if (_.isEmpty(dashboardData)) return <>No upcoming appointments</>
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
  };

  const renderWelcomeOrBack = () => {
    if (newPatient) return <> to MaroonMedic</>
    return <> back</>
  }

  const renderisPersonalInfo = () => {
    if (!personalInfo) return <>Loading...</>
    return <p>Welcome{renderWelcomeOrBack()}, {personalInfo.FirstName}</p>
  }

  return (
    <div>
      <Header dropdown={true} search={true} />
      <PatientHeader />
      {renderisPersonalInfo()}
      {renderDashboardData()}
    </div>
  );
};
