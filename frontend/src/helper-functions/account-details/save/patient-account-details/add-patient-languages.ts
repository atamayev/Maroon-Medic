import PrivatePatientDataService from "../../../../services/private-patient-data-service"
import modifyPatientLanguages from "./modify-patient-languages"

export default async function addPatientLanguages(
	languageId: number,
	newSpokenLanguages: LanguageItem[],
	setSpokenLanguages: React.Dispatch<React.SetStateAction<LanguageItem[]>>,
	setLanguagesConfirmation: (conf: ConfirmationMessage) => void
): Promise<void> {
	return await modifyPatientLanguages(
		PrivatePatientDataService.addLanguage, languageId, newSpokenLanguages, setSpokenLanguages, setLanguagesConfirmation
	)
}
