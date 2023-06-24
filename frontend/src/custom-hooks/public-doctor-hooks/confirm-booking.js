import CalendarDataService from "../../services/calendar-data-service";
import { invalidUserAction } from "../user-verification-snippets";

export async function confirmBooking(navigate, selectedService, selectedLocation, selectedDay, selectedTime, personalData) {
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
