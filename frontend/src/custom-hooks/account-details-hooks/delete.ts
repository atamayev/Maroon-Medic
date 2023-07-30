import { deletePatientLanguages } from "./save-patient-account-details"
import { deleteDoctorLanguages, deleteSpecialties } from "./save-doctor-account-details"

export const handleDeleteLanguage = (language, spokenLanguages, setSpokenLanguages, setLanguagesConfirmation, doctorOrPatient) => {
  const newSpokenLanguages = spokenLanguages.filter(l => l.language_listID !== language.language_listID)
  if (doctorOrPatient === "doctor") {
    deleteDoctorLanguages(language.language_listID, newSpokenLanguages, setSpokenLanguages, setLanguagesConfirmation)
  }
  else if (doctorOrPatient === "patient") {
    deletePatientLanguages(language.language_listID, newSpokenLanguages, setSpokenLanguages, setLanguagesConfirmation)
  }
}

export const handleDeleteSpecialty = (specialty, doctorSpecialties, setDoctorSpecialties, setSpecialtiesConfirmation) => {
  const newDoctorSpecialties = doctorSpecialties.filter(s => s.specialties_listID !== specialty.specialties_listID)
  deleteSpecialties(specialty.specialties_listID, newDoctorSpecialties, setDoctorSpecialties, setSpecialtiesConfirmation)
}
