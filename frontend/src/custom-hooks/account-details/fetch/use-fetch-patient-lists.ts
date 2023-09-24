import _ from "lodash"
import { useContext, useCallback } from "react"
import AppContext from "src/contexts/maroon-context"
import ListsDataService from "src/services/lists-data-service"
import handle401AxiosError from "src/utils/handle-errors/handle-401-axios-error"

export default function useFetchPatientLists(): () => Promise<void> {
	const { patientData } = useContext(AppContext)

	const fetchPatientLists = useCallback (async () => {
		try {
			if (_.isNull(patientData)) return
			const response = await ListsDataService.fillPatientLists()
			patientData.initializePatientLists(response.data)
		} catch (error: unknown) {
			handle401AxiosError(error)
		}
	}, [])

	return fetchPatientLists
}
