import PrivateDoctorDataService from "../../../../services/private-doctor-data-service"
import handle401AxiosErrorAndSetMessageType from "src/utils/handle-errors/handle-401-axios-error-and-set-message-type"

type LanguageOperationsType = typeof PrivateDoctorDataService.deleteLanguage |
                              typeof PrivateDoctorDataService.addLanguage

export default async function modifyDoctorLanguages(
	operation: LanguageOperationsType,
	languageID: number,
	newSpokenLanguages: LanguageItem[],
	setSpokenLanguages: React.Dispatch<React.SetStateAction<LanguageItem[]>>,
	setLanguagesConfirmation: (conf: ConfirmationMessage) => void
): Promise<void> {
	let response
	try {
		response = await operation(languageID)
	} catch (error: unknown) {
		handle401AxiosErrorAndSetMessageType(error, setLanguagesConfirmation)
		return
	}
	if (response.status === 200) {
		setSpokenLanguages(newSpokenLanguages)
		const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails") ?? "{}")
		DoctorAccountDetails.languages = newSpokenLanguages
		sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(DoctorAccountDetails))
		setLanguagesConfirmation({messageType: "saved"})
	} else {
		setLanguagesConfirmation({messageType: "problem"})
	}
}
