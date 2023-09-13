import useModifyDoctorLanguages from "src/custom-hooks/account-details/save/doctor-account-details-helpers/use-modify-doctor-languages"
import PrivateDoctorDataService from "src/services/private-doctor-data-service"
import useModifyPatientLanguages from "src/custom-hooks/account-details/save/patient-account-details/use-modify-patient-languages"
import PrivatePatientDataService from "src/services/private-patient-data-service"

const addLanguage = async (
	selectedLanguageId: number,
	listDetails: DoctorListDetails | PatientListDetails,
	setLanguagesConfirmation: (conf: ConfirmationMessage) => void,
	doctorOrPatient: DoctorOrPatient
): Promise<void> => {
	const selectedLanguage = listDetails.languages.find((lang) => lang.languageListId === selectedLanguageId)

	if (selectedLanguage) {
		if (doctorOrPatient === "Doctor") {
			await useModifyDoctorLanguages(
				PrivateDoctorDataService.addLanguage,
				selectedLanguage,
				setLanguagesConfirmation
			)
		}
		else {
			await useModifyPatientLanguages(
				PrivatePatientDataService.addLanguage,
				selectedLanguage,
				setLanguagesConfirmation

			)
		}
	}
}

export default addLanguage
