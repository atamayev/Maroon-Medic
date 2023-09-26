
import _ from "lodash"
import { useCallback, useContext } from "react"
import AppContext from "src/contexts/maroon-context"
import PrivatePatientDataService from "src/services/private-patient-data-service"
import handle401AxiosError from "src/utils/handle-errors/handle-401-axios-error"

export default function useFetchPetData(): () => Promise<void> {
	const patientData = useContext(AppContext).patientData

	const fetchPetData = useCallback(async () => {
		if (_.isNull(patientData)) return
		try {
			const response = await PrivatePatientDataService.fetchPetData()
			patientData.patientPetData = response.data
		} catch (error: unknown) {
			handle401AxiosError(error)
		}
	}, [])

	return fetchPetData
}
