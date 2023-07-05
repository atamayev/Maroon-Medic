import _ from "lodash"
import moment from 'moment';
import { useEffect, useState } from 'react'
import { Card, Badge , Tooltip } from 'react-bootstrap';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { NonPatientAccess } from '../../components/user-type-unauth.js';
import { useDashboardData } from "../../custom-hooks/fetch-and-use-dashboard-info.js";
import useSimpleUserVerification from "../../custom-hooks/use-simple-user-verification.js";
import Header from '../header.js';
import PatientHeader from './patient-header.js';

export default function PatientDashboard() {
  const { userType } = useSimpleUserVerification();
  const { dashboardData } = useDashboardData(userType);
  const [personalInfo, setPersonalInfo] = useState(JSON.parse(sessionStorage.getItem('PatientPersonalInfo')));
  const [pastAppointments, setPastAppointments] = useState([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const newPatient = document.cookie.split(';').some((item) => item.trim().startsWith('PatientNewUser'));

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

  if (userType !== 'Patient') return <NonPatientAccess/>

  const renderAppointmentConfirmationStatus = (appointment) => {
    if (appointment.Doctor_confirmation_status === 0) {
      return (
        <OverlayTrigger
          placement = "top"
          overlay = {<Tooltip id = {`tooltip-top`}>Dr. {appointment.Doctor_FirstName} has not yet approved your appointment.</Tooltip>}
        >
          <Badge pill style = {{ position: 'absolute', top: '10px', right: '10px', border: '2px solid yellow' }}>
            Pending approval
          </Badge>
        </OverlayTrigger>
      )
    }
    return (
      <OverlayTrigger
        placement = "top"
        overlay = {<Tooltip id = {`tooltip-top`}>Dr. {appointment.Doctor_FirstName} is looking forward to the appointment.</Tooltip>}
      >
        <Badge pill variant = "success" style = {{ position: 'absolute', top: '10px', right: '10px' }}>
          Appointment approved
        </Badge>
    </OverlayTrigger>
    )
  }

  const renderMessageSection = (appointment) => {
    if (!appointment.patient_message) return null
    return (
      <span style={{ display: 'block' }}>
        Your Message: {''}
        {appointment.patient_message}
      </span>
    )
  }

  const UpcomingAppointmentCard = ({appointment}) => {
    return (
      <>
        <Card style = {{ margin: '0 10px', position: 'relative' }}>
          <Card.Body>
            <Card.Title>
              Appointment with Dr. {appointment.Doctor_FirstName} {appointment.Doctor_LastName} on {appointment.appointment_date}
              {renderAppointmentConfirmationStatus(appointment)}
            </Card.Title>
            <Card.Text>
              {renderMessageSection(appointment)}
            </Card.Text>
          </Card.Body>
        </Card>
      </>
    )
  };
  
  const PastAppointmentCard = ({appointment}) => {
    return (
      <>
        <Card style = {{ margin: '0 10px', position: 'relative' }}>
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
        {upcomingAppointments.map((appointment) => (
          <UpcomingAppointmentCard key = {appointment.AppointmentsID} appointment = {appointment} />
        ))}
      </>
    )
  }

  const renderPastAppointments = (pastAppointments) => {
    if (_.isEmpty(pastAppointments)) return <>No past appointments</>
    return (
      <>
        {pastAppointments.map((appointment) => (
          <PastAppointmentCard key = {appointment.AppointmentsID} appointment = {appointment} />
          ))}
      </>
    )
  }

  const renderUpcomingAppointmentsCard = () => {
    return (
      <>
        <Card style = {{margin: '0 10px' }} className = 'mb-3'>
          <Card.Header>
            <h1>Upcoming Appointments</h1>
          </Card.Header>
          <Card.Body>
            {renderUpcomingAppointments(upcomingAppointments)}
          </Card.Body>
        </Card>
      </>
    )
  }

  const renderPastAppointmentsCard = () => {
    return (
      <>
        <Card style = {{margin: '0 10px' }}>
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

  const renderDashboardData = () => {
    if (_.isEmpty(dashboardData)) return <>No upcoming appointments</>
    return (
      <>
        {renderUpcomingAppointmentsCard()}
        {renderPastAppointmentsCard()}
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
      <Header dropdown = {true} search = {true} />
      <PatientHeader />
      {renderisPersonalInfo()}
      {renderDashboardData()}
    </div>
  );
};
