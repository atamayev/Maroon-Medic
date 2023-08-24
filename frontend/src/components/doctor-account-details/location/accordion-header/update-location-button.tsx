import _ from "lodash"
import Button from "src/components/button"
import { areAllFieldsValid, areAllTimesValid } from "src/utils/all-field-checks"
import updateLocation from "src/helper-functions/account-details/save/doctor-account-details/update-location"

interface Props {
  address: DoctorAddressData
  setAddresses: React.Dispatch<React.SetStateAction<DoctorAddressData[]>>
  setAddressesConfirmation: (conf: ConfirmationMessage) => void
}

const UpdateLocationButton = (props: Props) => {
	const {address, setAddresses, setAddressesConfirmation} = props

	const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails") ?? "{}")
	const originalAddress = DoctorAccountDetails.addressData.find((addr: DoctorAddressData) => addr.addressesID === address.addressesID)
	const isAddressSame = _.isEqual(originalAddress, address)
	if (isAddressSame) return null

	return (
		<Button
			className = "mr-3 float-right"
			colorClass = "bg-amber-600"
			hoverClass = "hover:bg-amber-700"
			title = "Update Location"
			onClick = {() => updateLocation(address, setAddresses, setAddressesConfirmation)}
			disabled = {!areAllFieldsValid(address) || !areAllTimesValid(address)}
		/>
	)
}

export default UpdateLocationButton
