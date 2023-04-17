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
    console.log(selectedSpecialty)
    if(doctorSpecialties.length >0){
      if(!doctorSpecialties.includes(selectedSpecialty)){
        setDoctorSpecialties([...doctorSpecialties, selectedSpecialty]);
        console.log(doctorSpecialties)
      }
    }else{
      setDoctorSpecialties([selectedSpecialty]);
    }
  }
  setSelectedSpecialties('');
};

export const handleAddInsurance = (selectedInsurance, acceptedInsurances, setAcceptedInsurances, setSelectedInsurance) => {
    if(selectedInsurance){
      if(acceptedInsurances.length >0){
        if(!acceptedInsurances.includes(selectedInsurance)){
          setAcceptedInsurances([...acceptedInsurances, selectedInsurance]);
        }
      }else{
        setAcceptedInsurances([selectedInsurance]);
      }
    }
    setSelectedInsurance('');
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
    console.log(selectedEducationObj)
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

export const handleAddVetEducation = (selectedVetSchool, selectedVetEducationType, vetEducation, setVetEducation, setSelectedVetSchool, setSelectedVetEducationType) => {
  if(selectedVetSchool && selectedVetEducationType){
    const selectedEducationObj = {
      School_name: selectedVetSchool, 
      Education_type: selectedVetEducationType,
    }
    if(vetEducation.length >0){
      if(!isObjectInArray(selectedEducationObj, vetEducation)){
        setVetEducation([...vetEducation, {School_name: selectedVetSchool, Education_type: selectedVetEducationType}]);
      }
    }else{
      setVetEducation([{School_name: selectedVetSchool, Education_type: selectedVetEducationType}]);
    }
  }
  setSelectedVetSchool('');
  setSelectedVetEducationType('');
};
