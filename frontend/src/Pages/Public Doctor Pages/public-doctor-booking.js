import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import moment from 'moment';
import FormGroup from '../../Components/form-group';
import { useNavigate } from "react-router-dom";

const handleServiceChange = (event, providedServices, setSelectedService, setSelectedLocation, setSelectedDay, setSelectedTime) => {
  const value = event.target.value;
  const selectedServiceObject = providedServices.find(service => service.service_and_category_listID.toString() === value);
  setSelectedService(selectedServiceObject);
  if (value === 'Select...') {
    setSelectedLocation(null);
    setSelectedDay(null);
    setSelectedTime(null);
  }
};

const handleLocationChange = (event, addresses, setSelectedLocation, setSelectedDay, setSelectedTime) => {
  const value = event.target.value;
  const selectedLocationObject = addresses.find(location => location.addresses_ID.toString() === value);
  setSelectedLocation(selectedLocationObject);
  if (value === 'Select...') {
    setSelectedDay(null);
    setSelectedTime(null);
  }
};

const handleDayChange = (event, setSelectedDay, setSelectedTime) => {
  const value = event.target.value;
  setSelectedDay(value === 'Select...' ? null : value);
  if (value === 'Select...') {
    setSelectedTime(null);
  }
};

const handleTimeChange = (event, setSelectedTime) => {
  const value = event.target.value;
  setSelectedTime(value === 'Select...' ? null : value);
};

export default function RenderBookingSection(props) {
  const [selectedService, setSelectedService] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);
  const navigate = useNavigate();

  // Get selected service object
  const selectedServiceObject = props.providedServices.find(service => service.service_and_category_listID.toString() === selectedService);

  // Get selected location object
  const selectedLocationObject = props.addresses.find(location => location.addresses_ID.toString() === selectedLocation);

  useEffect(() => {
    if (selectedDay && selectedLocationObject && selectedServiceObject) {
      // Get the working hours for the selected day
      const workingHours = selectedLocationObject?.times.find(time => time.Day_of_week === selectedDay);

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
        setAvailableTimes(times);
      }
    }
  }, [selectedDay, selectedLocationObject, selectedServiceObject]);

  return (
    props.providedServices.length && props.addresses.length ? (
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
                    <option key={address.addresses_ID} value={address.addresses_ID}>
                      {address.address_title}
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
                  label='Select a day' 
                  onChange={(e)=> handleDayChange(e, setSelectedDay, setSelectedTime)}
                >
                  <option>Select...</option>
                  {selectedLocationObject?.times.map((time, index) => (
                    <option key={index} value={time.Day_of_week}>
                      {time.Day_of_week}
                    </option>
                  ))}
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
          {console.log(selectedService)}
          {console.log(selectedLocation)}
          {console.log(selectedDay)}
          {console.log(selectedTime)}

          {selectedService && selectedLocation && selectedDay && selectedTime && (
            <Button variant='primary' 
              onClick={() => navigate('/finalize-booking', 
                { state: { 
                    selectedService: selectedService ? selectedService.Service_name : null, 
                    selectedLocation: selectedLocation ? selectedLocation.address_title : null, 
                    selectedDay, selectedTime, personalData: props.personalData }})} 
              className='mt-3'>
              Click to finalize booking
            </Button>
          )}
        </Card.Body>
      </Card>
    ) : (
      'This doctor does not currently offer any services.'
    )
  ); 
};
