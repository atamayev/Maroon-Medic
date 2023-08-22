import { useState, useEffect } from "react"
import fetchPatientDashboardData from "src/helper-functions/patient/fetch-patient-dashboard-data"

export default function useSetPatientDashboardData(): {
  dashboardData: PatientDashboardData[],
  setDashboardData: React.Dispatch<React.SetStateAction<PatientDashboardData[]>>}
{
  const [dashboardData, setDashboardData] = useState<PatientDashboardData[]>([])

  const fetchAndSetDashboardData: () => Promise<void> = async () => {
    await fetchPatientDashboardData(setDashboardData)
  }

  useEffect(() => {
    fetchAndSetDashboardData()
  }, [])

  return {dashboardData, setDashboardData}
}
