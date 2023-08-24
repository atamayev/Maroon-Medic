import PrivateDoctorDataService from "../../../../services/private-doctor-data-service"
import handle401AxiosErrorAndSetMessageType from "src/utils/handle-errors/handle-401-axios-error-and-set-message-type"

type AddressOperationsType = typeof PrivateDoctorDataService.updateAddressData |
                             typeof PrivateDoctorDataService.addAddressData

export default async function modifyAddressData(
	operation: AddressOperationsType,
	address: DoctorAddressData,
	setAddresses: React.Dispatch<React.SetStateAction<DoctorAddressData[]>>,
	setAddressesConfirmation: (conf: ConfirmationMessage) => void
): Promise<void> {
	const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails") ?? "{}")

	try {
		const { times, ...addressData } = address
		const response = await operation(addressData, times)

		if (response.status === 200) {
			let newAddressData

			if (operation === PrivateDoctorDataService.addAddressData) {
				address.addressesID = response.data
				newAddressData = [...DoctorAccountDetails.addressData, address]
			} else if (operation === PrivateDoctorDataService.updateAddressData) {
				newAddressData = DoctorAccountDetails.addressData.map(
					(addr: DoctorAddressData) => addr.addressesID === address.addressesID ? address : addr)
			} else {
				throw new Error("Unknown operation")
			}

			DoctorAccountDetails.addressData = newAddressData
			setAddresses(newAddressData)
			sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(DoctorAccountDetails))
			setAddressesConfirmation({messageType: "saved"})
		}
	} catch (error: unknown) {
		handle401AxiosErrorAndSetMessageType(error, setAddressesConfirmation)
	}
}
