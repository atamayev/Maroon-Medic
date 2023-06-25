import _ from "lodash"

export const handleServiceChange = (event, providedServices, setSelectedService, setSelectedLocation, setSelectedDay, setSelectedTime) => {
  const value = event.target.value;
  const selectedServiceObject = providedServices.find(service => service.service_and_category_listID.toString() === value);
  setSelectedService(selectedServiceObject || null);
  if (value === 'Select...') {
    setSelectedLocation(null);
    setSelectedDay(null);
    setSelectedTime(null);
  }
};
  
export const handleLocationChange = (event, addresses, setSelectedLocation, setSelectedDay, setSelectedTime) => {
  const value = event.target.value;
  const selectedLocationObject = addresses.find(location => location.addressesID.toString() === value);
  
  if (_.isEmpty(selectedLocationObject.times)) {
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
  
export const handleDayChange = (event, setSelectedDay, setSelectedTime) => {
  const value = event.target.value;
  setSelectedDay(value === 'Select...' ? null : value);
  if (value === 'Select...') setSelectedTime(null);
};
  
export const handleTimeChange = (event, setSelectedTime) => {
  const value = event.target.value;
  setSelectedTime(value === 'Select...' ? null : value);
};
  
export function finalizeBookingClick(navigate, selectedService, selectedLocation, selectedDay, selectedTime, personalData) {
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
