const togglePetType = (
  petType: string,
  setExpandedPetTypes: React.Dispatch<React.SetStateAction<string[]>>
): void => {
  setExpandedPetTypes(prevState => {
    if (prevState.includes(petType)) {
      return prevState.filter(pt => pt !== petType)
    } else {
      return [...prevState, petType]
    }
  })
}

export default togglePetType
