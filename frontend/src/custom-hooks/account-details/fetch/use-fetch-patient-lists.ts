import { useCallback, useContext } from "react"
import { AppContext } from "src/contexts/maroon-context"
import ListsDataService from "src/services/lists-data-service"
import handle401AxiosError from "src/utils/handle-errors/handle-401-axios-error"

export default function useFetchPatientLists(): () => Promise<void> {
	const appContext = useContext(AppContext)

	const fetchPatientLists = useCallback (async () => {
		try {
			const response = await ListsDataService.fillPatientLists()
			appContext.initializePatientLists(response.data)
		} catch (error: unknown) {
			handle401AxiosError(error)
		}
	}, [])

	return fetchPatientLists
}
