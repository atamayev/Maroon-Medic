import { useCallback } from "react"
import useAddVetEducation from "../save/doctor-account-details/use-add-vet-education"

const useSaveAddVetEducation = (
	setVetEducationConfirmation: (conf: ConfirmationMessage) => void
): ((selectedEducationObj: VetEducationItem) => void) => {
	return useCallback(
		async (selectedEducationObj: VetEducationItem) => {
			await useAddVetEducation(
				selectedEducationObj,
				setVetEducationConfirmation
			)
		}, [])
}

export default useSaveAddVetEducation
