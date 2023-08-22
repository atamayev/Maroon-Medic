import { handle401AxiosError } from "src/utils/handle-errors"
import PrivatePatientDataService from "src/services/private-patient-data-service"

export default async function fetchPatientDashboardData(
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
