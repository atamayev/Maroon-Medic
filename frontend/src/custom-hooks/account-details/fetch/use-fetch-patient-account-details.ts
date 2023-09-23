import { useCallback, useContext } from "react"
import { AppContext } from "src/contexts/maroon-context"
import PrivatePatientDataService from "src/services/private-patient-data-service"
import handle401AxiosError from "src/utils/handle-errors/handle-401-axios-error"

export default function useFetchPatientAccountDetails(): () => Promise<void> {
	const appContext = useContext(AppContext)

	const fetchPatientAccountDetails = useCallback(async () => {
		try {
			const response = await PrivatePatientDataService.fillAccountDetails()
			appContext.initializePatientAccountDetails(response.data)
		} catch (error: unknown) {
			handle401AxiosError(error)
		}
	}, [appContext.userType])

	return fetchPatientAccountDetails
}
