
import { useCallback, useContext } from "react"
import AppContext from "src/contexts/maroon-context"
import PrivatePatientDataService from "src/services/private-patient-data-service"
import handle401AxiosError from "src/utils/handle-errors/handle-401-axios-error"

export default function useFetchPetData(): () => Promise<void> {
	const appContext = useContext(AppContext)

	const fetchPetData = useCallback(async () => {
		try {
			const response = await PrivatePatientDataService.fetchPetData()
			appContext.patientPetData = response.data
		} catch (error: unknown) {
			handle401AxiosError(error)
		}
	}, [])

	return fetchPetData
}
