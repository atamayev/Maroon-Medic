import PrivateDoctorDataService from "../../../../services/private-doctor-data-service"
import handle401AxiosErrorAndSetMessageType from "src/utils/handle-errors/handle-401-axios-error-and-set-message-type"

export default async function deleteAddressData(
	addressID: number,
	setAddresses: React.Dispatch<React.SetStateAction<DoctorAddressData[]>>,
	setAddressesConfirmation: (conf: ConfirmationMessage) => void
): Promise<void> {
	const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails") ?? "{}")

	try {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const response = await PrivateDoctorDataService.deleteAddressData(addressID)

		if (response.status === 200) {
			const newAddressData = DoctorAccountDetails.addressData.filter(
				(addr: DoctorAddressData) => addr.addressesID !== addressID)

			DoctorAccountDetails.addressData = newAddressData
			setAddresses(newAddressData)
			sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(DoctorAccountDetails))
			setAddressesConfirmation({messageType: "saved"})
		}
	} catch (error: unknown) {
		handle401AxiosErrorAndSetMessageType(error, setAddressesConfirmation)
	}
}
