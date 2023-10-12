const handlePetInfoInput = (
	event: React.ChangeEvent<HTMLInputElement>,
	newPetData: PetItemForCreation,
	setNewPetData: React.Dispatch<React.SetStateAction<PetItemForCreation>>,
): void => {
	const value = event.target.value
	const newPet = { ...newPetData, [event.target.name]: value }
	setNewPetData(newPet)
}

export default handlePetInfoInput
