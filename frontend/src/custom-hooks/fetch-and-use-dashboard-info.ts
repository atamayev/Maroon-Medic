import { useState, useEffect } from "react"
import { handle401AxiosError } from "src/utils/handle-errors"
import PrivateDoctorDataService from "../services/private-doctor-data-service"
import PrivatePatientDataService from "../services/private-patient-data-service"

export function useDoctorDashboardData() {
  const [dashboardData, setDashboardData] = useState<DoctorDashboardDataType[]>([])

  const fetchAndSetDashboardData = async () => {
    await fetchDoctorDashboardData(setDashboardData)
  }

  useEffect(() => {
    fetchAndSetDashboardData()
  }, [])

  return {dashboardData, setDashboardData}
}

async function fetchDoctorDashboardData(setDashboardData: React.Dispatch<React.SetStateAction<DoctorDashboardDataType[]>>) {
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

export function usePatientDashboardData() {
  const [dashboardData, setDashboardData] = useState<PatientDashboardDataType[]>([])

  const fetchAndSetDashboardData = async () => {
    await fetchPatientDashboardData(setDashboardData)
  }

  useEffect(() => {
    fetchAndSetDashboardData()
  }, [])

  return {dashboardData, setDashboardData}
}

async function fetchPatientDashboardData(setDashboardData: React.Dispatch<React.SetStateAction<PatientDashboardDataType[]>>) {
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
