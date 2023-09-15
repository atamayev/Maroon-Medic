import { useCallback } from "react"
import useAddPreVetEducation from "src/custom-hooks/account-details/save/doctor-account-details/use-add-pre-vet-education"

export const useSaveAddPreVetEducation = (
	setPreVetEducationConfirmation: (conf: ConfirmationMessage) => void
): ((selectedEducationObj: PreVetEducationItem) => void) => {
	const addPreVetEducation = useAddPreVetEducation()

	return useCallback(
		async (selectedEducationObj: PreVetEducationItem) => {
			await addPreVetEducation(
				selectedEducationObj,
				setPreVetEducationConfirmation
			)
		}, [addPreVetEducation])
}

export default useSaveAddPreVetEducation
