const handleServiceChange = (
	event: React.ChangeEvent<HTMLInputElement>,
	providedServices: ServiceItemNotNullablePrice[],
	setAppointmentInformation: React.Dispatch<React.SetStateAction<AppointmentInformation>>,
): void => {
	const value = event.target.value
	const selectedServiceObject = providedServices.find(service => service.service_and_category_listID.toString() === value)
	setAppointmentInformation(prev => ({
		...prev,
		selectedService: selectedServiceObject || null,
	}))
	if (value === "Select...") {
		setAppointmentInformation(prev => ({
			...prev,
			selectedLocation: null,
			selectedDay: null,
			selectedTime: null,
		}))
	}
}

export default handleServiceChange
