import { useState, useEffect, useContext } from "react"
import { AppContext } from "src/contexts/maroon-context"
import PrivateDoctorDataService from "src/services/private-doctor-data-service"
import handle401AxiosError from "src/utils/handle-errors/handle-401-axios-error"

export default function useSetDoctorDashboardData(): {
	dashboardData: DoctorDashboardData[],
	setDashboardData: React.Dispatch<React.SetStateAction<DoctorDashboardData[]>>}
{
	const { initializeDashboardData } = useContext(AppContext)
	const [dashboardData, setDashboardData] = useState<DoctorDashboardData[]>([])

	const fetchAndSetDashboardData: () => Promise<void> = async () => {
		try {
			const response = await PrivateDoctorDataService.fillDashboard()
			setDashboardData(response.data)
			initializeDashboardData(response.data)
		} catch (error: unknown) {
			handle401AxiosError(error)
		}
	}

	useEffect(() => {
		fetchAndSetDashboardData()
	}, [])

	return { dashboardData, setDashboardData }
}
