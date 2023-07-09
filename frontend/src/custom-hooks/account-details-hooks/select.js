export const handleToggleCategory = (category, setExpandedCategories) => {
  setExpandedCategories(prevState => {
    if (prevState.includes(category)) {
      return prevState.filter(cat => cat !== category)
    } else {
      return [...prevState, category]
    }
  })
}

export const handleTogglePetType = (petType, setExpandedPetTypes) => {
  setExpandedPetTypes(prevState => {
    if (prevState.includes(petType)) {
      return prevState.filter(pt => pt !== petType)
    } else {
      return [...prevState, petType]
    }
  })
}

export const handleSelectCarousel = (selectedIndex, setCarouselIndex) => {
  setCarouselIndex(selectedIndex)
  // from React Bootstrap
}
