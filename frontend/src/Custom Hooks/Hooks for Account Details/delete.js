import { isObjectsEqual } from "../lists-and-object-checks";
import { saveLanguages } from "./DoctorAccountDetails/saveDoctorAccountDetails";

export const handleDeleteInsurance = (insuranceToDelete, acceptedInsurances, setAcceptedInsurances) => {
    setAcceptedInsurances(acceptedInsurances.filter(insurance => insurance.insurance_listID !== insuranceToDelete.insurance_listID));
};

export const handleDeleteService = (serviceToDelete, selectedServices, setSelectedServices) => {
    setSelectedServices(selectedServices.filter(service => service.service_and_category_listID !== serviceToDelete.service_and_category_listID));
};

export const handleDeletePet = (petToDelete, selectedPets, setSelectedPets) => {
    setSelectedPets(selectedPets.filter(pet => pet.pet_listID !== petToDelete.pet_listID));
};

export const handleDeleteLanguage = (language, spokenLanguages, setSpokenLanguages, setLanguagesConfirmation) => {
    setSpokenLanguages(spokenLanguages.filter(l => l !== language));
    saveLanguages(language.language_listID, spokenLanguages, setLanguagesConfirmation, 'delete');
};

export const handleDeleteSpecialty = (specialty, doctorSpecialties, setDoctorSpecialties) => {
    setDoctorSpecialties(doctorSpecialties.filter(s => s !== specialty));
};

export const handleDeletePreVetEducation = (preVetEducationObject, preVetEducation, setPreVetEducation) => {
    setPreVetEducation(preVetEducation.filter(obj => !isObjectsEqual(obj, preVetEducationObject)));
};

export const handleDeleteVetEducation = (vetEducationObject, vetEducation, setVetEducation) => {
    setVetEducation(vetEducation.filter(obj => !isObjectsEqual(obj, vetEducationObject)));
};

export const handleDeleteAccordion = (address_priority, addresses, setAddresses) => {
    setAddresses(addresses.filter(address => address.address_priority !== address_priority));
};
