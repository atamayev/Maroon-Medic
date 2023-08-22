import { addSpecialties } from "src/helper-functions/account-details/save/save-doctor-account-details"

export const addSpecialty = async (
  selectedSpecialtyID: number,
  doctorSpecialties: SpecialtyItem[],
  setDoctorSpecialties: React.Dispatch<React.SetStateAction<SpecialtyItem[]>>,
  setSelectedOrganization: React.Dispatch<React.SetStateAction<string>>,
  listDetails: DoctorListDetails,
  setSpecialtiesConfirmation: (conf: ConfirmationMessage) => void
): Promise<void> => {
  const selectedSpecialty = listDetails.specialties.find((spec) => spec.specialties_listID === selectedSpecialtyID)
  if (selectedSpecialty) {
    const newDoctorSpecialties = [...doctorSpecialties, selectedSpecialty]
    await addSpecialties(
      selectedSpecialtyID,
      newDoctorSpecialties,
      setDoctorSpecialties,
      setSelectedOrganization,
      setSpecialtiesConfirmation
    )
  }
}

export default addSpecialty
