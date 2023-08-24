import { useState, useEffect } from "react"
import fetchDoctorDashboardData from "src/helper-functions/private-doctor/fetch-doctor-dashboard-data"

export default function useSetDoctorDashboardData(): {
  dashboardData: DoctorDashboardData[],
  setDashboardData: React.Dispatch<React.SetStateAction<DoctorDashboardData[]>>}
{
	const [dashboardData, setDashboardData] = useState<DoctorDashboardData[]>([])

	const fetchAndSetDashboardData: () => Promise<void> = async () => {
		await fetchDoctorDashboardData(setDashboardData)
	}

	useEffect(() => {
		fetchAndSetDashboardData()
	}, [])

	return {dashboardData, setDashboardData}
}
