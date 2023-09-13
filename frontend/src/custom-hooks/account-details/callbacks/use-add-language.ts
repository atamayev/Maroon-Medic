import _ from "lodash"
import { useCallback } from "react"
import addLanguage from "src/helper-functions/account-details/add/add-language"

const useAddLanguage = (
	listDetails: DoctorListDetails | PatientListDetails | null,
	setLanguagesConfirmation: (conf: ConfirmationMessage) => void,
	doctorOrPatient: DoctorOrPatient
): (e: React.ChangeEvent<HTMLSelectElement>) => void => {
	return useCallback(
		async (e: React.ChangeEvent<HTMLSelectElement>) => {
			if (!_.isNull(listDetails)) {
				await addLanguage(
					Number(e.target.value),
					listDetails,
					setLanguagesConfirmation,
					doctorOrPatient
				)
			}
		}, [listDetails, setLanguagesConfirmation])
}

export default useAddLanguage
