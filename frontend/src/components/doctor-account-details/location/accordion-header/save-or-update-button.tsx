import UpdateLocationButton from "./update-location-button"
import AddLocationButton from "./add-location-button"

interface Props {
  address: DoctorAddressData
  setAddresses: React.Dispatch<React.SetStateAction<DoctorAddressData[]>>
  setAddressesConfirmation: (conf: ConfirmationMessage) => void
}

export default function SaveOrUpdateButton (props: Props) {
	const { address, setAddresses, setAddressesConfirmation } = props
	const nonExistantAddressesId = -1

	if (address.addressesId === nonExistantAddressesId) {
		return (
			<AddLocationButton
				address = {address}
				setAddresses = {setAddresses}
				setAddressesConfirmation = {setAddressesConfirmation}
			/>
		)
	}

	return (
		<UpdateLocationButton
			address = {address}
			setAddresses = {setAddresses}
			setAddressesConfirmation = {setAddressesConfirmation}
		/>
	)
}
