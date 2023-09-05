import deleteSpecialties from "../save/doctor-account-details/delete-specialties"

export const deleteSpecialty = async (
	specialty: SpecialtyItem,
	doctorSpecialties: SpecialtyItem[],
	setDoctorSpecialties: React.Dispatch<React.SetStateAction<SpecialtyItem[]>>,
	setSelectedOrganization: React.Dispatch<React.SetStateAction<string>>,
	setSpecialtiesConfirmation: (conf: ConfirmationMessage) => void
): Promise<void> => {
	const newDoctorSpecialties = doctorSpecialties.filter(s => s.specialtiesListId !== specialty.specialtiesListId)
	await deleteSpecialties(specialty.specialtiesListId, newDoctorSpecialties,
		setDoctorSpecialties, setSelectedOrganization, setSpecialtiesConfirmation
	)
}

export default deleteSpecialty