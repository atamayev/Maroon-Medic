import { useContext } from "react"
import { AppContext } from "src/contexts/maroon-context"
import PrivatePatientDataService from "src/services/private-patient-data-service"
import handle401AxiosError from "src/utils/handle-errors/handle-401-axios-error"

export default async function useFetchPatientAccountDetails(
	setSpokenLanguages: React.Dispatch<React.SetStateAction<LanguageItem[]>>
): Promise<void> {
	const { initializePatientAccountDetails } = useContext(AppContext)
	try {
		const response = await PrivatePatientDataService.fillAccountDetails()
		if (response.data.languages) setSpokenLanguages(response.data.languages)
		initializePatientAccountDetails(response.data)
	} catch (error: unknown) {
		handle401AxiosError(error)
	}
}
