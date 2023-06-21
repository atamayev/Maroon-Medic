import React, { useState, useEffect, useContext} from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate, useLocation } from "react-router-dom";
import { VerifyContext } from '../../contexts/verify-context';
import { NonPatientAccess } from '../../components/user-type-unauth';
import CalendarDataService from '../../services/calendar-data-service';
import { invalidUserAction } from '../../custom-hooks/user-verification-snippets';
import Header from '../header';

async function confirmBooking(e, navigate, selectedService, selectedLocation, selectedDay, selectedTime, personalData) {
  e.preventDefault();
  let AppointmentObject = {
    Service_and_category_list_ID: selectedService.service_and_category_listID,
    appointment_date: selectedDay,
    appointment_time: selectedTime,
    NVI: personalData.NVI,
    Addresses_ID: selectedLocation.addressesID,
    Instant_book: selectedLocation.instant_book
  };

  try {
    const response = await CalendarDataService.makeAppointment(AppointmentObject);
    if (response.status === 200) {
      sessionStorage.removeItem('bookingDetails');
      navigate('/patient-dashboard');
    }
  } catch(error) {
    if (error.response.status === 401) invalidUserAction(error.response.data)
  }
};

export function FinalizeBookingPage() {
  const location = useLocation();
  const { selectedService, selectedLocation, selectedDay, selectedTime, personalData } = location.state;
  const {user_verification} = useContext(VerifyContext);
  const [user_type, setUser_type] = useState(null);
  const navigate = useNavigate();
  console.log(location.state)
  
  useEffect(() => {
    const verifyAndSetUserType= async () => {
      const result = await user_verification();
      if (result.verified === true) setUser_type(result.user_type)
    }

    verifyAndSetUserType()
  }, []);

  if (user_type !== 'Patient') return <NonPatientAccess/>

  const capitalizedFirstName = personalData.FirstName.charAt(0).toUpperCase() + personalData.FirstName.slice(1);
  const capitalizedLastName = personalData.LastName.charAt(0).toUpperCase() + personalData.LastName.slice(1);

  const renderInstantBook = () => {
    if (selectedLocation.instant_book) return <>Confirm</>
    return <>Request</>
  }

  return (
    <>
      <Header dropdown = {true} search = {true}/>
      <div className="container mt-5">
          <Card>
            <Card.Header as="h2">{renderInstantBook()} an Appointment</Card.Header>
            <Card.Body>
              <Card.Title as="h3">Dr. {''} {capitalizedFirstName} {''} {capitalizedLastName}</Card.Title>
              <Card.Text>
                <strong>Service:</strong> {selectedService.Service_name} <br />
                <strong>Location:</strong> {selectedLocation.address_title}:  {selectedLocation.address_line_1} {selectedLocation.address_line_2}<br />
                <strong>Day:</strong> {selectedDay} <br />
                <strong>Time:</strong> {selectedTime} <br />
              </Card.Text>
              <Button 
                variant="primary"
                onClick={(e) => {
                  confirmBooking(
                    e,
                    navigate,
                    selectedService, 
                    selectedLocation,
                    selectedDay,
                    selectedTime,
                    personalData
                  )
                }}
              >{renderInstantBook()}</Button>
            </Card.Body>
          </Card>
      </div>
    </>
  );
};
