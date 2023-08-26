const handlePetChange = (
	event: React.ChangeEvent<HTMLInputElement>,
	savedPetData: SavedPetItem[],
	setAppointmentInformation: React.Dispatch<React.SetStateAction<AppointmentInformation>>,
): void => {
	const value = event.target.value
	const selectedPetObject = savedPetData.find(pet => pet.pet_infoID.toString() === value)
	setAppointmentInformation(prev => ({
		...prev,
		selectedPet: selectedPetObject || null,
	}))
	if (value === "Select...") {
		setAppointmentInformation(prev => ({
			...prev,
			selectedService: null,
			selectedLocation: null,
			selectedDay: null,
			selectedTime: null,
		}))
	}
}

export default handlePetChange
