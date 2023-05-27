import React, { useState, useEffect, useContext} from 'react';
import { VerifyContext } from '../../Contexts/VerifyContext';
import { useLocation } from "react-router-dom";
import { NonPatientAccess } from '../../Components/user-type-unauth';
import Header from '../header';
import { Card, Button } from 'react-bootstrap';

export function FinalizeBookingPage() {
  const location = useLocation();
  const { selectedService, selectedLocation, selectedDay, selectedTime, personalData } = location.state;
  const {user_verification} = useContext(VerifyContext);
  const [user_type, setUser_type] = useState(null);

  useEffect(()=>{
      user_verification()
      .then(result => {
        if (result.verified === true) {
          setUser_type(result.user_type)
          if(result.user_type !== 'Patient'){
            console.log('not patient, need to re-direct')
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
          //Need to figure out how to ask the pt to make an account, and then re-direct to finalize booking
        <NonPatientAccess/>
      )
  }

  const capitalizedFirstName = personalData.FirstName.charAt(0).toUpperCase() + personalData.FirstName.slice(1);
  const capitalizedLastName = personalData.LastName.charAt(0).toUpperCase() + personalData.LastName.slice(1);

  return (
    <>
      <Header dropdown = {true} search = {true}/>
      <div className="container mt-5">
          <Card>
              <Card.Header as="h2">Confirm Appointment</Card.Header>
              <Card.Body>
              <Card.Title as="h3">Dr. {''} {capitalizedFirstName} {''} {capitalizedLastName}</Card.Title>
              <Card.Text>
                  <strong>Service:</strong> {selectedService.Service_name} <br />
                  <strong>Location:</strong> {selectedLocation.address_title}:  {selectedLocation.address_line_1} {selectedLocation.address_line_2}<br />
                  <strong>Day:</strong> {selectedDay} <br />
                  <strong>Time:</strong> {selectedTime} <br />
              </Card.Text>
              <Button variant="primary">Confirm Booking</Button>
              </Card.Body>
          </Card>
      </div>
    </>
  );
};
