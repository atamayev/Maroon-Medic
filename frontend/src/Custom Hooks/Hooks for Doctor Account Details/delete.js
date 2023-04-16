import { isObjectsEqual } from "../lists-and-object-checks";

export const handleDeleteLanguage = (language, spokenLanguages, setSpokenLanguages) => {
    setSpokenLanguages(spokenLanguages.filter(l => l !== language));
};

export const handleDeleteSpecialty = (specialty, doctorSpecialties, setDoctorSpecialties) => {
    setDoctorSpecialties(doctorSpecialties.filter(s => s !== specialty));
};
  
export const handleDeleteInsurance = (insurance, acceptedInsurances, setAcceptedInsurances) => {
    setAcceptedInsurances(acceptedInsurances.filter(i => i !== insurance));
};

export const handleDeletePreVetEducation = (preVetEducationObject, preVetEducation, setPreVetEducation) => {
    setPreVetEducation(preVetEducation.filter(obj => !isObjectsEqual(obj, preVetEducationObject)));
};

export const handleDeleteVetEducation = (vetEducationObject, vetEducation, setVetEducation) => {
    setVetEducation(vetEducation.filter(obj => !isObjectsEqual(obj, vetEducationObject)));
};
