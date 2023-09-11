import { useCallback } from "react"
import useDeleteVetEducationItem from "../save/doctor-account-details/use-delete-vet-education"

export const useDeleteVetEducation = (
	vetEducation: VetEducationItem[],
	setVetEducation: React.Dispatch<React.SetStateAction<VetEducationItem[]>>,
	setVetEducationConfirmation: (conf: ConfirmationMessage) => void
): ((VetEducation: VetEducationItem) => void) => {
	return useCallback(
		async (vetEducationItem: VetEducationItem) => {
			await useDeleteVetEducationItem(
				vetEducationItem.vetEducationMappingId,
				vetEducation,
				setVetEducation,
				setVetEducationConfirmation
			)
		}, [vetEducation])
}

export default useDeleteVetEducation
