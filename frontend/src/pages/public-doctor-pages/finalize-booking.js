import { useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate, useLocation } from "react-router-dom";
import { NonPatientAccess } from '../../components/user-type-unauth';
import useSimpleUserVerification from '../../custom-hooks/use-simple-user-verification';
import { confirmBooking } from '../../custom-hooks/public-doctor-hooks/confirm-booking-hook';
import Header from '../header';

const handleConfirmBooking = (e, navigate, selectedService, selectedLocation, selectedDay, selectedTime, personalData) => {
  e.preventDefault();
  confirmBooking(navigate, selectedService, selectedLocation, selectedDay, selectedTime, personalData)
}

export function FinalizeBookingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { userType } = useSimpleUserVerification(false);

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
            handleConfirmBooking(
              e,
              navigate,
              selectedService, 
              selectedLocation,
              selectedDay,
              selectedTime,
              personalData
            )
          }}
        >
          {renderConfirmOrRequestBook()}
        </Button>
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
