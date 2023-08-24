import deleteAddressData from "../doctor-account-details-helpers/delete-address-data"

export default async function deleteLocation(
	address: number,
	setAddresses: React.Dispatch<React.SetStateAction<DoctorAddressData[]>>,
	setAddressesConfirmation: (conf: ConfirmationMessage) => void
): Promise<void> {
	//Consider adding another modifyAddressData
	return await deleteAddressData(address, setAddresses, setAddressesConfirmation)
}
