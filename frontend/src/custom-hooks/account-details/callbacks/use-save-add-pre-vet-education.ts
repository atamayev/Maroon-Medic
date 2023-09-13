import { useCallback } from "react"
import useAddPreVetEducation from "src/custom-hooks/account-details/save/doctor-account-details/use-add-pre-vet-education"

export const useSaveAddPreVetEducation = (
	setPreVetEducationConfirmation: (conf: ConfirmationMessage) => void
): ((selectedEducationObj: PreVetEducationItem) => void) => {
	return useCallback(
		async (selectedEducationObj: PreVetEducationItem) => {
			await useAddPreVetEducation(
				selectedEducationObj,
				setPreVetEducationConfirmation
			)
		}, [setPreVetEducationConfirmation])
}

export default useSaveAddPreVetEducation
