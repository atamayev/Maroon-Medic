import ifInsuranceSelected from "./if-insurance-selected"
import ifPetTypeSelected from "./if-pet-type-selected"

const handleInputChange = (
	event: React.ChangeEvent<HTMLInputElement>,
	newPetData: PetItemForCreation,
	petTypes: ServicedPetItem[],
	insurances: InsuranceItem[],
	setNewPetData: React.Dispatch<React.SetStateAction<PetItemForCreation>>
): void => {
	const value = event.target.value

	if (event.target.name === "Pet_type") {
		ifPetTypeSelected(value, petTypes, newPetData, setNewPetData)
	} else if (event.target.name === "insurance") {
		ifInsuranceSelected(value, insurances, newPetData, setNewPetData)
	} else {
		const newPet = { ...newPetData, [event.target.name]: value }
		setNewPetData(newPet)
	}
}

export default handleInputChange
