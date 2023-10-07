import { useContext } from "react"
import PrivateDoctorDataService from "../../../../services/private-doctor-data-service"
import handle401AxiosErrorAndSetMessageType from "src/utils/handle-errors/handle-401-axios-error-and-set-message-type"
import AppContext from "src/contexts/maroon-context"

export default function useDeleteAddressData() : (
	addressId: number,
	setAddressesConfirmation: (conf: ConfirmationMessage) => void
) => Promise<void> {
	const doctorAccountDetails = useContext(AppContext).privateDoctorData?.doctorAccountDetails

	return async (
		addressId: number,
		setAddressesConfirmation: (conf: ConfirmationMessage) => void
	): Promise<void> => {
		try {
			const response = await PrivateDoctorDataService.deleteAddressData(addressId)

			if (response.status === 200) {
				const newAddressData = doctorAccountDetails!.temporaryAddressData.filter(
					(addr: DoctorAddressData) => addr.addressesId !== addressId
				)

				doctorAccountDetails!.addressData = newAddressData
				doctorAccountDetails!.temporaryAddressData = newAddressData
				setAddressesConfirmation({messageType: "saved"})
			}
		} catch (error: unknown) {
			handle401AxiosErrorAndSetMessageType(error, setAddressesConfirmation)
		}
	}
}
