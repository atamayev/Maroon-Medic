export default function ConfirmOrRequestBook (appointmentInformation: AppointmentInformation) {
	if (appointmentInformation.selectedLocation?.instantBook === true) return "Confirm"
	return "Request"
}
