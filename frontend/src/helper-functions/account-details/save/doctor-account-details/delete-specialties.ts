import PrivateDoctorDataService from "src/services/private-doctor-data-service"
import useModifyDoctorSpecialties
	from "../../../../custom-hooks/account-details/save/doctor-account-details-helpers/use-modify-doctor-specialties"

export default async function deleteSpecialties(
	specialtyId: number,
	newDoctorSpecialties: SpecialtyItem[],
	setSelectedOrganization: React.Dispatch<React.SetStateAction<string>>,
	setSpecialtiesConfirmation: (conf: ConfirmationMessage) => void
): Promise<void> {
	return await useModifyDoctorSpecialties(
		PrivateDoctorDataService.deleteSpecialty,
		specialtyId,
		newDoctorSpecialties,
		setSpecialtiesConfirmation,
		() => setSelectedOrganization("")
	)
}
