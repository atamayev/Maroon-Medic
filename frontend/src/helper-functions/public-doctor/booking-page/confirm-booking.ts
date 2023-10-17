import _ from "lodash"
import CalendarDataService from "../../../services/calendar-data-service"

export default async function confirmBooking (
	appointmentInformation: AppointmentInformation,
	serviceMinutes: number,
	personalData: DoctorPersonalData,
	message: string,
	setShowModal: (value: boolean) => void
): Promise<void> {

	if (
		_.isNil(appointmentInformation) ||
		_.isNil(appointmentInformation.selectedService) ||
		_.isNil(appointmentInformation.selectedDay) ||
		_.isNil(appointmentInformation.selectedTime) ||
		_.isNil(appointmentInformation.selectedLocation) ||
		_.isNil(appointmentInformation.selectedPet)
	) return

	const appointmentObject: AppointmentObject = {
		serviceAndCategoryListId: appointmentInformation.selectedService.serviceAndCategoryListId,
		appointmentDate: appointmentInformation.selectedDay,
		appointmentTime: appointmentInformation.selectedTime,
		appointmentTimespan: serviceMinutes,
		appointmentPrice: appointmentInformation.selectedService.servicePrice,
		nvi: personalData.nvi,
		addressesId: appointmentInformation.selectedLocation.addressesId,
		instantBook: appointmentInformation.selectedLocation.instantBook,
		message: message,
		selectedPetId: appointmentInformation.selectedPet.petInfoId
	}

	try {
		const response = await CalendarDataService.makeAppointment(appointmentObject)
		if (response.status === 200) setShowModal(true)
	} catch (error) {
		// if (error.response.status === 401) invalidUserAction(error.response.data)
	}
}
