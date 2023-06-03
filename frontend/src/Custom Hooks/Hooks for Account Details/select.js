export const handleLanguageChange = (event, listDetails, setSelectedLanguage) => {
    try{
      const languageId = parseInt(event.target.value);
      if (languageId) {
        const language = listDetails[0].find(lang => lang.language_listID === languageId);
        setSelectedLanguage(language);
      } else {
        setSelectedLanguage(null);
      }
    }catch (error) {
    console.log('error in handle language change', error)
    }
};

// export const handleCategoryChange = (event, category, services, selectedCategories, setSelectedCategories, providedServices, setProvidedServices, expandedCategories, setExpandedCategories) => {
//   if (event.target.checked) {
//     setSelectedCategories([...selectedCategories, category]);
//     const newServices = services.filter(service => !providedServices.some(selectedService => selectedService.service_mapping_ID === service.service_and_category_listID));
//     setProvidedServices([...providedServices, ...newServices]);
//     if(!expandedCategories.includes(category)){
//       setExpandedCategories(prev => [...prev, category]);
//     }
//   } else {
//     setSelectedCategories(selectedCategories.filter(c => c !== category));
//     setProvidedServices(providedServices.filter(service => service.Category_name !== category));
//   }
// };

export const handleSelectSpecialty = (event, listDetails, setSelectedSpecialties) => {
    try{
      const specialtyId = parseInt(event.target.value);
      if (specialtyId) {
        const specialty = listDetails[2].find((item) => item.specialties_listID === parseInt(event.target.value));
        setSelectedSpecialties(specialty);
      } else {
        setSelectedSpecialties(null);
      }
    }catch (error) {
    console.log('error in handleSelectSpecialty', error)
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

export const handleTogglePetType = (pet_type, setExpandedPetTypes) => {
  setExpandedPetTypes(prevState => {
    if (prevState.includes(pet_type)) {
      return prevState.filter(pt => pt !== pet_type);
    } else {
      return [...prevState, pet_type];
    }
  });
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
