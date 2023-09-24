import _ from "lodash"
import { useCallback, useContext } from "react"
import AppContext from "src/contexts/maroon-context"
import PrivatePatientDataService from "src/services/private-patient-data-service"
import handle401AxiosError from "src/utils/handle-errors/handle-401-axios-error"

export default function useFetchPatientAccountDetails(): () => Promise<void> {
	const appContext = useContext(AppContext)

	const fetchPatientAccountDetails = useCallback(async () => {
		try {
			if (_.isNull(appContext.patientData)) return
			const response = await PrivatePatientDataService.fillAccountDetails()
			appContext.patientData.initializePatientAccountDetails(response.data)
		} catch (error: unknown) {
			handle401AxiosError(error)
		}
	}, [appContext.auth.userType])

	return fetchPatientAccountDetails
}
