import { useCallback } from "react"
import useDeletePreVetEducationItem from "../save/doctor-account-details/use-delete-pre-vet-education-item"

const useDeletePreVetEducation = (
	setPreVetEducationConfirmation: (conf: ConfirmationMessage) => void
): (PreVetEducation: PreVetEducationItem) => void => {
	const deletePreVetEducationItem = useDeletePreVetEducationItem()

	return useCallback(
		async (preVetEducationItem: PreVetEducationItem) => {
			await deletePreVetEducationItem(
				preVetEducationItem.preVetEducationMappingId,
				setPreVetEducationConfirmation
			)
		}, [deletePreVetEducationItem]
	)
}

export default useDeletePreVetEducation
