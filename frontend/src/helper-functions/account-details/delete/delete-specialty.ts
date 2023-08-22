import { deleteSpecialties } from "src/helper-functions/account-details/save/save-doctor-account-details"

export const deleteSpecialty = async (
  specialty: SpecialtyItem,
  doctorSpecialties: SpecialtyItem[],
  setDoctorSpecialties: React.Dispatch<React.SetStateAction<SpecialtyItem[]>>,
  setSelectedOrganization: React.Dispatch<React.SetStateAction<string>>,
  setSpecialtiesConfirmation: (conf: ConfirmationMessage) => void
): Promise<void> => {
  const newDoctorSpecialties = doctorSpecialties.filter(s => s.specialties_listID !== specialty.specialties_listID)
  await deleteSpecialties(specialty.specialties_listID, newDoctorSpecialties,
    setDoctorSpecialties, setSelectedOrganization, setSpecialtiesConfirmation
  )
}

export default deleteSpecialty
