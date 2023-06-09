import { isObjectsEqual } from "../lists-and-object-checks";
import { saveLanguages, savePreVetSchool, saveSpecialies, saveVetSchool } from "./DoctorAccountDetails/saveDoctorAccountDetails";

export const handleDeleteInsurance = (insuranceToDelete, acceptedInsurances, setAcceptedInsurances) => {
    setAcceptedInsurances(acceptedInsurances.filter(insurance => insurance.insurance_listID !== insuranceToDelete.insurance_listID));
};

export const handleDeleteService = (serviceToDelete, selectedServices, setSelectedServices) => {
    setSelectedServices(selectedServices.filter(service => service.service_and_category_listID !== serviceToDelete.service_and_category_listID));
};

export const handleDeletePet = (petToDelete, selectedPets, setSelectedPets) => {
    setSelectedPets(selectedPets.filter(pet => pet.pet_listID !== petToDelete.pet_listID));
};

export const handleDeleteLanguage = (language, spokenLanguages, setSpokenLanguages, setSelectedLanguage, setLanguagesConfirmation) => {
    const newSpokenLanguages = spokenLanguages.filter(l => l !== language);
    setSpokenLanguages(newSpokenLanguages);
    saveLanguages(language.language_listID, newSpokenLanguages, setSelectedLanguage, setLanguagesConfirmation, 'delete');
};

export const handleDeleteSpecialty = (specialty, doctorSpecialties, setDoctorSpecialties, setSelectedSpecialties, setSelectedOrganization, setSpecialtiesConfirmation) => {    
    const newDoctorSpecialties = doctorSpecialties.filter(s => s !== specialty);
    setDoctorSpecialties(newDoctorSpecialties);
    saveSpecialies(specialty.specialties_listID, newDoctorSpecialties, setSelectedSpecialties, setSelectedOrganization, setSpecialtiesConfirmation, 'delete');
};

export const handleDeletePreVetEducation = (preVetEducationObject, preVetEducation, setPreVetEducation, listDetails, setPreVetEducationConfirmation) => {
    setPreVetEducation(preVetEducation.filter(obj => !isObjectsEqual(obj, preVetEducationObject)));
    savePreVetSchool(preVetEducationObject, preVetEducation, listDetails, setPreVetEducationConfirmation, 'delete')
};

export const handleDeleteVetEducation = (vetEducationObject, vetEducation, setVetEducation, listDetails, setVetEducationConfirmation) => {
    setVetEducation(vetEducation.filter(obj => !isObjectsEqual(obj, vetEducationObject)));
    saveVetSchool(vetEducationObject, listDetails, setVetEducationConfirmation, 'delete')
};

export const handleDeleteAccordion = (address_priority, addresses, setAddresses) => {
    setAddresses(addresses.filter(address => address.address_priority !== address_priority));
};
