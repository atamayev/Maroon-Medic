import React, { useState, useEffect } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import moment from 'moment';

export default function RenderBookingSection(props) {
  const [selectedService, setSelectedService] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);

  const handleServiceChange = (event) => {
    setSelectedService(event.target.value);
  };

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const handleDayChange = (event) => {
    setSelectedDay(event.target.value);
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  // Get selected service object
  const selectedServiceObject = props.providedServices.find(service => service.service_and_category_listID.toString() === selectedService);

  // Get selected location object
  const selectedLocationObject = props.addresses.find(location => location.addresses_ID.toString() === selectedLocation);

  useEffect(() => {
    if (selectedDay && selectedLocationObject && selectedServiceObject) {
      // Get the working hours for the selected day
      const workingHours = selectedLocationObject.times.find(time => time.Day_of_week === selectedDay);
      //console.log('workingHours',workingHours)
      console.log('selectedServiceObject',selectedServiceObject)

      if (workingHours) {
        let times = [];
        let start = workingHours.Start_time.split(':');
        let end = workingHours.End_time.split(':');
        
        let currentTime = moment().hour(start[0]).minute(start[1]);
        let endTime = moment().hour(end[0]).minute(end[1]);
        
        //console.log('currentTime',currentTime)
        while (currentTime.isBefore(endTime)) {
          times.push(currentTime.format('HH:mm'));
          currentTime = currentTime.clone().add(Number(selectedServiceObject.Service_time), 'minutes');
        }
        console.log(times)
        setAvailableTimes(times);
      }
    }
  }, [selectedDay, selectedLocationObject, selectedServiceObject]);


  return (
    <Card className='card-bottom-margin'>
      <Card.Header>Ready to make a booking?</Card.Header>
      <Card.Body>
        {props.providedServices.length ? (
          <Form>
            <Form.Group controlId='serviceSelect'>
              <Form.Label>Select a service</Form.Label>
              <Form.Control as='select' onChange={handleServiceChange}>
                <option>Select...</option>
                {props.providedServices.map((service) => (
                  <option key={service.service_and_category_listID} value={service.service_and_category_listID}>
                    {service.Category_name} - {service.Service_name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            {selectedService && (
              <Form.Group controlId='locationSelect'>
                <Form.Label>Select a location</Form.Label>
                <Form.Control as='select' onChange={handleLocationChange}>
                  <option>Select...</option>
                  {props.addresses.map((address) => address.address_public_status === 1 && (
                    <option key={address.addresses_ID} value={address.addresses_ID}>
                      {address.address_title}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            )}
            {selectedLocation && (
              <Form.Group controlId='daySelect'>
                <Form.Label>Select a day</Form.Label>
                <Form.Control as='select' onChange={handleDayChange}>
                  <option>Select...</option>
                  {selectedLocationObject.times.map((time, index) => (
                    <option key={index} value={time.Day_of_week}>
                      {time.Day_of_week}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            )}
            {selectedDay && (
              <Form.Group controlId='timeSelect'>
                <Form.Label>Select a time</Form.Label>
                <Form.Control as='select' onChange={handleTimeChange}>
                  <option>Select...</option>
                  {availableTimes.map((time, index) => (
                    <option key={index} value={time}>
                      {time}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            )}
            {selectedTime && (
              <Button variant='primary' href='/finalize'>
                Click to finalize booking
              </Button>
            )}
          </Form>
        ) : (
          'This doctor does not currently offer any services.'
        )}
      </Card.Body>
    </Card>
  );
}
