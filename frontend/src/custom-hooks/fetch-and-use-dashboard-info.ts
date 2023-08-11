import { useState, useEffect } from "react"
import { handle401AxiosError } from "src/utils/handle-errors"
import PrivateDoctorDataService from "../services/private-doctor-data-service"
import PrivatePatientDataService from "../services/private-patient-data-service"

export function useDoctorDashboardData(): {
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

async function fetchDoctorDashboardData(
  setDashboardData: React.Dispatch<React.SetStateAction<DoctorDashboardData[]>>
): Promise<void> {
  try {
    const response = await PrivateDoctorDataService.fillDashboard()
    setDashboardData(response.data)
    sessionStorage.setItem("DoctorDashboardData", JSON.stringify(response.data))
  } catch (error: unknown) {
    handle401AxiosError(error)
  }
}

export function usePatientDashboardData(): {
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

async function fetchPatientDashboardData(
  setDashboardData: React.Dispatch<React.SetStateAction<PatientDashboardData[]>>
): Promise<void> {
  try {
    const response = await PrivatePatientDataService.fillDashboard()
    setDashboardData(response.data)
    sessionStorage.setItem("PatientDashboardData", JSON.stringify(response.data))
  } catch (error: unknown) {
    handle401AxiosError(error)
  }
}
