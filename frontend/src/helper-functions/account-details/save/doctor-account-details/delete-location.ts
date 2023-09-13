import useDeleteAddressData from "../../../../custom-hooks/account-details/save/doctor-account-details-helpers/use-delete-address-data"

export default async function deleteLocation(
	address: number,
	setAddressesConfirmation: (conf: ConfirmationMessage) => void
): Promise<void> {
	return await useDeleteAddressData(address, setAddressesConfirmation)
}
