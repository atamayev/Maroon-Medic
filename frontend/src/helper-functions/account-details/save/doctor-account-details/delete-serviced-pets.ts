import PrivateDoctorDataService from "src/services/private-doctor-data-service"
import useModifyServicedPets from "../../../../custom-hooks/account-details/save/doctor-account-details-helpers/use-modify-serviced-pets"

export default async function deleteServicedPets(
	petId: number,
	newServicedPets: ServicedPetItem[],
	setServicedPets: React.Dispatch<React.SetStateAction<ServicedPetItem[]>>,
	setPetsConfirmation: (conf: ConfirmationMessage) => void
): Promise<void> {
	return await useModifyServicedPets(
		PrivateDoctorDataService.deleteServicedPet,
		petId,
		newServicedPets,
		setServicedPets,
		setPetsConfirmation
	)
}
