import PrivatePatientDataService from "../../../../services/private-patient-data-service"
import handle401AxiosErrorAndSetMessageType from "src/utils/handle-errors/handle-401-axios-error-and-set-message-type"

type LanguageOperationsType = typeof PrivatePatientDataService.deleteLanguage |
                              typeof PrivatePatientDataService.addLanguage

export default async function modifyPatientLanguages(
	operation: LanguageOperationsType,
	languageId: number,
	newSpokenLanguages: LanguageItem[],
	setSpokenLanguages: React.Dispatch<React.SetStateAction<LanguageItem[]>>,
	setLanguagesConfirmation: (conf: ConfirmationMessage) => void
): Promise<void> {
	let response
	try {
		response = await operation(languageId)
	} catch (error: unknown) {
		handle401AxiosErrorAndSetMessageType(error, setLanguagesConfirmation)
		return
	}
	if (response.status === 200) {
		setSpokenLanguages(newSpokenLanguages)
		const PatientAccountDetails = JSON.parse(sessionStorage.getItem("PatientAccountDetails") ?? "{}")
		PatientAccountDetails.languages = newSpokenLanguages
		sessionStorage.setItem("PatientAccountDetails", JSON.stringify(PatientAccountDetails))
		setLanguagesConfirmation({messageType: "saved"})
	} else {
		setLanguagesConfirmation({messageType: "problem"})
	}
}
