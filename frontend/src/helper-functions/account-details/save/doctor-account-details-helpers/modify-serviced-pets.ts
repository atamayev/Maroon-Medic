import PrivateDoctorDataService from "../../../../services/private-doctor-data-service"
import handle401AxiosErrorAndSetMessageType from "src/utils/handle-errors/handle-401-axios-error-and-set-message-type"

type ServicedPetsOperationsType = typeof PrivateDoctorDataService.deleteServicedPet |
                                   typeof PrivateDoctorDataService.addServicedPet

export default async function modifyServicedPets(
	operation: ServicedPetsOperationsType,
	petId: number,
	newServicedPets: ServicedPetItem[],
	setServicedPets: React.Dispatch<React.SetStateAction<ServicedPetItem[]>>,
	setPetsConfirmation: (conf: ConfirmationMessage) => void
): Promise<void> {
	let response
	try {
		response = await operation(petId)
	} catch (error: unknown) {
		handle401AxiosErrorAndSetMessageType(error, setPetsConfirmation)
		return
	}
	if (response.status === 200) {
		setServicedPets(newServicedPets)
		const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails") ?? "{}")
		DoctorAccountDetails.servicedPets = newServicedPets
		sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(DoctorAccountDetails))
		setPetsConfirmation({messageType: "saved"})
	} else {
		setPetsConfirmation({messageType: "problem"})
		return
	}
}
