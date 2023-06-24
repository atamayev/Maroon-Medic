import { useState, useEffect, useContext} from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate, useLocation } from "react-router-dom";
import { VerifyContext } from '../../contexts/verify-context';
import { NonPatientAccess } from '../../components/user-type-unauth';
import CalendarDataService from '../../services/calendar-data-service';
import { invalidUserAction } from '../../custom-hooks/user-verification-snippets';
import useSimpleUserVerification from '../../custom-hooks/use-simple-user-verification';
import Header from '../header';

async function confirmBooking(e, navigate, selectedService, selectedLocation, selectedDay, selectedTime, personalData) {
  e.preventDefault();
  let AppointmentObject = {
    Service_and_category_list_ID: selectedService.service_and_category_listID,
    appointmentDate: selectedDay,
    appointmentTime: selectedTime,
    NVI: personalData.NVI,
    AddressesID: selectedLocation.addressesID,
    InstantBook: selectedLocation.instant_book
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
  const navigate = useNavigate();
  const { userType } = useSimpleUserVerification();

  let selectedService, selectedLocation, selectedDay, selectedTime, personalData;
  const sessionBookingDetails = JSON.parse(sessionStorage.getItem('bookingDetails'));

  if (location.state) {
    ({ selectedService, selectedLocation, selectedDay, selectedTime, personalData } = location.state);
  } else if (sessionBookingDetails) {
    ({ selectedService, selectedLocation, selectedDay, selectedTime, personalData } = sessionBookingDetails);
  }

  useEffect(() => {
    if (!location.state  && !sessionBookingDetails) {
      window.location.href = "/"
    }
  }, [location]);

  if (!location.state && !sessionBookingDetails) {
    return null; // or render some kind of loading spinner
  }

  if (userType !== 'Patient') return <NonPatientAccess/>
  
  const capitalizedFirstName = personalData.FirstName.charAt(0).toUpperCase() + personalData.FirstName.slice(1);

  const capitalizedLastName = personalData.LastName.charAt(0).toUpperCase() + personalData.LastName.slice(1);
  
  const renderConfirmOrRequestBook = () => {
    if (selectedLocation.instant_book) return <>Confirm</>
    return <>Request</>
  }

  const renderCardText = () => {
    return (
      <Card.Text>
        <div>
          <strong>Service:</strong> {selectedService.Service_name}
        </div>
        <div>
          <strong>Location:</strong> {selectedLocation.address_title}:  {selectedLocation.address_line_1} {selectedLocation.address_line_2}
        </div>
        <div>
          <strong>Day:</strong> {selectedDay}
        </div>
        <div>
          <strong>Time:</strong> {selectedTime}
        </div>
      </Card.Text>
    )
  }

  const renderConfirmBookingButton = () => {
    return (
      <>
        <Button 
          variant = "primary"
          onClick = {(e) => {
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
        >{renderConfirmOrRequestBook()}</Button>
      </>
    )
  }

  return (
    <>
      <Header dropdown = {true} search = {true}/>
      <div className = "container mt-5">
          <Card>
            <Card.Header as = "h2">{renderConfirmOrRequestBook()} an Appointment</Card.Header>
            <Card.Body>
              <Card.Title as = "h3">Dr. {''} {capitalizedFirstName} {''} {capitalizedLastName}</Card.Title>
                {renderCardText()}
                {renderConfirmBookingButton()}
            </Card.Body>
          </Card>
      </div>
    </>
  );
};
