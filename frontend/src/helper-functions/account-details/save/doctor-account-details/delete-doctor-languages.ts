import PrivateDoctorDataService from "src/services/private-doctor-data-service"
import useModifyDoctorLanguages
	from "../../../../custom-hooks/account-details/save/doctor-account-details-helpers/use-modify-doctor-languages"

export default async function deleteDoctorLanguages(
	languageId: number,
	newSpokenLanguages: LanguageItem[],
	setSpokenLanguages: React.Dispatch<React.SetStateAction<LanguageItem[]>>,
	setLanguagesConfirmation: (conf: ConfirmationMessage) => void
): Promise<void> {
	return await useModifyDoctorLanguages(
		PrivateDoctorDataService.deleteLanguage,
		languageId,
		newSpokenLanguages,
		setSpokenLanguages,
		setLanguagesConfirmation
	)
}
