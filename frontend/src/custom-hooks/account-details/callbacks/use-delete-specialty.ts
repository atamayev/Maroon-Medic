import { useCallback } from "react"
import deleteSpecialty from "src/helper-functions/account-details/delete/delete-specialty"

export const useDeleteSpecialty = (
	doctorSpecialties: SpecialtyItem[],
	setDoctorSpecialties: React.Dispatch<React.SetStateAction<SpecialtyItem[]>>,
	setSpecialtiesConfirmation: (conf: ConfirmationMessage) => void,
	setSelectedOrganization: React.Dispatch<React.SetStateAction<string>>
): ((specialty: SpecialtyItem) => void) => {
	return useCallback(
		async (specialty: SpecialtyItem) => {
			await deleteSpecialty(
				specialty,
				doctorSpecialties,
				setDoctorSpecialties,
				setSelectedOrganization,
				setSpecialtiesConfirmation
			)
		},
		[doctorSpecialties, setDoctorSpecialties, setSpecialtiesConfirmation]
	)
}

export default useDeleteSpecialty