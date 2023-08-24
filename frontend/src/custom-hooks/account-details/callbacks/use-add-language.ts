import { useCallback } from "react"
import addLanguage from "src/helper-functions/account-details/add/add-language"

export const useAddLanguage = (
	spokenLanguages: LanguageItem[],
	setSpokenLanguages: React.Dispatch<React.SetStateAction<LanguageItem[]>>,
	listDetails: DoctorListDetails | PatientListDetails,
	setLanguagesConfirmation: (conf: ConfirmationMessage) => void,
	doctorOrPatient: doctorOrpatient
): (e: React.ChangeEvent<HTMLSelectElement>) => void => {
	return useCallback(
		async (e: React.ChangeEvent<HTMLSelectElement>) => {
			await addLanguage(
				Number(e.target.value),
				spokenLanguages,
				setSpokenLanguages,
				listDetails,
				setLanguagesConfirmation,
				doctorOrPatient
			)
		}, [spokenLanguages, listDetails, setSpokenLanguages, setLanguagesConfirmation])
}

export default useAddLanguage
