import { useNavigate } from "react-router-dom"
import CalendarDataService from "../../services/calendar-data-service"

interface ConfirmBookingProps {
	appointmentInformation: AppointmentInformation
	serviceMinutes: number
	personalData: DoctorPersonalData
	message: string
}

export default function useConfirmBooking(): (props: ConfirmBookingProps) => Promise<void> {
	const navigate = useNavigate()
	return async ({appointmentInformation, serviceMinutes, personalData, message}: ConfirmBookingProps): Promise<void> => {
		const appointmentObject = {
			serviceAndCategoryListId: appointmentInformation.selectedService!.serviceAndCategoryListId,
			appointmentDate: appointmentInformation.selectedDay!,
			appointmentTime: appointmentInformation.selectedTime!,
			appointmentTimespan: serviceMinutes,
			appointmentPrice: appointmentInformation.selectedService!.servicePrice,
			nvi: personalData.nvi,
			addressesId: appointmentInformation.selectedLocation!.addressesId,
			instantBook: appointmentInformation.selectedLocation!.instantBook,
			message: message,
			selectedPetId: appointmentInformation.selectedPet!.petInfoId
		}

		try {
			const response = await CalendarDataService.makeAppointment(appointmentObject)
			if (response.status === 200) {
				sessionStorage.removeItem("bookingDetails")
				// Ensures that the user is not able to navigate back to finalize booking right after making an appointment:
				navigate("/dashboard", { state: { finalized: true } })
			}
		} catch (error) {
			// if (error.response.status === 401) invalidUserAction(error.response.data)
		}
	}
}
