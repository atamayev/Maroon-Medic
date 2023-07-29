import { AxiosError } from "axios"
import { useState, useEffect } from "react"
import PrivateDoctorDataService from "../services/private-doctor-data-service"
import PrivatePatientDataService from "../services/private-patient-data-service"
import { invalidUserAction } from "./user-verification-snippets"

type UserType = "Doctor" | "Patient"

export function useDoctorDashboardData(userType: UserType) {
  const [dashboardData, setDashboardData] = useState(null)

  const fetchAndSetDashboardData = async () => {
    await fetchDoctorDashboardData(setDashboardData)
  }

  useEffect(() => {
    fetchAndSetDashboardData()
  }, [userType])

  return {dashboardData, setDashboardData}
}

async function fetchDoctorDashboardData(setDashboardData) {
  try {
    const response = await PrivateDoctorDataService.fillDashboard()
    if (response) {
      setDashboardData(response.data)
      sessionStorage.setItem("DoctorDashboardData", JSON.stringify(response.data))
    }
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        invalidUserAction(error.response.data)
      }
    }
  }
}

export function usePatientDashboardData(userType: UserType) {
  const [dashboardData, setDashboardData] = useState(null)

  const fetchAndSetDashboardData = async () => {
    await fetchPatientDashboardData(setDashboardData)
  }

  useEffect(() => {
    fetchAndSetDashboardData()
  }, [userType])

  return {dashboardData, setDashboardData}
}

async function fetchPatientDashboardData(setDashboardData) {
  try {
    const response = await PrivatePatientDataService.fillDashboard()
    if (response) {
      setDashboardData(response.data)
      sessionStorage.setItem("PatientDashboardData", JSON.stringify(response.data))
    }
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        invalidUserAction(error.response.data)
      }
    }
  }
}
