import { useCallback } from "react"
import deleteSpecialty from "src/helper-functions/account-details/delete/delete-specialty"

export const useDeleteSpecialty = (
	doctorSpecialties: SpecialtyItem[],
	setSpecialtiesConfirmation: (conf: ConfirmationMessage) => void,
	setSelectedOrganization: React.Dispatch<React.SetStateAction<string>>
): ((specialty: SpecialtyItem) => void) => {
	return useCallback(
		async (specialty: SpecialtyItem) => {
			await deleteSpecialty(
				specialty,
				doctorSpecialties,
				setSelectedOrganization,
				setSpecialtiesConfirmation
			)
		},
		[doctorSpecialties, setSpecialtiesConfirmation]
	)
}

export default useDeleteSpecialty
