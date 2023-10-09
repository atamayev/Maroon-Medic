import _ from "lodash"
import { useContext } from "react"
import PrivateDoctorDataService from "../../../../services/private-doctor-data-service"
import handle401AxiosErrorAndSetMessageType from "src/utils/handle-errors/handle-401-axios-error-and-set-message-type"
import AppContext from "src/contexts/maroon-context"

type AddressOperationsType = typeof PrivateDoctorDataService.updateAddressData |
                             typeof PrivateDoctorDataService.addAddressData

export default function useModifyAddressData() : (
	operation: AddressOperationsType,
	address: DoctorAddressData,
	setAddressesConfirmation: (conf: ConfirmationMessage) => void
) => Promise<void> {
	const doctorAccountDetails = useContext(AppContext).privateDoctorData?.doctorAccountDetails

	return async (
		operation: AddressOperationsType,
		address: DoctorAddressData,
		setAddressesConfirmation: (conf: ConfirmationMessage) => void
	): Promise<void> => {
		try {
			if (_.isNil(doctorAccountDetails)) return
			const { times, ...addressData } = address
			const response = await operation(addressData, times)

			if (response.status === 200) {

				if (operation === PrivateDoctorDataService.addAddressData && typeof response.data === "number") {
					const indexToUpdate = doctorAccountDetails.temporaryAddressData.findIndex(
						(addr) => addr.addressPriority === address.addressPriority
					)
					// eslint-disable-next-line max-depth
					if (indexToUpdate !== -1) {
						const updatedAddress = { ...doctorAccountDetails.temporaryAddressData[indexToUpdate] }

						updatedAddress.addressesId = response.data

						// Re-insert updated object back into the array
						doctorAccountDetails.temporaryAddressData[indexToUpdate] = updatedAddress
						doctorAccountDetails.addressData[indexToUpdate] = updatedAddress
					}

				} else if (operation === PrivateDoctorDataService.updateAddressData) {
					const newAddressData = doctorAccountDetails.temporaryAddressData.map(
						(addr: DoctorAddressData) => addr.addressesId === address.addressesId ? address : addr
					)
					doctorAccountDetails.temporaryAddressData = newAddressData
					doctorAccountDetails.addressData = newAddressData
				} else {
					throw new Error("Unknown operation")
				}

				setAddressesConfirmation({messageType: "saved"})
			}
		} catch (error: unknown) {
			handle401AxiosErrorAndSetMessageType(error, setAddressesConfirmation)
		}
	}
}
