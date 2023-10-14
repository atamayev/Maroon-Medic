import _ from "lodash"
import { useContext } from "react"
import { AxiosResponse } from "axios"
import AppContext from "src/contexts/maroon-context"
import PrivateDoctorDataService from "src/services/private-doctor-data-service"
import PrivatePatientDataService from "src/services/private-patient-data-service"

export default function useSavePersonalInfo () : (
	personalInfo: BirthDateInfo,
	setPersonalInfoConfirmation: (conf: ConfirmationMessage) => void,
) => Promise<void> {
	const appContext = useContext(AppContext)

	return async (
		personalInfo: BirthDateInfo,
		setPersonalInfoConfirmation: (conf: ConfirmationMessage) => void,
	): Promise<void> => {
		const stringifiedPersonalInfoData = personalInfo
		if (_.isNull(appContext.sharedData)) return

		try {
			if (!_.isEqual(stringifiedPersonalInfoData, appContext.sharedData.personalInfo)) {
				let response: AxiosResponse
				if (appContext.auth.userType === "Doctor") {
					response = await PrivateDoctorDataService.savePersonalData(personalInfo)
				} else {
					response = await PrivatePatientDataService.savePersonalData(personalInfo)
				}

				if (response.status === 200) {
					appContext.sharedData.initializePersonalInfo(personalInfo)
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
