import PrivatePatientDataService from "src/services/private-patient-data-service"
import handle401AxiosError from "src/utils/handle-errors/handle-401-axios-error"

export default async function fetchPetData(
	setSavedPetData: React.Dispatch<React.SetStateAction<SavedPetItem[]>>
): Promise<void> {
	try {
		const response = await PrivatePatientDataService.fetchPetData()
		setSavedPetData(response.data)
		sessionStorage.setItem("PatientPetData", JSON.stringify(response.data))
	} catch (error: unknown) {
		handle401AxiosError(error)
	}
}
