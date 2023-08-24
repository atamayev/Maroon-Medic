import PrivateDoctorDataService from "src/services/private-doctor-data-service"
import handle401AxiosError from "src/utils/handle-errors/handle-401-axios-error"

export default async function fetchDoctorPersonalInfo (
	setHeaderData: React.Dispatch<React.SetStateAction<string>>
): Promise<void> {
	let response
	try {
		response = await PrivateDoctorDataService.fillPersonalData()
	} catch (error: unknown) {
		handle401AxiosError(error)
	}

	if (response) {
		setHeaderData(response.data.FirstName)
		sessionStorage.setItem("DoctorPersonalInfo", JSON.stringify(response.data))
	}
}
