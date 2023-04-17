
export const handleLanguageChange = (event, listDetails, setSelectedLanguage) => {
    try{
      const languageId = parseInt(event.target.value);
      if (languageId) {
        const language = listDetails[1].find(lang => lang.language_listID === languageId);
        setSelectedLanguage(language);
      } else {
        setSelectedLanguage(null);
      }
    }catch (error) {
    console.log('error in handle language change', error)
    }
};

export const handleSelectSpecialty = (event, listDetails, setSelectedSpecialties) => {
    try{
      const specialtyId = parseInt(event.target.value);
      if (specialtyId) {
        const specialty = listDetails[3].find((item) => item.specialties_listID === parseInt(event.target.value));
        setSelectedSpecialties(specialty);
      } else {
        setSelectedSpecialties(null);
      }
    }catch (error) {
    console.log('error in handleSelectSpecialty', error)
  }
};

export const handleInsuranceChange = (event, listDetails, setSelectedInsurance) => {
    try {
      const insuranceId = parseInt(event.target.value);
      if (insuranceId) {
        const insurance = listDetails[0].find(ins => ins.insurance_listID === insuranceId);
        setSelectedInsurance(insurance);
      } else {
        setSelectedInsurance(null);
      }
    } catch (error) {
      console.log('error in handle insurance change', error)
    }
};

export const handleDescriptionChange = (event, setDescription, setIsDescriptionOverLimit) =>{
  const value = event.target.value;
  setDescription({Description: value});
  setIsDescriptionOverLimit(value.length >= 1000);// if description length is over 1000, makes counter red.
};

export const handlePreVetSchoolChange = (event, listDetails, setSelectedPreVetSchool) => {
  try {
    const schoolID = parseInt(event.target.value);
    if (schoolID) {
      const school = listDetails[4].find(sch => sch.pre_vet_school_listID === schoolID);
      setSelectedPreVetSchool(school);
    } else {
      setSelectedPreVetSchool(null);
    }
  } catch (error) {
    console.log('error in handle prevetschool change', error)
  }
};

export const handlePreVetMajorChange = (event, listDetails, setSelectedMajor) => {
  try {
    const majorID = parseInt(event.target.value);
    if (majorID) {
      const major = listDetails[6].find(maj => maj.major_listID === majorID);
      setSelectedMajor(major);
    } else {
      setSelectedMajor(null);
    }
  } catch (error) {
    console.log('error in handle handlePreVetMajorChange', error)
  }
};
  
export const handlePreVetEducationTypeChange = (event, listDetails, setSelectedPreVetEducationType, setSelectedPreVetSchool) => {
  try {
    const educationTypeID = parseInt(event.target.value);
    if (educationTypeID) {
      const educationType = listDetails[5].find(type => type.pre_vet_education_typeID === educationTypeID);
      setSelectedPreVetEducationType(educationType);
    } else {
      setSelectedPreVetSchool(null);
    }
  } catch (error) {
    console.log('error in handlePreVetEducationTypeChange', error)
  }
};

export const handleVetSchoolChange = (event, listDetails, setSelectedVetSchool) => {
  try {
    const schoolID = parseInt(event.target.value);
    if (schoolID) {
      const school = listDetails[5].find(sch => sch.vet_school_listID === schoolID);
      setSelectedVetSchool(school);
    } else {
      setSelectedVetSchool(null);
    }
  } catch (error) {
    console.log('error in handle vetschool change', error)
  }
};


export const handleSelectCarousel = (selectedIndex, setCarouselIndex) => {
  setCarouselIndex(selectedIndex);
  // from React Bootstrap
};
