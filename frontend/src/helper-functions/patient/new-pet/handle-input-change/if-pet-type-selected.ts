const ifPetTypeSelected = (
  value: string,
  petTypes: ServicedPetItem[],
  newPetData: PetItemForCreation,
  setNewPetData: React.Dispatch<React.SetStateAction<PetItemForCreation>>
): void => {
  // Find the selected pet type by its ID
  const selectedPetType = petTypes.find(PetType => PetType.pet_listID === JSON.parse(value))
  if (selectedPetType) {
    const newPet = {
      ...newPetData,
      Pet: selectedPetType.Pet,
      Pet_type: selectedPetType.Pet_type,
      pet_listID: selectedPetType.pet_listID
    }

    setNewPetData(newPet)
  }
}

export default ifPetTypeSelected
