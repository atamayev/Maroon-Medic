import addDoctorLanguages from "../save/doctor-account-details/add-doctor-languages"
import addPatientLanguages from "../save/patient-account-details/add-patient-languages"

export const addLanguage = async (
	selectedLanguageID: number,
	spokenLanguages: LanguageItem[],
	setSpokenLanguages: React.Dispatch<React.SetStateAction<LanguageItem[]>>,
	listDetails: DoctorListDetails | PatientListDetails,
	setLanguagesConfirmation: (conf: ConfirmationMessage) => void,
	doctorOrPatient: doctorOrpatient
): Promise<void> => {
	const selectedLanguage = listDetails.languages.find((lang) => lang.languageListId === selectedLanguageID)

	if (selectedLanguage) {
		const newSpokenLanguages = [...spokenLanguages, selectedLanguage]

		if (doctorOrPatient === "doctor") {
			await addDoctorLanguages(selectedLanguageID, newSpokenLanguages, setSpokenLanguages, setLanguagesConfirmation)
		}
		else {
			await addPatientLanguages(selectedLanguageID, newSpokenLanguages, setSpokenLanguages, setLanguagesConfirmation)
		}
	}
}

export default addLanguage
