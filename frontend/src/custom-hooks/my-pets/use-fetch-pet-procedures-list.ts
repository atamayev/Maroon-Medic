import _ from "lodash"
import { useCallback, useContext } from "react"
import AppContext from "src/contexts/maroon-context"
import ListsDataService from "src/services/lists-data-service"
import handle401AxiosError from "src/utils/handle-errors/handle-401-axios-error"

export default function useFetchPetProceduresList(): () => Promise<void> {
	const patientData = useContext(AppContext).patientData

	const fetchPetProceduresList = useCallback(async () => {
		if (_.isNull(patientData)) return

		try {
			const response = await ListsDataService.fillPetProcedures()
			patientData.petProcedures = response.data
		} catch (error: unknown) {
			handle401AxiosError(error)
		}
	}, [])

	return fetchPetProceduresList
}
