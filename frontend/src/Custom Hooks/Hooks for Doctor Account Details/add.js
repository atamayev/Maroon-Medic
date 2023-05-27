import { isObjectInArray } from "../lists-and-object-checks";

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

export const handleAddLanguage = (selectedLanguage, spokenLanguages, setSpokenLanguages, setSelectedLanguage) => {
    if(selectedLanguage){
      if(spokenLanguages.length >0){
        if(!spokenLanguages.includes(selectedLanguage)){
          setSpokenLanguages([...spokenLanguages, selectedLanguage]);
        }
      }else{
        setSpokenLanguages([selectedLanguage]);
      }
    }
    setSelectedLanguage('');
};

export const handleAddSpecialty = (selectedSpecialty, doctorSpecialties, setDoctorSpecialties, setSelectedSpecialties) => {
  if(selectedSpecialty){
    if(doctorSpecialties.length >0){
      if(!doctorSpecialties.includes(selectedSpecialty)){
        setDoctorSpecialties([...doctorSpecialties, selectedSpecialty]);
      }
    }else{
      setDoctorSpecialties([selectedSpecialty]);
    }
  }
  setSelectedSpecialties('');
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
      console.log('timeState',timeState)
  if(selectedPreVetSchool && selectedMajor && selectedPreVetEducationType){
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
    if(preVetEducation.length >0){
      if(!isObjectInArray(selectedEducationObj, preVetEducation)){
        setPreVetEducation([...preVetEducation, selectedEducationObj]);
      }
    }else{
      setPreVetEducation([selectedEducationObj]);
    }
  }
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
  if(selectedVetSchool && selectedVetEducationType){
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
    if(vetEducation.length >0){
      if(!isObjectInArray(selectedEducationObj, vetEducation)){
        setVetEducation([...vetEducation, selectedEducationObj]);
      }
    }else{
      setVetEducation([selectedEducationObj]);
    }
  }
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
  setAddresses([...addresses, { address_priority: addresses.length+1, addressesID: 0, address_title: '', address_line_1: '', address_line_2: '', city: '', state: '', zip: '', country: '', phone_priority: 0, phone: '', address_public_status: 1, times:[]}]);
};
