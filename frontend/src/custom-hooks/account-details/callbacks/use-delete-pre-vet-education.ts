import { useCallback } from "react"
import useDeletePreVetEducationItem from "../save/doctor-account-details/use-delete-pre-vet-education"

const useDeletePreVetEducation = (
	preVetEducation: PreVetEducationItem[],
	setPreVetEducation: React.Dispatch<React.SetStateAction<PreVetEducationItem[]>>,
	setPreVetEducationConfirmation: (conf: ConfirmationMessage) => void
): (PreVetEducation: PreVetEducationItem) => void => {
	return useCallback(
		async (preVetEducationItem: PreVetEducationItem) => {
			await useDeletePreVetEducationItem(
				preVetEducationItem.preVetEducationMappingId,
				preVetEducation,
				setPreVetEducation,
				setPreVetEducationConfirmation
			)
		}, [preVetEducation]
	)
}

export default useDeletePreVetEducation
