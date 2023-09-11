import { useContext } from "react"
import PrivateDoctorDataService from "../../../../services/private-doctor-data-service"
import handle401AxiosErrorAndSetMessageType from "src/utils/handle-errors/handle-401-axios-error-and-set-message-type"
import { AppContext } from "src/contexts/maroon-context"

type LanguageOperationsType = typeof PrivateDoctorDataService.deleteLanguage |
                              typeof PrivateDoctorDataService.addLanguage

export default async function useModifyDoctorLanguages(
	operation: LanguageOperationsType,
	languageId: number,
	newSpokenLanguages: LanguageItem[],
	setSpokenLanguages: React.Dispatch<React.SetStateAction<LanguageItem[]>>,
	setLanguagesConfirmation: (conf: ConfirmationMessage) => void
): Promise<void> {
	const { doctorAccountDetails } = useContext(AppContext)

	let response
	try {
		response = await operation(languageId)
	} catch (error: unknown) {
		handle401AxiosErrorAndSetMessageType(error, setLanguagesConfirmation)
		return
	}

	if (response.status === 200) {
		setSpokenLanguages(newSpokenLanguages)
		doctorAccountDetails!.languages = newSpokenLanguages
		setLanguagesConfirmation({messageType: "saved"})
	} else {
		setLanguagesConfirmation({messageType: "problem"})
	}
}
