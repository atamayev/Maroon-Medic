import CalendarDataService from "../../services/calendar-data-service";

export async function confirmBooking(navigate, selectedService, selectedLocation, selectedDay, selectedTime, personalData, message) {
  let AppointmentObject = {
    Service_and_category_list_ID: selectedService.service_and_category_listID,
    appointmentDate: selectedDay,
    appointmentTime: selectedTime,
    appointmentPrice: selectedService.Service_price,
    NVI: personalData.NVI,
    AddressesID: selectedLocation.addressesID,
    InstantBook: selectedLocation.instant_book,
    message: message
  };

  try {
    const response = await CalendarDataService.makeAppointment(AppointmentObject);
    if (response.status === 200) {
      sessionStorage.removeItem("bookingDetails");
      // Ensures that the user is not able to navigate back to finalize booking right after making an appointment:
      navigate("/patient-dashboard", { state: { finalized: true } });
    }
  } catch(error) {
    // if (error.response.status === 401) invalidUserAction(error.response.data)
  }
};
