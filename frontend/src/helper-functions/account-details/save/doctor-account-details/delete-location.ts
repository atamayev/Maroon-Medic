import useDeleteAddressData from "../../../../custom-hooks/account-details/save/doctor-account-details-helpers/use-delete-address-data"

export default async function deleteLocation(
	address: number,
	setAddresses: React.Dispatch<React.SetStateAction<DoctorAddressData[]>>,
	setAddressesConfirmation: (conf: ConfirmationMessage) => void
): Promise<void> {
	return await useDeleteAddressData(address, setAddresses, setAddressesConfirmation)
}
