import PrivateDoctorDataService from "src/services/private-doctor-data-service"
import modifyDoctorSpecialties from "../doctor-account-details-helpers/modify-doctor-specialties"

export default async function addSpecialties(
	specialtyId: number,
	newDoctorSpecialties: SpecialtyItem[],
	setDoctorSpecialties: React.Dispatch<React.SetStateAction<SpecialtyItem[]>>,
	setSelectedOrganization: React.Dispatch<React.SetStateAction<string>>,
	setSpecialtiesConfirmation: (conf: ConfirmationMessage) => void
): Promise<void> {
	return await modifyDoctorSpecialties(
		PrivateDoctorDataService.addSpecialty,
		specialtyId,
		newDoctorSpecialties,
		setDoctorSpecialties,
		setSpecialtiesConfirmation,
		() => setSelectedOrganization("")
	)
}
