const handlePetChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  savedPetData: SavedPetItem[],
  setSelectedPet: React.Dispatch<React.SetStateAction<SavedPetItem | null>>,
  setSelectedService: React.Dispatch<React.SetStateAction<ServiceItem | null>>,
  setSelectedLocation: React.Dispatch<React.SetStateAction<PublicAddressData | null>>,
  setSelectedDay: React.Dispatch<React.SetStateAction<string | null>>,
  setSelectedTime: React.Dispatch<React.SetStateAction<string | null>>
): void => {
  const value = event.target.value
  const selectedPetObject = savedPetData.find(pet => pet.pet_infoID.toString() === value)
  setSelectedPet(selectedPetObject || null)
  if (value === "Select...") {
    setSelectedService(null)
    setSelectedLocation(null)
    setSelectedDay(null)
    setSelectedTime(null)
  }
}

export default handlePetChange
