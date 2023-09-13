import { useCallback } from "react"
import addServicedPets from "src/helper-functions/account-details/save/doctor-account-details/add-serviced-pets"
import deleteServicedPets from "src/helper-functions/account-details/save/doctor-account-details/delete-serviced-pets"

export const usePetsCheckboxChange = (
	servicedPets: ServicedPetItem[],
	setPetsConfirmation: (conf: ConfirmationMessage) => void
): (e: React.ChangeEvent<HTMLInputElement>, pet: ServicedPetItem) => void => {
	return useCallback(
		async (event: React.ChangeEvent<HTMLInputElement>, pet: ServicedPetItem) => {
			if (event.target.checked) {
				const newServicedPets = [...servicedPets, pet]
				await addServicedPets(pet.petListId, newServicedPets, setPetsConfirmation)
			} else {
				const newServicedPets = servicedPets.filter(p => p.petListId !== pet.petListId)
				await deleteServicedPets(pet.petListId, newServicedPets, setPetsConfirmation)
			}
		}, [servicedPets])
}

export default usePetsCheckboxChange
