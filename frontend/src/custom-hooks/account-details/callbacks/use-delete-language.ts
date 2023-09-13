import { useCallback } from "react"
import deleteLanguage from "src/helper-functions/account-details/delete/delete-language"

export const useDeleteLanguage = (
	setLanguagesConfirmation: (conf: ConfirmationMessage) => void,
	doctorOrPatient: DoctorOrPatient
): ((language: LanguageItem) => void) => {
	return useCallback(
		async (language: LanguageItem) => {
			await deleteLanguage(
				language,
				setLanguagesConfirmation,
				doctorOrPatient
			)
		}, [])
}

export default useDeleteLanguage
