import _ from "lodash"
import { useEffect, useContext } from "react"
import AppContext from "src/contexts/maroon-context"
import PrivatePatientDataService from "src/services/private-patient-data-service"
import handle401AxiosError from "src/utils/handle-errors/handle-401-axios-error"

export default function useSetPatientDashboardData(): void {
	const appContext = useContext(AppContext)

	const fetchAndSetDashboardData: () => Promise<void> = async () => {
		if (_.isNull(appContext.patientData)) return
		try {
			const response = await PrivatePatientDataService.fillDashboard()
			appContext.patientData.initializePatientDashboardData(response.data)
		} catch (error: unknown) {
			handle401AxiosError(error)
		}
	}

	useEffect(() => {
		if (appContext.auth.userType !== "Patient") return
		fetchAndSetDashboardData()
	}, [])
}
