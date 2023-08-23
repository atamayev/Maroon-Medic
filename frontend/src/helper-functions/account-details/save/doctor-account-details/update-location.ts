import PrivateDoctorDataService from "src/services/private-doctor-data-service"
import modifyAddressData from "../doctor-account-details-helpers/modify-address-data"

export default async function updateLocation(
  address: DoctorAddressData,
  setAddresses: React.Dispatch<React.SetStateAction<DoctorAddressData[]>>,
  setAddressesConfirmation: (conf: ConfirmationMessage) => void
): Promise<void> {
  return await modifyAddressData(PrivateDoctorDataService.updateAddressData, address, setAddresses, setAddressesConfirmation)
}
