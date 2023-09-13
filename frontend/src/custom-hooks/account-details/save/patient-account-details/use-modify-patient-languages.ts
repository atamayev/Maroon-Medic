import { useContext } from "react"
import PrivatePatientDataService from "../../../../services/private-patient-data-service"
import handle401AxiosErrorAndSetMessageType from "src/utils/handle-errors/handle-401-axios-error-and-set-message-type"
import { AppContext } from "src/contexts/maroon-context"

type LanguageOperationsType = typeof PrivatePatientDataService.deleteLanguage |
                              typeof PrivatePatientDataService.addLanguage

export default async function useModifyPatientLanguages(
	operation: LanguageOperationsType,
	language: LanguageItem,
	setLanguagesConfirmation: (conf: ConfirmationMessage) => void
): Promise<void> {
	const { patientAccountDetails } = useContext(AppContext)
	let newSpokenLanguages: LanguageItem[]
	if (operation === PrivatePatientDataService.deleteLanguage) {
		newSpokenLanguages = patientAccountDetails?.languages.filter(l => l.languageListId !== language.languageListId) || []
	} else {
		newSpokenLanguages = [...patientAccountDetails!.languages, language]
	}
	let response

	try {
		response = await operation(language.languageListId)
	} catch (error: unknown) {
		handle401AxiosErrorAndSetMessageType(error, setLanguagesConfirmation)
		return
	}

	if (response.status === 200) {
		patientAccountDetails!.languages = newSpokenLanguages
		setLanguagesConfirmation({messageType: "saved"})
	} else {
		setLanguagesConfirmation({messageType: "problem"})
	}
}
