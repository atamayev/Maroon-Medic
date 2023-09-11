import PrivatePatientDataService from "../../../../services/private-patient-data-service"
import useModifyPatientLanguages from "../../../../custom-hooks/account-details/save/patient-account-details/use-modify-patient-languages"

export default async function deletePatientLanguages(
	languageId: number,
	newSpokenLanguages: LanguageItem[],
	setSpokenLanguages: React.Dispatch<React.SetStateAction<LanguageItem[]>>,
	setLanguagesConfirmation: (conf: ConfirmationMessage) => void
): Promise<void> {
	return await useModifyPatientLanguages(
		PrivatePatientDataService.deleteLanguage, languageId, newSpokenLanguages, setSpokenLanguages, setLanguagesConfirmation
	)
}
