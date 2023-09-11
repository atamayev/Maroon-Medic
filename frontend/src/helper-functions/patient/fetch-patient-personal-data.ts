import { AxiosResponse } from "axios"
import PrivatePatientDataService from "src/services/private-patient-data-service"
import handle401AxiosError from "src/utils/handle-errors/handle-401-axios-error"

export default async function fetchPatientPersonalInfo (): Promise<AxiosResponse<BirthDateInfo> | void> {
	try {
		return await PrivatePatientDataService.fillPersonalData()
	} catch (error: unknown) {
		handle401AxiosError(error)
	}
}
