import useModifyDoctorLanguages from "src/custom-hooks/account-details/save/doctor-account-details-helpers/use-modify-doctor-languages"
import PrivateDoctorDataService from "src/services/private-doctor-data-service"
import useModifyPatientLanguages from "src/custom-hooks/account-details/save/patient-account-details/use-modify-patient-languages"
import PrivatePatientDataService from "src/services/private-patient-data-service"

const deleteLanguage = async (
	language: LanguageItem,
	setLanguagesConfirmation: (conf: ConfirmationMessage) => void,
	doctorOrPatient: DoctorOrPatient
): Promise<void> => {
	if (doctorOrPatient === "Doctor") {
		await useModifyDoctorLanguages(
			PrivateDoctorDataService.deleteLanguage,
			language,
			setLanguagesConfirmation
		)
	}
	else {
		await useModifyPatientLanguages(
			PrivatePatientDataService.deleteLanguage,
			language,
			setLanguagesConfirmation
		)
	}
}

export default deleteLanguage
