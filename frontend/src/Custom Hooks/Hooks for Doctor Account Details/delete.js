import { isObjectsEqual } from "../lists-and-object-checks";

export const handleDeleteLanguage = (language, spokenLanguages, setSpokenLanguages) => {
    setSpokenLanguages(spokenLanguages.filter(l => l !== language));
};

export const handleDeleteSpecialty = (specialty, doctorSpecialties, setDoctorSpecialties) => {
    setDoctorSpecialties(doctorSpecialties.filter(s => s !== specialty));
};
  
export const handleDeleteInsurance = (insuranceToDelete, acceptedInsurances, setAcceptedInsurances) => {
    setAcceptedInsurances(acceptedInsurances.filter(insurance => insurance.insurance_listID !== insuranceToDelete.insurance_listID));
};

export const handleDeletePreVetEducation = (preVetEducationObject, preVetEducation, setPreVetEducation) => {
    setPreVetEducation(preVetEducation.filter(obj => !isObjectsEqual(obj, preVetEducationObject)));
};

export const handleDeleteVetEducation = (vetEducationObject, vetEducation, setVetEducation) => {
    setVetEducation(vetEducation.filter(obj => !isObjectsEqual(obj, vetEducationObject)));
};

export const handleDeleteAccordion = (id, addresses, setAddresses) => {
    setAddresses(addresses.filter(address => address.id !== id));
};
