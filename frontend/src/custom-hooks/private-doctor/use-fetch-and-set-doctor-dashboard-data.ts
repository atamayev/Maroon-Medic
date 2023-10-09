import _ from "lodash"
import { useEffect, useContext } from "react"
import AppContext from "src/contexts/maroon-context"
import PrivateDoctorDataService from "src/services/private-doctor-data-service"
import handle401AxiosError from "src/utils/handle-errors/handle-401-axios-error"

export default function useFetchAndSetDoctorDashboardData(): void {
	const appContext = useContext(AppContext)

	const fetchAndSetDashboardData: () => Promise<void> = async () => {
		if (_.isNull(appContext.privateDoctorData)) return
		try {
			const response = await PrivateDoctorDataService.fillDashboard()
			appContext.privateDoctorData.initializeDoctorDashboardData(response.data)
		} catch (error: unknown) {
			handle401AxiosError(error)
		}
	}

	useEffect(() => {
		if (appContext.auth.userType !== "Doctor") return
		fetchAndSetDashboardData()
	}, [])
}
