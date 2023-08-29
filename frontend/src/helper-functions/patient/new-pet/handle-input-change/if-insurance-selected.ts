const ifInsuranceSelected = (
	value: string,
	insurances: InsuranceItem[],
	newPetData: PetItemForCreation,
	setNewPetData: React.Dispatch<React.SetStateAction<PetItemForCreation>>
): void => {
	const selectedInsurance = insurances.find(insurance => insurance.insuranceName === value)
	if (selectedInsurance) {
		const newPet = {
			...newPetData,
			insuranceName: selectedInsurance.insuranceName,
			insuranceListId: selectedInsurance.insuranceListId
		}

		setNewPetData(newPet)
	}
}

export default ifInsuranceSelected
