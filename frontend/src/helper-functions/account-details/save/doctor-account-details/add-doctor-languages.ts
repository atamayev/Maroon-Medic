import PrivateDoctorDataService from "src/services/private-doctor-data-service"
import useModifyDoctorLanguages
	from "../../../../custom-hooks/account-details/save/doctor-account-details-helpers/use-modify-doctor-languages"

export default async function addDoctorLanguages(
	languageId: number,
	newSpokenLanguages: LanguageItem[],
	setSpokenLanguages: React.Dispatch<React.SetStateAction<LanguageItem[]>>,
	setLanguagesConfirmation: (conf: ConfirmationMessage) => void
): Promise<void> {
	return await useModifyDoctorLanguages(
		PrivateDoctorDataService.addLanguage,
		languageId,
		newSpokenLanguages,
		setSpokenLanguages,
		setLanguagesConfirmation
	)
}
