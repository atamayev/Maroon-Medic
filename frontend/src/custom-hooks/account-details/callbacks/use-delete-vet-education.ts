import { useCallback } from "react"
import useDeleteVetEducationItem from "../save/doctor-account-details/use-delete-vet-education"

export const useDeleteVetEducation = (
	setVetEducationConfirmation: (conf: ConfirmationMessage) => void
): ((VetEducation: VetEducationItem) => void) => {
	const deleteVetEducationItem = useDeleteVetEducationItem()

	return useCallback(
		async (vetEducationItem: VetEducationItem) => {
			await deleteVetEducationItem(
				vetEducationItem.vetEducationMappingId,
				setVetEducationConfirmation
			)
		}, [deleteVetEducationItem])
}

export default useDeleteVetEducation
