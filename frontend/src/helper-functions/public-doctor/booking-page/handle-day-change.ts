const handleDayChange = (
	event: React.ChangeEvent<HTMLInputElement>,
	setAppointmentInformation: React.Dispatch<React.SetStateAction<AppointmentInformation>>,
): void => {
	const value = event.target.value

	if (value === "Select...") {
		setAppointmentInformation(prev => ({
			...prev,
			selectedTime: null,
			selectedDay: null
		}))
	} else {
		setAppointmentInformation(prev => ({
			...prev,
			selectedDay: value
		}))
	}
}

export default handleDayChange
