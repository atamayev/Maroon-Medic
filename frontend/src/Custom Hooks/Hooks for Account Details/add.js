import { isObjectInArray } from "../lists-and-object-checks";
import { saveLanguages } from "./DoctorAccountDetails/saveDoctorAccountDetails";

export const handleAddInsurance = (selectedInsurance, acceptedInsurances, setAcceptedInsurances) => {
  if(selectedInsurance){
    if(!acceptedInsurances.some(insurance => insurance.insurance_listID === selectedInsurance.insurance_listID)){
      setAcceptedInsurances([...acceptedInsurances, selectedInsurance]);
    }
  }
};

export const handleAddService = (selectedService, providedServices, setProvidedServices) => {
  if(selectedService){
    if(!providedServices.some(service => service.service_and_category_listID === selectedService.service_and_category_listID)){
      const updatedService = {...selectedService, Service_price: null, Service_time: null}
      setProvidedServices([...providedServices, updatedService]);
    }
  }
};

export const handleAddPet = (selectedPet, servicedPets, setServicedPets) => {
  if(selectedPet){
    if(!servicedPets.some(pet => pet.pet_listID === selectedPet.pet_listID)){
      const updatedPet = {...selectedPet}
      setServicedPets([...servicedPets, updatedPet]);
    }
  }
};

export const handleAddLanguage = (selectedLanguage, spokenLanguages) => {
  const newSpokenLanguages = [...spokenLanguages, selectedLanguage];
  return newSpokenLanguages;
};

export const handleAddSpecialty = (selectedSpecialty, doctorSpecialties) => {
  const newDoctorSpecialties = [...doctorSpecialties, selectedSpecialty];
  return newDoctorSpecialties;
};

export const handleAddPreVetEducation = (
  selectedPreVetSchool, 
  selectedMajor, 
  selectedPreVetEducationType, 
  preVetEducation, 
  setPreVetEducation, 
  setSelectedPreVetSchool, 
  setSelectedMajor, 
  setSelectedPreVetEducationType,
  timeState, 
  setTimeState
  ) => {
  if(!timeState.startMonth){
    timeState.startMonth = 'January'
  }
  if(!timeState.endMonth){
    timeState.endMonth = 'January'
  }
  const selectedEducationObj = {
    School_name: selectedPreVetSchool, 
    Education_type:selectedPreVetEducationType,
    Major_name: selectedMajor,
    Start_Date: `${timeState.startYear}-${timeState.startMonth}-1`,
    End_Date: `${timeState.endYear}-${timeState.endMonth}-1`,
  }
  setPreVetEducation([...preVetEducation, selectedEducationObj]);

  const currentYear = new Date().getFullYear();
  setSelectedPreVetSchool('');
  setSelectedMajor('');
  setSelectedPreVetEducationType('');
  setTimeState({
    startMonth: 'January', 
    endMonth: 'January', 
    startYear: currentYear, 
    endYear: currentYear,
  });
};

export const handleAddVetEducation = (
  selectedVetSchool, 
  setSelectedVetSchool, 
  selectedVetEducationType, 
  setSelectedVetEducationType,
  vetEducation, 
  setVetEducation, 
  timeState, 
  setTimeState
  ) => {
  if(!timeState.startMonth){
    timeState.startMonth = 'January'
  }
  if(!timeState.endMonth){
    timeState.endMonth = 'January'
  }
  const selectedEducationObj = {
    School_name: selectedVetSchool, 
    Education_type: selectedVetEducationType,
    Start_Date: `${timeState.startYear}-${timeState.startMonth}-1`,
    End_Date: `${timeState.endYear}-${timeState.endMonth}-1`,
  }
  setVetEducation([...vetEducation, selectedEducationObj]);
  
  const currentYear = new Date().getFullYear();
  setSelectedVetSchool('');
  setSelectedVetEducationType('');
  setTimeState({
    startMonth: 'January', 
    endMonth: 'January', 
    startYear: currentYear, 
    endYear: currentYear,
  });
};

export const handleAddAccordion = (addresses, setAddresses) => {
  let maxPriority = Math.max(...addresses.map(address => address.address_priority));
  if (maxPriority === -Infinity) maxPriority = 0;
  setAddresses([...addresses, { address_priority: maxPriority+1, addressesID: 0, address_title: '', address_line_1: '', address_line_2: '', city: '', state: '', zip: '', country: '', phone_priority: 0, phone: '', address_public_status: 1, instant_book: 0, times:[]}]);
};
