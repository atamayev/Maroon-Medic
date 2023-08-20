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

const ifInsuranceSelected = (
  value: string,
  insurances: InsuranceItem[],
  newPetData: PetItemForCreation,
  setNewPetData: React.Dispatch<React.SetStateAction<PetItemForCreation>>
): void => {
  // Find the selected insurance by its ID
  const selectedInsurance = insurances.find(insurance => insurance.insurance_listID === JSON.parse(value))
  if (selectedInsurance) {
    const newPet = {
      ...newPetData,
      insuranceName: selectedInsurance.Insurance_name,
      insurance_listID: selectedInsurance.insurance_listID
    }

    setNewPetData(newPet)
  }
}

const handleInputChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  newPetData: PetItemForCreation,
  petTypes: ServicedPetItem[],
  insurances: InsuranceItem[],
  setNewPetData: React.Dispatch<React.SetStateAction<PetItemForCreation>>
): void => {
  const value = event.target.value

  if (event.target.name === "Pet_type") ifPetTypeSelected(value, petTypes, newPetData, setNewPetData)
  else if (event.target.name === "insurance") ifInsuranceSelected(value, insurances, newPetData, setNewPetData)
  else {
    const newPet = { ...newPetData, [event.target.name]: value }
    setNewPetData(newPet)
  }
}

export default handleInputChange
