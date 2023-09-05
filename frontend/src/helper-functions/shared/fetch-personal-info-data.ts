import { AxiosResponse } from "axios"
import PrivateDoctorDataService from "src/services/private-doctor-data-service"
import PrivatePatientDataService from "src/services/private-patient-data-service"
import handle401AxiosError from "src/utils/handle-errors/handle-401-axios-error"

export default async function fetchPersonalInfoData(
	setPersonalInfo: React.Dispatch<React.SetStateAction<BirthDateInfo>>,
	userType: DoctorOrPatient
): Promise<void> {
	try {
		let response: AxiosResponse

		if (userType === "Doctor") response = await PrivateDoctorDataService.fillPersonalData()
		else response = await PrivatePatientDataService.fillPersonalData()

		setPersonalInfo(response.data)
		sessionStorage.setItem(`${userType}PersonalInfo`, JSON.stringify(response.data))
	} catch (error: unknown) {
		handle401AxiosError(error)
	}
}
