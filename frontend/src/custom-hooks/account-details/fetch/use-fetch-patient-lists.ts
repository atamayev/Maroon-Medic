import { useContext } from "react"
import { AppContext } from "src/contexts/maroon-context"
import ListsDataService from "src/services/lists-data-service"
import handle401AxiosError from "src/utils/handle-errors/handle-401-axios-error"

export default async function useFetchPatientLists(
	setListDetails: React.Dispatch<React.SetStateAction<PatientListDetails>>
): Promise<void> {
	const appContext = useContext(AppContext)
	try {
		const response = await ListsDataService.fillPatientLists()
		setListDetails(response.data)
		appContext.initializePatientLists(response.data)
	} catch (error: unknown) {
		handle401AxiosError(error)
	}
}
