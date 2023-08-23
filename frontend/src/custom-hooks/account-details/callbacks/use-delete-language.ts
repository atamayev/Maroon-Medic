import { useCallback } from "react"
import deleteLanguage from "src/helper-functions/account-details/delete/delete-language"

export const useDeleteLanguage = (
  spokenLanguages: LanguageItem[],
  setSpokenLanguages: React.Dispatch<React.SetStateAction<LanguageItem[]>>,
  setLanguagesConfirmation: (conf: ConfirmationMessage) => void,
  doctorOrPatient: doctorOrpatient
): ((language: LanguageItem) => void) => {
  return useCallback(
    async (language: LanguageItem) => {
      await deleteLanguage(
        language,
        spokenLanguages,
        setSpokenLanguages,
        setLanguagesConfirmation,
        doctorOrPatient
      )
    },
    [spokenLanguages, setSpokenLanguages, setLanguagesConfirmation]
  )
}

export default useDeleteLanguage
