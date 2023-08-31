const ifPetTypeSelected = (
	value: string,
	petTypes: ServicedPetItem[],
	newPetData: PetItemForCreation,
	setNewPetData: React.Dispatch<React.SetStateAction<PetItemForCreation>>
): void => {
	const selectedPetType = petTypes.find(petType => petType.pet === value)
	if (selectedPetType) {
		const newPet = {
			...newPetData,
			pet: selectedPetType.pet,
			petType: selectedPetType.petType,
			petListId: selectedPetType.petListId
		}

		setNewPetData(newPet)
	}
}

export default ifPetTypeSelected
