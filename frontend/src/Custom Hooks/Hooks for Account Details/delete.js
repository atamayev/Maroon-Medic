import { saveDoctorLanguages, saveSpecialies } from "./DoctorAccountDetails/saveDoctorAccountDetails";
import { savePatientLanguages } from "./PatientAccountDetails/savePatientAccountDetails";

export const handleDeleteLanguage = (language, spokenLanguages, setSpokenLanguages, setLanguagesConfirmation, doctorOrPatient) => {
    const newSpokenLanguages = spokenLanguages.filter(l => l !== language);
    setSpokenLanguages(newSpokenLanguages);
    if (doctorOrPatient === 'doctor') saveDoctorLanguages(language.language_listID, newSpokenLanguages, setLanguagesConfirmation, 'delete');
    else if (doctorOrPatient === 'patient') savePatientLanguages(language.language_listID, newSpokenLanguages, setLanguagesConfirmation, 'delete')
};

export const handleDeleteSpecialty = (specialty, doctorSpecialties, setDoctorSpecialties, setSelectedOrganization, setSpecialtiesConfirmation) => {    
    const newDoctorSpecialties = doctorSpecialties.filter(s => s !== specialty);
    setDoctorSpecialties(newDoctorSpecialties);
    saveSpecialies(specialty.specialties_listID, newDoctorSpecialties, setSelectedOrganization, setSpecialtiesConfirmation, 'delete');
};
