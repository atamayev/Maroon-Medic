import _ from "lodash"

const handlePetChange = (
	event: React.ChangeEvent<HTMLInputElement>,
	savedPetData: SavedPetItem[],
	setAppointmentInformation: React.Dispatch<React.SetStateAction<AppointmentInformation>>,
): void => {
	const value = event.target.value
	const selectedPetObject = savedPetData.find(pet => _.toString(pet.petInfoId) === value)
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
