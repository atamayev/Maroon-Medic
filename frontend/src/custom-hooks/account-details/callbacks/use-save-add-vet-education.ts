import { useCallback } from "react"
import useAddVetEducation from "../save/doctor-account-details/use-add-vet-education"

const useSaveAddVetEducation = (
	vetEducation: VetEducationItem[],
	setVetEducation: React.Dispatch<React.SetStateAction<VetEducationItem[]>>,
	setVetEducationConfirmation: (conf: ConfirmationMessage) => void
): ((selectedEducationObj: VetEducationItem) => void) => {
	return useCallback(
		async (selectedEducationObj: VetEducationItem) => {
			await useAddVetEducation(
				selectedEducationObj,
				vetEducation,
				setVetEducation,
				setVetEducationConfirmation
			)
		}, [vetEducation, setVetEducation, setVetEducationConfirmation])
}

export default useSaveAddVetEducation
