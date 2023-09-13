import { useCallback } from "react"
import useDeleteVetEducationItem from "../save/doctor-account-details/use-delete-vet-education"

export const useDeleteVetEducation = (
	setVetEducationConfirmation: (conf: ConfirmationMessage) => void
): ((VetEducation: VetEducationItem) => void) => {
	return useCallback(
		async (vetEducationItem: VetEducationItem) => {
			await useDeleteVetEducationItem(
				vetEducationItem.vetEducationMappingId,
				setVetEducationConfirmation
			)
		}, [])
}

export default useDeleteVetEducation
