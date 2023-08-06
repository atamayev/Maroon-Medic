import { useState, useEffect } from "react"
import { handle401AxiosError } from "src/utils/handle-errors"
import PrivateDoctorDataService from "../services/private-doctor-data-service"
import PrivatePatientDataService from "../services/private-patient-data-service"

export function useDoctorDashboardData(): {
  dashboardData: DoctorDashboardDataType[],
  setDashboardData: React.Dispatch<React.SetStateAction<DoctorDashboardDataType[]>>}
{
  const [dashboardData, setDashboardData] = useState<DoctorDashboardDataType[]>([])

  const fetchAndSetDashboardData: () => Promise<void> = async () => {
    await fetchDoctorDashboardData(setDashboardData)
  }

  useEffect(() => {
    fetchAndSetDashboardData()
  }, [])

  return {dashboardData, setDashboardData}
}

async function fetchDoctorDashboardData(
  setDashboardData: React.Dispatch<React.SetStateAction<DoctorDashboardDataType[]>>
): Promise<void> {
  try {
    const response = await PrivateDoctorDataService.fillDashboard()
    if (response) {
      setDashboardData(response.data)
      sessionStorage.setItem("DoctorDashboardData", JSON.stringify(response.data))
    }
  } catch (error: unknown) {
    handle401AxiosError(error)
  }
}

export function usePatientDashboardData(): {
  dashboardData: PatientDashboardDataType[],
  setDashboardData: React.Dispatch<React.SetStateAction<PatientDashboardDataType[]>>}
{
  const [dashboardData, setDashboardData] = useState<PatientDashboardDataType[]>([])

  const fetchAndSetDashboardData: () => Promise<void> = async () => {
    await fetchPatientDashboardData(setDashboardData)
  }

  useEffect(() => {
    fetchAndSetDashboardData()
  }, [])

  return {dashboardData, setDashboardData}
}

async function fetchPatientDashboardData(
  setDashboardData: React.Dispatch<React.SetStateAction<PatientDashboardDataType[]>>
): Promise<void> {
  try {
    const response = await PrivatePatientDataService.fillDashboard()
    if (response) {
      setDashboardData(response.data)
      sessionStorage.setItem("PatientDashboardData", JSON.stringify(response.data))
    }
  } catch (error: unknown) {
    handle401AxiosError(error)
  }
}
