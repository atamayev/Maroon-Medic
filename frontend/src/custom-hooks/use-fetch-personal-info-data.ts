import _ from "lodash"
import { useContext } from "react"
import { AxiosResponse } from "axios"
import AppContext from "src/contexts/maroon-context"
import PrivateDoctorDataService from "src/services/private-doctor-data-service"
import PrivatePatientDataService from "src/services/private-patient-data-service"
import handle401AxiosError from "src/utils/handle-errors/handle-401-axios-error"

export default async function useFetchPersonalInfoData(
	setPersonalInfo: React.Dispatch<React.SetStateAction<BirthDateInfo>>
): Promise<void> {
	const appContext = useContext(AppContext)

	try {
		if (_.isNull(appContext.sharedData) || _.isNull(appContext.auth.userType)) return
		let response: AxiosResponse

		if (appContext.auth.userType === "Doctor") response = await PrivateDoctorDataService.fillPersonalData()
		else response = await PrivatePatientDataService.fillPersonalData()

		setPersonalInfo(response.data)
		appContext.sharedData.initializePersonalInfo(response.data)
	} catch (error: unknown) {
		handle401AxiosError(error)
	}
}
