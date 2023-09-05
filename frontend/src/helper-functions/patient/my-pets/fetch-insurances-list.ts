import ListsDataService from "src/services/lists-data-service"
import handle401AxiosError from "src/utils/handle-errors/handle-401-axios-error"

export default async function fetchInsurancesList(
	setInsurances: React.Dispatch<React.SetStateAction<InsuranceItem[]>>
): Promise<void> {
	try {
		const response = await ListsDataService.fillInsurances()
		setInsurances(response.data)
		sessionStorage.setItem("Insurances", JSON.stringify(response.data))
	} catch (error: unknown) {
		handle401AxiosError(error)
	}
}