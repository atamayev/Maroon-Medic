export const handleToggleCategory = (
  category: string,
  setExpandedCategories: React.Dispatch<React.SetStateAction<string[]>>
) => {
  setExpandedCategories(prevState => {
    if (prevState.includes(category)) {
      return prevState.filter(cat => cat !== category)
    } else {
      return [...prevState, category]
    }
  })
}

export const handleTogglePetType = (
  petType: string,
  setExpandedPetTypes: React.Dispatch<React.SetStateAction<string[]>>) => {
  setExpandedPetTypes(prevState => {
    if (prevState.includes(petType)) {
      return prevState.filter(pt => pt !== petType)
    } else {
      return [...prevState, petType]
    }
  })
}

export const handleSelectCarousel = (
  selectedIndex: number,
  setCarouselIndex: React.Dispatch<React.SetStateAction<number>>
) => {
  setCarouselIndex(selectedIndex)
  // from React Bootstrap
}
