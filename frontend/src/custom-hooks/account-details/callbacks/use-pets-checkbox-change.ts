import { useCallback } from "react"
import addServicedPets from "src/helper-functions/account-details/save/doctor-account-details/add-serviced-pets"
import deleteServicedPets from "src/helper-functions/account-details/save/doctor-account-details/delete-serviced-pets"

export const usePetsCheckboxChange = (
  servicedPets: ServicedPetItem[],
  setServicedPets: React.Dispatch<React.SetStateAction<ServicedPetItem[]>>,
  setPetsConfirmation: (conf: ConfirmationMessage) => void
): (e: React.ChangeEvent<HTMLInputElement>, pet: ServicedPetItem) => void => {
  return useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>, pet: ServicedPetItem) => {
      if (event.target.checked) {
        const newServicedPets = [...servicedPets, pet]
        setServicedPets(newServicedPets)
        await addServicedPets(pet.pet_listID, newServicedPets, setServicedPets, setPetsConfirmation)
      } else {
        const newServicedPets = servicedPets.filter(p => p.pet_listID !== pet.pet_listID)
        setServicedPets(newServicedPets)
        await deleteServicedPets(pet.pet_listID, newServicedPets, setServicedPets, setPetsConfirmation)
      }
    }, [servicedPets, setServicedPets, setPetsConfirmation])
}

export default usePetsCheckboxChange
