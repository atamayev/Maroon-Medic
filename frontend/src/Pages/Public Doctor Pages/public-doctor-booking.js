import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import moment from 'moment';
import FormGroup from '../../Components/form-group';
import { useNavigate } from "react-router-dom";

const handleServiceChange = (event, providedServices, setSelectedService, setSelectedLocation, setSelectedDay, setSelectedTime) => {
  const value = event.target.value;
  const selectedServiceObject = providedServices.find(service => service.service_and_category_listID.toString() === value);
  setSelectedService(selectedServiceObject || null);
  if (value === 'Select...') {
    setSelectedLocation(null);
    setSelectedDay(null);
    setSelectedTime(null);
  }
};

const handleLocationChange = (event, addresses, setSelectedLocation, setSelectedDay, setSelectedTime) => {
  const value = event.target.value;
  const selectedLocationObject = addresses.find(location => location.addressesID.toString() === value);
  
  if (selectedLocationObject.times.length < 1) {
    setSelectedLocation(null);
    setSelectedDay("This doctor does not currently have any open appointments");
    setSelectedTime(null);
  } else {
    setSelectedLocation(selectedLocationObject || null);
    if (value === 'Select...') {
      setSelectedDay(null);
      setSelectedTime(null);
    }
  }
};

const handleDayChange = (event, setSelectedDay, setSelectedTime) => {
  const value = event.target.value;
  setSelectedDay(value === 'Select...' ? null : value);
  if (value === 'Select...') setSelectedTime(null);
};

const handleTimeChange = (event, setSelectedTime) => {
  const value = event.target.value;
  setSelectedTime(value === 'Select...' ? null : value);
};

function finalizeBookingClick(e, navigate, selectedService, selectedLocation, selectedDay, selectedTime, personalData) {
  e.preventDefault();
  const bookingDetails = {
      selectedService: selectedService ? selectedService : null,
      selectedLocation: selectedLocation ? selectedLocation : null,
      selectedDay,
      selectedTime,
      personalData: personalData
  };

  // Store the current state into sessionStorage
  sessionStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));

  // Navigate to the finalize-booking page with the state
  navigate('/finalize-booking', { state: bookingDetails });
};

