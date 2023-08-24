import { useCallback } from "react"
import addPreVetEducation from "src/helper-functions/account-details/save/doctor-account-details/add-pre-vet-education"

export const useSaveAddPreVetEducation = (
	preVetEducation: PreVetEducationItem[],
	setPreVetEducation: React.Dispatch<React.SetStateAction<PreVetEducationItem[]>>,
	listDetails: DoctorListDetails,
	setPreVetEducationConfirmation: (conf: ConfirmationMessage) => void
): ((selectedEducationObj: PreVetEducationItem) => void) => {
	return useCallback(
		async (selectedEducationObj: PreVetEducationItem) => {
			await addPreVetEducation(
				selectedEducationObj,
				preVetEducation,
				setPreVetEducation,
				listDetails,
				setPreVetEducationConfirmation
			)
		}, [preVetEducation, setPreVetEducation, listDetails, setPreVetEducationConfirmation])
}

export default useSaveAddPreVetEducation
