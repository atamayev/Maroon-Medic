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

export const handleAddPreVetEducation = (selectedPreVetSchool, selectedMajor, selectedPreVetEducationType, preVetEducation, setPreVetEducation, setSelectedPreVetSchool, setSelectedMajor, setSelectedPreVetEducationType) => {
  if(selectedPreVetSchool && selectedMajor && selectedPreVetEducationType){
    const selectedEducationObj = {
      School_name: selectedPreVetSchool, 
      Education_type:selectedPreVetEducationType,
      Major_name: selectedMajor
    }
    console.log(selectedEducationObj)
    if(preVetEducation.length >0){
      if(!isObjectInArray(selectedEducationObj, preVetEducation)){
        setPreVetEducation([...preVetEducation, {School_name: selectedPreVetSchool, Education_type: selectedPreVetEducationType, Major_name: selectedMajor}]);
      }

    }else{
      setPreVetEducation([{School_name: selectedPreVetSchool, Education_type: selectedPreVetEducationType, Major_name: selectedMajor}]);
    }
  }
  setSelectedPreVetSchool('');
  setSelectedMajor('');
  setSelectedPreVetEducationType('');
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
