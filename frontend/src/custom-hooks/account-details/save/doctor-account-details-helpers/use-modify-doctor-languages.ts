import _ from "lodash"
import { useContext } from "react"
import PrivateDoctorDataService from "../../../../services/private-doctor-data-service"
import handle401AxiosErrorAndSetMessageType from "src/utils/handle-errors/handle-401-axios-error-and-set-message-type"
import { AppContext } from "src/contexts/maroon-context"

type LanguageOperationsType = typeof PrivateDoctorDataService.deleteLanguage |
                              typeof PrivateDoctorDataService.addLanguage

export default function useModifyDoctorLanguages() : (
	operation: LanguageOperationsType,
	language: LanguageItem,
	setLanguagesConfirmation: (conf: ConfirmationMessage) => void
) => Promise<void> {
	const appContext = useContext(AppContext)

	return async (
		operation: LanguageOperationsType,
		language: LanguageItem,
		setLanguagesConfirmation: (conf: ConfirmationMessage) => void
	): Promise<void> => {
		if (_.isNull(appContext.doctorAccountDetails)) return
		let newSpokenLanguages: LanguageItem[]
		if (operation === PrivateDoctorDataService.deleteLanguage) {
			newSpokenLanguages = appContext.doctorAccountDetails.languages.filter(l => l.languageListId !== language.languageListId)
		} else {
			newSpokenLanguages = [...appContext.doctorAccountDetails.languages, language]
		}

		let response
		try {
			response = await operation(language.languageListId)
		} catch (error: unknown) {
			handle401AxiosErrorAndSetMessageType(error, setLanguagesConfirmation)
			return
		}

		if (response.status === 200) {
			appContext.doctorAccountDetails.languages = newSpokenLanguages
			setLanguagesConfirmation({messageType: "saved"})
		} else {
			setLanguagesConfirmation({messageType: "problem"})
		}
	}
}
