import { savePatientLanguages } from "./save-patient-account-details";
import { saveDoctorLanguages, saveSpecialies } from "./save-doctor-account-details";

export const handleDeleteLanguage = (language, spokenLanguages, setSpokenLanguages, setLanguagesConfirmation, doctorOrPatient) => {
    const newSpokenLanguages = spokenLanguages.filter(l => l.language_listID !== language.language_listID);
    if (doctorOrPatient === 'doctor') saveDoctorLanguages(language.language_listID, newSpokenLanguages, setSpokenLanguages, setLanguagesConfirmation, 'delete');
    else if (doctorOrPatient === 'patient') savePatientLanguages(language.language_listID, newSpokenLanguages, setSpokenLanguages, setLanguagesConfirmation, 'delete')
};

export const handleDeleteSpecialty = (specialty, doctorSpecialties, setDoctorSpecialties, setSelectedOrganization, setSpecialtiesConfirmation) => {    
    const newDoctorSpecialties = doctorSpecialties.filter(s => s.specialties_listID !== specialty.specialties_listID);
    saveSpecialies(specialty.specialties_listID, newDoctorSpecialties, setDoctorSpecialties, setSelectedOrganization, setSpecialtiesConfirmation, 'delete');
};
