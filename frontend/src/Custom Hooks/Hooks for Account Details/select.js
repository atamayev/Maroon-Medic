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
