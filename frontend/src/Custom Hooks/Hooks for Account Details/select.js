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

export const handleSelectCarousel = (selectedIndex, setCarouselIndex) => {
  setCarouselIndex(selectedIndex);
  // from React Bootstrap
};
