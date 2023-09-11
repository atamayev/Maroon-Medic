import { AxiosResponse } from "axios"
import PrivateDoctorDataService from "src/services/private-doctor-data-service"
import handle401AxiosError from "src/utils/handle-errors/handle-401-axios-error"

export default async function fetchDoctorPersonalInfo (): Promise<AxiosResponse<BirthDateInfo> | void> {
	try {
		return await PrivateDoctorDataService.fillPersonalData()
	} catch (error: unknown) {
		handle401AxiosError(error)
	}
}
