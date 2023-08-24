import PrivateDoctorDataService from "src/services/private-doctor-data-service"
import handle401AxiosError from "src/utils/handle-errors/handle-401-axios-error"

export default async function fetchDoctorDashboardData(
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
