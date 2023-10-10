export default function ConfirmOrRequestBook (appointmentInformation: AppointmentInformation) {
	const booleanInstantBook = Boolean(appointmentInformation.selectedLocation?.instantBook)
	if (booleanInstantBook === true) return "Confirm"
	return "Request"
}
