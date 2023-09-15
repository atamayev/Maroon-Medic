import { useCallback } from "react"
import useAddVetEducation from "../save/doctor-account-details/use-add-vet-education"

const useSaveAddVetEducation = (
	setVetEducationConfirmation: (conf: ConfirmationMessage) => void
): ((selectedEducationObj: VetEducationItem) => void) => {
	const addVetEducation = useAddVetEducation()

	return useCallback(
		async (selectedEducationObj: VetEducationItem) => {
			await addVetEducation(
				selectedEducationObj,
				setVetEducationConfirmation
			)
		}, [addVetEducation])
}

export default useSaveAddVetEducation
