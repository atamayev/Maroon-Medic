import deletePatientLanguages from "src/helper-functions/account-details/save/patient-account-details/delete-patient-languages"
import deleteDoctorLanguages from "../save/doctor-account-details/delete-doctor-languages"

export const deleteLanguage = async (
	language: LanguageItem,
	spokenLanguages: LanguageItem[],
	setSpokenLanguages: React.Dispatch<React.SetStateAction<LanguageItem[]>>,
	setLanguagesConfirmation: (conf: ConfirmationMessage) => void,
	doctorOrPatient: doctorOrpatient
): Promise<void> => {
	const newSpokenLanguages = spokenLanguages.filter(l => l.languageListId !== language.languageListId)
	if (doctorOrPatient === "doctor") {
		await deleteDoctorLanguages(language.languageListId, newSpokenLanguages, setSpokenLanguages, setLanguagesConfirmation)
	}
	else {
		await deletePatientLanguages(language.languageListId, newSpokenLanguages, setSpokenLanguages, setLanguagesConfirmation)
	}
}

export default deleteLanguage
