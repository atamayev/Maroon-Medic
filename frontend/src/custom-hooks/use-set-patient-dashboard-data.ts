import { useState, useEffect, useContext } from "react"
import { AppContext } from "src/contexts/maroon-context"
import PrivatePatientDataService from "src/services/private-patient-data-service"
import handle401AxiosError from "src/utils/handle-errors/handle-401-axios-error"

export default function useSetPatientDashboardData(): {
	dashboardData: PatientDashboardData[],
	setDashboardData: React.Dispatch<React.SetStateAction<PatientDashboardData[]>>}
{
	const appContext = useContext(AppContext)
	const [dashboardData, setDashboardData] = useState<PatientDashboardData[]>([])

	const fetchAndSetDashboardData: () => Promise<void> = async () => {
		try {
			const response = await PrivatePatientDataService.fillDashboard()
			setDashboardData(response.data)
			appContext.dashboardData = response.data
		} catch (error: unknown) {
			handle401AxiosError(error)
		}
	}

	useEffect(() => {
		fetchAndSetDashboardData()
	}, [])

	return { dashboardData, setDashboardData }
}
