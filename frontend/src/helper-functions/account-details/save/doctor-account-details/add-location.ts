import PrivateDoctorDataService from "src/services/private-doctor-data-service"
import useModifyAddressData from "../../../../custom-hooks/account-details/save/doctor-account-details-helpers/use-modify-address-data"

export default async function addLocation(
	address: DoctorAddressData,
	setAddresses: React.Dispatch<React.SetStateAction<DoctorAddressData[]>>,
	setAddressesConfirmation: (conf: ConfirmationMessage) => void
): Promise<void> {
	return await useModifyAddressData(
		PrivateDoctorDataService.addAddressData,
		address,
		setAddresses,
		setAddressesConfirmation
	)
}
