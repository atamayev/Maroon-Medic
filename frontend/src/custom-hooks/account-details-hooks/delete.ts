import { deletePatientLanguages } from "./save-patient-account-details"
import { deleteDoctorLanguages, deleteSpecialties } from "./save-doctor-account-details"

export const handleDeleteLanguage = (
  language: LanguageItemType,
  spokenLanguages: LanguageItemType[],
  setSpokenLanguages: React.Dispatch<React.SetStateAction<LanguageItemType[]>>,
  setLanguagesConfirmation: (conf: ConfirmationMessage) => void,
  doctorOrPatient: doctorOrpatient
): void => {
  const newSpokenLanguages = spokenLanguages.filter(l => l.language_listID !== language.language_listID)
  if (doctorOrPatient === "doctor") {
    deleteDoctorLanguages(language.language_listID, newSpokenLanguages, setSpokenLanguages, setLanguagesConfirmation)
  }
  else if (doctorOrPatient === "patient") {
    deletePatientLanguages(language.language_listID, newSpokenLanguages, setSpokenLanguages, setLanguagesConfirmation)
  }
}

export const handleDeleteSpecialty = (
  specialty: SpecialtyItemType,
  doctorSpecialties: SpecialtyItemType[],
  setDoctorSpecialties: React.Dispatch<React.SetStateAction<SpecialtyItemType[]>>,
  setSelectedOrganization: React.Dispatch<React.SetStateAction<string>>,
  setSpecialtiesConfirmation: (conf: ConfirmationMessage) => void
): void => {
  const newDoctorSpecialties = doctorSpecialties.filter(s => s.specialties_listID !== specialty.specialties_listID)
  deleteSpecialties(specialty.specialties_listID, newDoctorSpecialties,
    setDoctorSpecialties, setSelectedOrganization, setSpecialtiesConfirmation
  )
}
