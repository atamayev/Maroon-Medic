import { useCallback } from "react"
import useDeletePreVetEducationItem from "../save/doctor-account-details/use-delete-pre-vet-education"

const useDeletePreVetEducation = (
	setPreVetEducationConfirmation: (conf: ConfirmationMessage) => void
): (PreVetEducation: PreVetEducationItem) => void => {
	return useCallback(
		async (preVetEducationItem: PreVetEducationItem) => {
			await useDeletePreVetEducationItem(
				preVetEducationItem.preVetEducationMappingId,
				setPreVetEducationConfirmation
			)
		}, []
	)
}

export default useDeletePreVetEducation
