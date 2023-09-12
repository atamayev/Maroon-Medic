import { useContext, useCallback } from "react"
import { AppContext } from "src/contexts/maroon-context"
import ListsDataService from "src/services/lists-data-service"
import handle401AxiosError from "src/utils/handle-errors/handle-401-axios-error"

export default function useFetchDoctorLists(): () => Promise<void> {
	const appContext = useContext(AppContext)

	const fetchDoctorLists = useCallback(async () => {
		try {
			const response = await ListsDataService.fillDoctorLists()
			appContext.initializeDoctorLists(response.data)
		} catch (error: unknown) {
			handle401AxiosError(error)
		}
	}, [])

	return fetchDoctorLists
}
