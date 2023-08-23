import PrivateDoctorDataService from "src/services/private-doctor-data-service"
import modifyServicedPets from "../doctor-account-details-helpers/modify-serviced-pets"

export default async function deleteServicedPets(
  petID: number,
  newServicedPets: ServicedPetItem[],
  setServicedPets: React.Dispatch<React.SetStateAction<ServicedPetItem[]>>,
  setPetsConfirmation: (conf: ConfirmationMessage) => void
): Promise<void> {
  return await modifyServicedPets(PrivateDoctorDataService.deleteServicedPet, petID, newServicedPets, setServicedPets, setPetsConfirmation)
}
