const ifPetTypeSelected = (
	value: string,
	petTypes: ServicedPetItem[],
	newPetData: PetItemForCreation,
	setNewPetData: React.Dispatch<React.SetStateAction<PetItemForCreation>>
): void => {
	const selectedPetType = petTypes.find(PetType => PetType.pet === value)
	if (selectedPetType) {
		const newPet = {
			...newPetData,
			pet: selectedPetType.pet,
			petType: selectedPetType.petType,
			pet_listID: selectedPetType.pet_listID
		}

		setNewPetData(newPet)
	}
}

export default ifPetTypeSelected
