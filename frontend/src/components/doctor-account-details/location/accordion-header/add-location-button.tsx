import Button from "src/components/button"
import addLocation from "src/helper-functions/account-details/save/doctor-account-details/add-location"
import { areAllFieldsValid, areAllTimesValid } from "src/utils/all-field-checks"

interface Props {
  address: DoctorAddressData
  setAddresses: React.Dispatch<React.SetStateAction<DoctorAddressData[]>>
  setAddressesConfirmation: (conf: ConfirmationMessage) => void
}

const AddLocationButton = (props: Props) => {
	const {address, setAddresses, setAddressesConfirmation} = props

	return (
		<Button
			className = "mr-3"
			colorClass = "bg-green-600"
			hoverClass = "hover:bg-green-700"
			title = "Add Location"
			onClick = {() => addLocation(address, setAddresses, setAddressesConfirmation)}
			disabled = {!areAllFieldsValid(address) || !areAllTimesValid(address)}
			textColor = "text-white"
		/>
	)
}

export default AddLocationButton
