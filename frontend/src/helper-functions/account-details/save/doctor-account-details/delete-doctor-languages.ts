import PrivateDoctorDataService from "src/services/private-doctor-data-service"
import modifyDoctorLanguages from "../doctor-account-details-helpers/modify-doctor-languages"

export default async function deleteDoctorLanguages(
	languageId: number,
	newSpokenLanguages: LanguageItem[],
	setSpokenLanguages: React.Dispatch<React.SetStateAction<LanguageItem[]>>,
	setLanguagesConfirmation: (conf: ConfirmationMessage) => void
): Promise<void> {
	return await modifyDoctorLanguages(
		PrivateDoctorDataService.deleteLanguage,
		languageId,
		newSpokenLanguages,
		setSpokenLanguages,
		setLanguagesConfirmation
	)
}
