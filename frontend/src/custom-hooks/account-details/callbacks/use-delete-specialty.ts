import { useCallback } from "react"
import PrivateDoctorDataService from "src/services/private-doctor-data-service"
import useModifyDoctorSpecialties from "../save/doctor-account-details-helpers/use-modify-doctor-specialties"

export const useDeleteSpecialty = (
	doctorSpecialties: SpecialtyItem[],
	setSpecialtiesConfirmation: (conf: ConfirmationMessage) => void,
	setSelectedOrganization: React.Dispatch<React.SetStateAction<string>>
): ((specialty: SpecialtyItem) => void) => {
	const modifyDoctorSpecialties = useModifyDoctorSpecialties()

	return useCallback(
		async (specialty: SpecialtyItem) => {
			const newDoctorSpecialties = doctorSpecialties.filter(s => s.specialtiesListId !== specialty.specialtiesListId)

			await modifyDoctorSpecialties(
				PrivateDoctorDataService.deleteSpecialty,
				specialty.specialtiesListId,
				newDoctorSpecialties,
				setSpecialtiesConfirmation,
				() => setSelectedOrganization("")
			)
		},
		[doctorSpecialties, modifyDoctorSpecialties]
	)
}

export default useDeleteSpecialty
