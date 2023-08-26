const ifPetTypeSelected = (
	value: string,
	petTypes: ServicedPetItem[],
	newPetData: PetItemForCreation,
	setNewPetData: React.Dispatch<React.SetStateAction<PetItemForCreation>>
): void => {
	const selectedPetType = petTypes.find(PetType => PetType.Pet === value)
	if (selectedPetType) {
		const newPet = {
			...newPetData,
			Pet: selectedPetType.Pet,
			Pet_type: selectedPetType.Pet_type,
			pet_listID: selectedPetType.pet_listID
		}
		console.log(newPet)

		setNewPetData(newPet)
	}
}

export default ifPetTypeSelected
