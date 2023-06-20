import _ from "lodash"
import moment from 'moment';
import React, {useEffect, useState, useContext} from 'react'
import { Card, Badge, Button } from 'react-bootstrap';
import { VerifyContext } from '../../contexts/verify-context.js';
import { NonDoctorAccess } from '../../components/user-type-unauth.js';
import PrivateDoctorDataService from "../../services/private-doctor-data-service.js"
import { invalidUserAction } from '../../custom-hooks/user-verification-snippets.js';
import Header from '../header.js';
import DoctorHeader from './doctor-header.js';

async function fetchDoctorDashboardData(setDashboardData) {
  try {
    const response = await PrivateDoctorDataService.fillDashboard()
    if (response) {
      setDashboardData(response.data);
      sessionStorage.setItem("DoctorDashboardData", JSON.stringify(response.data))
    }
  } catch(error) {
    if (error.response.status === 401) invalidUserAction(error.response.data)
  }
}

async function approveAppointment (setStatus, AppointmentsID, dashboardData, setDashboardData) {
  try {
    const response = await PrivateDoctorDataService.confirmAppointment(AppointmentsID)
    if (response.status === 200) {
      // Update the Doctor_confirmation_status for the specific appointment
      const updatedDashboardData = dashboardData.map(appointment => {
        if (appointment.AppointmentsID === AppointmentsID) return { ...appointment, Doctor_confirmation_status: 1 };
        return appointment;
      });
      setDashboardData(updatedDashboardData);
      setStatus('approved');
    } else {
      setStatus('pending');
    }
  } catch(error) {
    if (error.response.status === 401) invalidUserAction(error.response.data)
    else setStatus('pending');
  }
};

export default function DoctorDashboard() {
  const {user_verification} = useContext(VerifyContext)
  const [personalInfo, setPersonalInfo] = useState(JSON.parse(sessionStorage.getItem('DoctorPersonalInfo')));
  const [dashboardData, setDashboardData] = useState([]);
  const [pastAppointments, setPastAppointments] = useState([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [user_type, setUser_type] = useState(null);
  const newDoctor = document.cookie.split(';').some((item) => item.trim().startsWith('DoctorNew_User'));

  const verifyAndSetDashboardData = async () => {
    const result = await user_verification();
    if (result.verified === true) {
      setUser_type(result.user_type)
      if (result.user_type === 'Doctor') {
        try {
          setUser_type('Doctor')
          // const storedDashboardData = sessionStorage.getItem("DoctorDashboardData")
          // if (storedDashboardData) {
          //   setDashboardData(JSON.parse(storedDashboardData));
          // } else {
            fetchDoctorDashboardData(setDashboardData);
          // }
        } catch(error) {
        }
      }
    }
  };

  useEffect(() => {
    verifyAndSetDashboardData()
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const sessionInfo = sessionStorage.getItem('DoctorPersonalInfo');
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

  if (user_type !== 'Doctor') return <NonDoctorAccess/>

  const returnDoctorConfirmationStatus = (appointment) => {
    if (appointment.Doctor_confirmation_status === 0) return 'pending'
    return 'approved'
  }

  const UpcomingAppointmentCard = ({ appointment, index }) => {
    const [status, setStatus] = useState(returnDoctorConfirmationStatus(appointment));
    return (
      <Card key={index} style={{ margin: '0 10px', position: 'relative' }} className='mb-3'>
        <Card.Body>
          <Card.Title>
            Appointment with {appointment.Patient_FirstName} {appointment.Patient_LastName} on {appointment.appointment_date}
           
            {status === 'pending' && (
              <Button variant='warning' onClick={() => {setStatus('confirming')}}>Pending approval</Button>
            )}
            {status === 'confirming' && (
              <div>
                <Button variant="success" onClick={e => approveAppointment(setStatus, appointment.AppointmentsID, dashboardData, setDashboardData)}>Approve Appointment</Button>
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

  const PastAppointmentCard = ({ appointment, index }) => {
    return (
      <Card key={index} style={{ margin: '0 10px', position: 'relative' }} className='mb-3'>
        <Card.Body>
          <Card.Title>
            Appointment with {appointment.Patient_FirstName} {appointment.Patient_LastName} on {appointment.appointment_date}
          </Card.Title>
        </Card.Body>
      </Card>
    );
  };

  const renderUpcomingAppointments = (upcomingAppointments) => {
    if (_.isEmpty(upcomingAppointments)) return <>No upcoming appointments</>
    return(
      <>
        {upcomingAppointments.map((appointment, index) => (
          <UpcomingAppointmentCard key={index} appointment={appointment} index={index} />
        ))}
      </>
    )
  }

  const renderPastAppointments = (pastAppointments) => {
    if (_.isEmpty(pastAppointments)) return <>No past appointments</>
    return(
      <>
        {pastAppointments.map((appointment, index) => (
          <PastAppointmentCard key = {index} appointment = {appointment} index = {index} />
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
    )
  }
  const renderWelcomeOrBack = () => {
    if (newDoctor) return <> to MaroonMedic</>
    return <> back</>
  }

  const renderisPersonalInfo = () => {
    if (!personalInfo) return <>Loading...</>
    return <p>Welcome{renderWelcomeOrBack()}, Dr. {personalInfo.LastName}</p>
  }

  return (
    <>
      <Header dropdown = {true}/>
      <DoctorHeader/>
      {renderisPersonalInfo()}
      {renderDashboardData()}
    </>
  )
};
