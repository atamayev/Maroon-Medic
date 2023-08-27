import ifInsuranceSelected from "./if-insurance-selected"
import ifPetTypeSelected from "./if-pet-type-selected"

const handlePetInfoInput = (
	event: React.ChangeEvent<HTMLInputElement>,
	newPetData: PetItemForCreation,
	setNewPetData: React.Dispatch<React.SetStateAction<PetItemForCreation>>,
	specialData?:  ServicedPetItem[] | InsuranceItem[]
): void => {
	const value = event.target.value

	if (event.target.name === "petType") {
		ifPetTypeSelected(value, specialData as ServicedPetItem[], newPetData, setNewPetData)
	} else if (event.target.name === "insurance") {
		ifInsuranceSelected(value, specialData as InsuranceItem[], newPetData, setNewPetData)
	} else {
		const newPet = { ...newPetData, [event.target.name]: value }
		setNewPetData(newPet)
	}
}

export default handlePetInfoInput
