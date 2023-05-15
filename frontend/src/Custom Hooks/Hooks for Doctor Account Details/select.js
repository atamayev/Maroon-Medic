
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

export const handleSelectCarousel = (selectedIndex, setCarouselIndex) => {
  setCarouselIndex(selectedIndex);
  // from React Bootstrap
};

export const handleCategoryChange = (event, category, services, selectedCategories, setSelectedCategories, selectedServices, setSelectedServices, expandedCategories, setExpandedCategories) => {
  if (event.target.checked) {
    setSelectedCategories([...selectedCategories, category]);
    const newServices = services.filter(service => !selectedServices.some(selectedService => selectedService.service_and_category_listID === service.service_and_category_listID));
    setSelectedServices([...selectedServices, ...newServices]);
    if(!expandedCategories.includes(category)){
      setExpandedCategories(prev => [...prev, category]);
    }
  } else {
    setSelectedCategories(selectedCategories.filter(c => c !== category));
    setSelectedServices(selectedServices.filter(service => service.Category_name !== category));
  }
};

export const handleServiceChange = (event, service, selectedServices, setSelectedServices) => {
  if (event.target.checked) {
    setSelectedServices([...selectedServices, service]);
  } else {
    setSelectedServices(selectedServices.filter(s => s.service_and_category_listID !== service.service_and_category_listID));
  }
};

export const handleToggleCategory = (category, setExpandedCategories) => {
  setExpandedCategories(prevState => {
    if (prevState.includes(category)) {
      return prevState.filter(cat => cat !== category);
    } else {
      return [...prevState, category];
    }
  });
};
