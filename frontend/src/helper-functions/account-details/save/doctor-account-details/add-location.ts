import PrivateDoctorDataService from "src/services/private-doctor-data-service"
import modifyAddressData from "../doctor-account-details-helpers/modify-address-data"

export default async function addLocation(
  address: DoctorAddressData,
  setAddresses: React.Dispatch<React.SetStateAction<DoctorAddressData[]>>,
  setAddressesConfirmation: (conf: ConfirmationMessage) => void
): Promise<void> {
  return await modifyAddressData(PrivateDoctorDataService.addAddressData, address, setAddresses, setAddressesConfirmation)
}