export default function RenderBookingSection(props) {
  const [selectedService, setSelectedService] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);
  const navigate = useNavigate();
  const [availableDates, setAvailableDates] = useState([]);
  
  // Get selected service object
  const selectedServiceObject = props.providedServices.find(service => service.service_and_category_listID === selectedService?.service_and_category_listID);

  // Get selected location object
  const selectedLocationObject = props.addresses.find(location => location.addressesID === selectedLocation?.addressesID);

  useEffect(() => {
    if (selectedDay && selectedLocationObject && selectedServiceObject) {
      // Get the working hours for the selected day
      const selectedDayOfWeek = moment(selectedDay, 'dddd, MMMM Do, YYYY').format('dddd');
      const workingHours = selectedLocationObject?.times.find(time => time.Day_of_week === selectedDayOfWeek);
  
      if (workingHours) {
        let times = [];
        let start = workingHours.Start_time.split(':');
        let end = workingHours.End_time.split(':');
        
        let currentTime = moment().hour(start[0]).minute(start[1]);
        let endTime = moment().hour(end[0]).minute(end[1]);
        
        while (currentTime.isBefore(endTime)) {
          times.push(currentTime.format('h:mm A')); // Change 'HH:mm' to 'h:mm A'
          currentTime = currentTime.clone().add(Number(selectedServiceObject.Service_time), 'minutes');
        }
        setAvailableTimes(times);
      }
    }
  }, [selectedDay, selectedLocationObject, selectedServiceObject]);

  useEffect(() => {
    if (!selectedLocationObject) return;

    const daysOfWeek = selectedLocationObject?.times.map(time => {
      switch (time.Day_of_week) {
        case 'Sunday': return 0;
        case 'Monday': return 1;
        case 'Tuesday': return 2;
        case 'Wednesday': return 3;
        case 'Thursday': return 4;
        case 'Friday': return 5;
        case 'Saturday': return 6;
        default: return null;
      }
    });
    let dates = [];
    let date = moment();
    while (dates.length < 10) {
      if (daysOfWeek.includes(date.day())) dates.push(date.format('dddd, MMMM Do, YYYY'));
      date = date.clone().add(1, 'days');
    }
    setAvailableDates(dates);
  }, [selectedLocationObject]);

  const anyLocationHasTimes = props.addresses.some(location => location.times && location.times.length > 0);

  if (!anyLocationHasTimes) {
    return(
      <Card className='card-bottom-margin'>
        <Card.Header>Ready to make a booking?</Card.Header>
        <Card.Body>
        This doctor does not currently have any open time slots for appointments.
        </Card.Body>
      </Card>
    )
  }

  const renderAvailableDates = () => {
    if (selectedDay === "This doctor does not currently have any open appointments") {
      return <option disabled>{selectedDay}</option>
    }
    return (
      availableDates.map((date, index) => (
        <option key={index} value={date}>
          {date}
        </option>
      ))
    )
  }

  const renderInstantBook = () => {
    if (selectedLocation.instant_book) return <>Confirm</>
    return <>Request</>
  }

  const renderMakeBooking = () => {
    if (!(props.providedServices.length && props.addresses.length)) {
      return (
        <Card className='card-bottom-margin'>
        <Card.Header>Ready to make a booking?</Card.Header>
        <Card.Body>
          This doctor does not currently offer any services.
        </Card.Body>
      </Card>
      )
    }
    return(
      <Card className='card-bottom-margin'>
        <Card.Header>Ready to make a booking?</Card.Header>
        <Card.Body>
          <div className='row'>
            <div className="col-md-6">
              <FormGroup 
                as='select' 
                id='serviceSelect' 
                label='Select a service' 
                onChange={(e) => handleServiceChange(e, props.providedServices, setSelectedService, setSelectedLocation, setSelectedDay, setSelectedTime)}
              >
                <option>Select...</option>
                {props.providedServices.map((service) => (
                  <option key={service.service_and_category_listID} value={service.service_and_category_listID}>
                    {service.Category_name} - {service.Service_name}
                  </option>
                ))}
              </FormGroup>
            </div>
            <div className="col-md-6">
              {selectedService && (
                <FormGroup 
                  as='select' 
                  id='locationSelect' 
                  label='Select a location' 
                  onChange={(e)=> handleLocationChange(e, props.addresses, setSelectedLocation, setSelectedDay, setSelectedTime)}
                >
                  <option>Select...</option>
                  {props.addresses.map((address) => (
                    <option key={address.addressesID} value={address.addressesID}>
                      {address.address_title} ({address.address_line_1} {address.address_line_2}, {address.city}, {address.state}, {address.zip})
                    </option>
                  ))}
                </FormGroup>
              )}
            </div>
          </div>
          <div className='row'>
            <div className="col-md-6">
              {selectedService && selectedLocation && (
                <FormGroup 
                  as='select' 
                  id='daySelect' 
                  label='Select a date' 
                  onChange={(e)=> handleDayChange(e, setSelectedDay, setSelectedTime)}
                >
                  <option>Select...</option>
                  {renderAvailableDates()}
                </FormGroup>
              )}
            </div>
            <div className="col-md-6">
              {selectedService && selectedDay && selectedLocation && (
                <FormGroup 
                  as='select' 
                  id='timeSelect' 
                  label='Select a time' 
                  onChange={(e)=> handleTimeChange(e, setSelectedTime)}
                >
                  <option>Select...</option>
                  {availableTimes.map((time, index) => (
                    <option key={index} value={time}>
                      {time}
                    </option>
                  ))}
                </FormGroup>
              )}
            </div>
          </div>

          {selectedService && selectedLocation && selectedDay && selectedTime && (
            
            <Button 
              variant='primary' 
              onClick = {(e) => finalizeBookingClick(
                e,
                navigate, 
                selectedService, 
                selectedLocation,
                selectedDay,
                selectedTime,
                props.personalData
              )}
              className='mt-3'>
              Click to {renderInstantBook()} an appointment
            </Button>
          )}
        </Card.Body>
      </Card>
    )
  }

  return (
    <>
      {renderMakeBooking()}
    </>
  )
};
