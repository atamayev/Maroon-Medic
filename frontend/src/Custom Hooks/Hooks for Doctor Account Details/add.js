import { isObjectInArray } from "../lists-and-object-checks";

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

export const handleAddInsurance = (selectedInsurance, acceptedInsurances, setAcceptedInsurances) => {
  if(selectedInsurance){
    if(!acceptedInsurances.some(insurance => insurance.insurance_listID === selectedInsurance.insurance_listID)){
      setAcceptedInsurances([...acceptedInsurances, selectedInsurance]);
    }
  }
};

export const handleAddAccordion = (addresses, setAddresses) => {
  setAddresses([...addresses, { address_priority: addresses.length, addresses_ID: 0, address_title: '', address_line_1: '', address_line_2: '', city: '', state: '', zip: '', country: '', phone: ''}]);
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
    startMonth,
    setStartMonth, 
    endMonth,
    setEndMonth,
    startYear,
    setStartYear, 
    endYear,
    setEndYear
    ) => {
  if(selectedPreVetSchool && selectedMajor && selectedPreVetEducationType){
    if(!startMonth){
      startMonth = 'January'
    }
    if(!endMonth){
      endMonth = 'January'
    }
    const selectedEducationObj = {
      School_name: selectedPreVetSchool, 
      Education_type:selectedPreVetEducationType,
      Major_name: selectedMajor,
      Start_Date: `${startYear}-${startMonth}-1`,
      End_Date: `${endYear}-${endMonth}-1`,
    }
    if(preVetEducation.length >0){
      if(!isObjectInArray(selectedEducationObj, preVetEducation)){
        setPreVetEducation([...preVetEducation, selectedEducationObj]);
      }
    }else{
      setPreVetEducation([selectedEducationObj]);
    }
  }
  setSelectedPreVetSchool('');
  setSelectedMajor('');
  setSelectedPreVetEducationType('');
  setStartMonth('January')
  setEndMonth('January')
  setStartYear(1923)
  setEndYear(1923)
};

export const handleAddVetEducation = (
    selectedVetSchool, 
    setSelectedVetSchool, 
    selectedVetEducationType, 
    setSelectedVetEducationType,
    vetEducation, 
    setVetEducation, 
    startMonth,
    setStartMonth, 
    endMonth,
    setEndMonth,
    startYear,
    setStartYear, 
    endYear,
    setEndYear
    ) => {
  if(selectedVetSchool && selectedVetEducationType){
    if(!startMonth){
      startMonth = 'January'
    }
    if(!endMonth){
      endMonth = 'January'
    }
    const selectedEducationObj = {
      School_name: selectedVetSchool, 
      Education_type: selectedVetEducationType,
      Start_Date: `${startYear}-${startMonth}-1`,
      End_Date: `${endYear}-${endMonth}-1`,
    }
    if(vetEducation.length >0){
      if(!isObjectInArray(selectedEducationObj, vetEducation)){
        setVetEducation([...vetEducation, selectedEducationObj]);
      }
    }else{
      setVetEducation([selectedEducationObj]);
    }
  }
  setSelectedVetSchool('');
  setSelectedVetEducationType('');
  setStartMonth('January')
  setEndMonth('January')
  setStartYear(1923)
  setEndYear(1923)
};
