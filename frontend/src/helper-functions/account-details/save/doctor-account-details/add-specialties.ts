import PrivateDoctorDataService from "src/services/private-doctor-data-service"
import useModifyDoctorSpecialties
	from "../../../../custom-hooks/account-details/save/doctor-account-details-helpers/use-modify-doctor-specialties"

export default async function addSpecialties(
	selectedSpecialty: SpecialtyItem | undefined,
	doctorSpecialties: SpecialtyItem[],
	setSelectedOrganization: React.Dispatch<React.SetStateAction<string>>,
	setSpecialtiesConfirmation: (conf: ConfirmationMessage) => void
): Promise<void> {
	if (selectedSpecialty) {
		const newDoctorSpecialties = [...doctorSpecialties, selectedSpecialty]
		return await useModifyDoctorSpecialties(
			PrivateDoctorDataService.addSpecialty,
			selectedSpecialty.specialtiesListId,
			newDoctorSpecialties,
			setSpecialtiesConfirmation,
			() => setSelectedOrganization("")
		)
	}
}
