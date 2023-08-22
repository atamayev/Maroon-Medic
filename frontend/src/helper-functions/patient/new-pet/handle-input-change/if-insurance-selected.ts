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

export default ifInsuranceSelected
