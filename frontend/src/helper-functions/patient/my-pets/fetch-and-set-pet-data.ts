import fetchPetTypesList from "./fetch-pet-types-list"
import fetchPetData from "./fetch-pet-data"
import fetchInsurancesList from "./fetch-insurances-list"

export const fetchAndSetPetData = async (
	setSavedPetData: React.Dispatch<React.SetStateAction<SavedPetItem[]>>,
	setPetTypes: React.Dispatch<React.SetStateAction<ServicedPetItem[]>>,
	setInsurances: React.Dispatch<React.SetStateAction<InsuranceItem[]>>
): Promise<void> => {
	try {
		const storedPetData = sessionStorage.getItem("PatientPetData")
		if (storedPetData) setSavedPetData(JSON.parse(storedPetData))
		else await fetchPetData(setSavedPetData)

		const storedPetTypes = sessionStorage.getItem("PetTypes")
		if (storedPetTypes) setPetTypes(JSON.parse(storedPetTypes))
		else await fetchPetTypesList(setPetTypes)

		const storedInsurances = sessionStorage.getItem("Insurances")
		if (storedInsurances) setInsurances(JSON.parse(storedInsurances))
		else await fetchInsurancesList(setInsurances)
	} catch (error) {
	}
}

export default fetchAndSetPetData
