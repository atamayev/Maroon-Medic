import { useContext, useCallback } from "react"
import { AppContext } from "src/contexts/maroon-context"
import PrivateDoctorDataService from "src/services/private-doctor-data-service"
import handle401AxiosError from "src/utils/handle-errors/handle-401-axios-error"

export default function useFetchDoctorAccountDetails(): () => Promise<void> {
	const { initializeDoctorAccountDetails } = useContext(AppContext)

	const fetchDoctorAccountDetails = useCallback(async () => {
		try {
			const response = await PrivateDoctorDataService.fillAccountDetails()
			initializeDoctorAccountDetails(response.data)
		} catch (error: unknown) {
			handle401AxiosError(error)
		}
	}, [])

	return fetchDoctorAccountDetails
}
