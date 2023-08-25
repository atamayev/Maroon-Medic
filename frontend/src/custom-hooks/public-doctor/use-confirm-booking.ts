import { useNavigate } from "react-router-dom"
import CalendarDataService from "../../services/calendar-data-service"

export default async function useConfirmBooking(
	selectedService: ServiceItemNotNullablePrice,
	selectedLocation: PublicAddressData,
	selectedDay: string,
	selectedTime: string,
	serviceMinutes: number,
	personalData: DoctorPersonalData,
	selectedPet: SavedPetItem,
	message: string
): Promise<void> {
	const navigate = useNavigate()
	const AppointmentObject = {
		Service_and_category_list_ID: selectedService.service_and_category_listID,
		appointmentDate: selectedDay,
		appointmentTime: selectedTime,
		appointmentTimespan: serviceMinutes,
		appointmentPrice: selectedService.Service_price,
		NVI: personalData.NVI,
		AddressesID: selectedLocation.addressesID,
		InstantBook: selectedLocation.instant_book,
		message: message,
		selectedPetID: selectedPet.pet_infoID
	}

	try {
		const response = await CalendarDataService.makeAppointment(AppointmentObject)
		if (response.status === 200) {
			sessionStorage.removeItem("bookingDetails")
			// Ensures that the user is not able to navigate back to finalize booking right after making an appointment:
			navigate("/dashboard", { state: { finalized: true } })
		}
	} catch (error) {
		// if (error.response.status === 401) invalidUserAction(error.response.data)
	}
}
