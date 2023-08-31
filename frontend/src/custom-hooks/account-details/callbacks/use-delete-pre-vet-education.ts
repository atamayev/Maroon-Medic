import { useCallback } from "react"
import deletePreVetEducation from "src/helper-functions/account-details/save/doctor-account-details/delete-pre-vet-education"

const useDeletePreVetEducation = (
	preVetEducation: PreVetEducationItem[],
	setPreVetEducation: React.Dispatch<React.SetStateAction<PreVetEducationItem[]>>,
	setPreVetEducationConfirmation: (conf: ConfirmationMessage) => void
): (PreVetEducation: PreVetEducationItem) => void => {
	return useCallback(
		async (preVetEducationItem: PreVetEducationItem) => {
			await deletePreVetEducation(
				preVetEducationItem.preVetEducationMappingId,
				preVetEducation,
				setPreVetEducation,
				setPreVetEducationConfirmation
			)
		}, [preVetEducation, setPreVetEducation, setPreVetEducationConfirmation])
}

export default useDeletePreVetEducation
