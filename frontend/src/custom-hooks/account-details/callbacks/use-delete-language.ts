import { useCallback } from "react"
import useModifyDoctorLanguages from "../save/doctor-account-details-helpers/use-modify-doctor-languages"
import useModifyPatientLanguages from "../save/patient-account-details/use-modify-patient-languages"
import PrivateDoctorDataService from "src/services/private-doctor-data-service"
import PrivatePatientDataService from "src/services/private-patient-data-service"

const useDeleteLanguage = (
	setLanguagesConfirmation: (conf: ConfirmationMessage) => void,
	doctorOrPatient: DoctorOrPatient
): ((language: LanguageItem) => void) => {
	const modifyDoctorLanguages = useModifyDoctorLanguages()
	const modifyPatientLanguages = useModifyPatientLanguages()

	return useCallback(
		async (language: LanguageItem) => {
			if (doctorOrPatient === "Doctor") {
				await modifyDoctorLanguages(
					PrivateDoctorDataService.deleteLanguage,
					language,
					setLanguagesConfirmation
				)
			}
			else {
				await modifyPatientLanguages(
					PrivatePatientDataService.deleteLanguage,
					language,
					setLanguagesConfirmation
				)
			}
		}, [modifyDoctorLanguages, modifyPatientLanguages])
}

export default useDeleteLanguage
