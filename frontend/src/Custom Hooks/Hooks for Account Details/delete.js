import { saveDoctorLanguages, saveSpecialies } from "./DoctorAccountDetails/saveDoctorAccountDetails";
import { savePatientLanguages } from "./PatientAccountDetails/savePatientAccountDetails";

export const handleDeleteInsurance = (insuranceToDelete, acceptedInsurances, setAcceptedInsurances) => {
    setAcceptedInsurances(acceptedInsurances.filter(insurance => insurance.insurance_listID !== insuranceToDelete.insurance_listID));
};

export const handleDeleteService = (serviceToDelete, selectedServices, setSelectedServices) => {
    setSelectedServices(selectedServices.filter(service => service.service_and_category_listID !== serviceToDelete.service_and_category_listID));
};

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

export const handleDeleteAccordion = (address_priority, addresses, setAddresses) => {
    setAddresses(addresses.filter(address => address.address_priority !== address_priority));
};
