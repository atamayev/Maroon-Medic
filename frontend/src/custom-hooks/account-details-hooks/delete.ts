import { deletePatientLanguages } from "./save-patient-account-details"
import { deleteDoctorLanguages, deleteSpecialties } from "./save-doctor-account-details"

export const handleDeleteLanguage = async (
  language: LanguageItem,
  spokenLanguages: LanguageItem[],
  setSpokenLanguages: React.Dispatch<React.SetStateAction<LanguageItem[]>>,
  setLanguagesConfirmation: (conf: ConfirmationMessage) => void,
  doctorOrPatient: doctorOrpatient
): Promise<void> => {
  const newSpokenLanguages = spokenLanguages.filter(l => l.language_listID !== language.language_listID)
  if (doctorOrPatient === "doctor") {
    await deleteDoctorLanguages(language.language_listID, newSpokenLanguages, setSpokenLanguages, setLanguagesConfirmation)
  }
  else {
    await deletePatientLanguages(language.language_listID, newSpokenLanguages, setSpokenLanguages, setLanguagesConfirmation)
  }
}

export const handleDeleteSpecialty = async (
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
