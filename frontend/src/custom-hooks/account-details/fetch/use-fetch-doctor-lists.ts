import { useContext } from "react"
import { AppContext } from "src/contexts/maroon-context"
import ListsDataService from "src/services/lists-data-service"
import handle401AxiosError from "src/utils/handle-errors/handle-401-axios-error"

export default async function useFetchDoctorLists(setListDetails: React.Dispatch<React.SetStateAction<DoctorListDetails>>): Promise<void> {
	const { initializeDoctorLists } = useContext(AppContext)
	try {
		const response = await ListsDataService.fillDoctorLists()
		setListDetails(response.data)
		initializeDoctorLists(response.data)
	} catch (error: unknown) {
		handle401AxiosError(error)
	}
}
