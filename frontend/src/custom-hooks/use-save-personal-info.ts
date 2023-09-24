import _ from "lodash"
import { useContext } from "react"
import { AxiosResponse } from "axios"
import AppContext from "src/contexts/maroon-context"
import PrivateDoctorDataService from "src/services/private-doctor-data-service"
import PrivatePatientDataService from "src/services/private-patient-data-service"

export default function useSavePersonalInfo () : (
	personalInfo: BirthDateInfo,
	setPersonalInfoConfirmation: (conf: ConfirmationMessage) => void,
	userType: DoctorOrPatient
) => Promise<void> {
	const appContext = useContext(AppContext)

	return async (
		personalInfo: BirthDateInfo,
		setPersonalInfoConfirmation: (conf: ConfirmationMessage) => void,
		userType: DoctorOrPatient
	): Promise<void> => {
		const stringifiedPersonalInfoData = personalInfo

		try {
			if (!_.isEqual(stringifiedPersonalInfoData, appContext.personalInfo)) {
				let response: AxiosResponse
				if (userType === "Doctor") response = await PrivateDoctorDataService.savePersonalData(personalInfo)
				else response = await PrivatePatientDataService.savePersonalData(personalInfo)

				if (response.status === 200) {
					appContext.initializePersonalInfo(personalInfo)
					setPersonalInfoConfirmation({messageType: "saved"})
				}
			} else {
				setPersonalInfoConfirmation({messageType: "same"})
			}
		} catch (error) {
			setPersonalInfoConfirmation({messageType: "problem"})
		}
	}
}
