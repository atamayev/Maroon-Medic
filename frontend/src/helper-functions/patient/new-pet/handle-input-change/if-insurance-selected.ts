const ifInsuranceSelected = (
	value: string,
	insurances: InsuranceItem[],
	newPetData: PetItemForCreation,
	setNewPetData: React.Dispatch<React.SetStateAction<PetItemForCreation>>
): void => {
	const selectedInsurance = insurances.find(insurance => insurance.Insurance_name === value)
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
