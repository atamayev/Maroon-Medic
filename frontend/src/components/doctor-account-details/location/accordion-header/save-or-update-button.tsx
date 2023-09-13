import UpdateLocationButton from "./update-location-button"
import AddLocationButton from "./add-location-button"

interface Props {
  address: DoctorAddressData
  setAddressesConfirmation: (conf: ConfirmationMessage) => void
}

export default function SaveOrUpdateButton (props: Props) {
	const { address, setAddressesConfirmation } = props
	const nonExistantAddressesId = -1

	if (address.addressesId === nonExistantAddressesId) {
		return (
			<AddLocationButton
				address = {address}
				setAddressesConfirmation = {setAddressesConfirmation}
			/>
		)
	}

	return (
		<UpdateLocationButton
			address = {address}
			setAddressesConfirmation = {setAddressesConfirmation}
		/>
	)
}
