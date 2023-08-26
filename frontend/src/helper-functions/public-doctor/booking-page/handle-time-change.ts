const handleTimeChange = (
	event: React.ChangeEvent<HTMLInputElement>,
	setAppointmentInformation: React.Dispatch<React.SetStateAction<AppointmentInformation>>,
): void => {
	const value = event.target.value
	setAppointmentInformation(prev => ({
		...prev,
		selectedTime: value === "Select..." ? null : value
	}))
}

export default handleTimeChange
