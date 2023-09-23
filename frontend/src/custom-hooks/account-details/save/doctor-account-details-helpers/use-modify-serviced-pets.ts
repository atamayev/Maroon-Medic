import { useContext } from "react"
import PrivateDoctorDataService from "../../../../services/private-doctor-data-service"
import handle401AxiosErrorAndSetMessageType from "src/utils/handle-errors/handle-401-axios-error-and-set-message-type"
import { AppContext } from "src/contexts/maroon-context"

type ServicedPetsOperationsType = typeof PrivateDoctorDataService.deleteServicedPet |
                                  typeof PrivateDoctorDataService.addServicedPet

export default function useModifyServicedPets() : (
	operation: ServicedPetsOperationsType,
	petId: number,
	newServicedPets: ServicedPetItem[],
	setPetsConfirmation: (conf: ConfirmationMessage) => void
) => Promise<void> {
	const { doctorAccountDetails } = useContext(AppContext)

	return async (
		operation: ServicedPetsOperationsType,
		petId: number,
		newServicedPets: ServicedPetItem[],
		setPetsConfirmation: (conf: ConfirmationMessage) => void
	): Promise<void> => {
		let response
		try {
			response = await operation(petId)
		} catch (error: unknown) {
			handle401AxiosErrorAndSetMessageType(error, setPetsConfirmation)
			return
		}
		if (response.status === 200) {
			doctorAccountDetails!.servicedPets = newServicedPets
			setPetsConfirmation({messageType: "saved"})
		} else {
			setPetsConfirmation({messageType: "problem"})
			return
		}
	}
}
