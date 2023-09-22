import { useCallback } from "react"
import PrivateDoctorDataService from "src/services/private-doctor-data-service"
import useModifyServicedPets from "../save/doctor-account-details-helpers/use-modify-serviced-pets"
import _ from "lodash"

const usePetsCheckboxChange = (
	servicedPets: ServicedPetItem[] | undefined,
	setPetsConfirmation: (conf: ConfirmationMessage) => void
): (e: React.ChangeEvent<HTMLInputElement>, pet: ServicedPetItem) => void => {
	const modifyServicedPets = useModifyServicedPets()

	return useCallback(
		async (event: React.ChangeEvent<HTMLInputElement>, pet: ServicedPetItem) => {
			if (_.isUndefined(servicedPets)) return
			if (event.target.checked) {
				const newServicedPets = [...servicedPets, pet]
				await modifyServicedPets(
					PrivateDoctorDataService.addServicedPet,
					pet.petListId,
					newServicedPets,
					setPetsConfirmation
				)
			} else {
				const newServicedPets = servicedPets.filter(p => p.petListId !== pet.petListId)
				await modifyServicedPets(
					PrivateDoctorDataService.deleteServicedPet,
					pet.petListId,
					newServicedPets,
					setPetsConfirmation
				)
			}
		}, [servicedPets, modifyServicedPets])
}

export default usePetsCheckboxChange
