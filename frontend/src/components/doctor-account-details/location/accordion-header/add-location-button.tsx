import Button from "src/components/button"
import addLocation from "src/helper-functions/account-details/save/doctor-account-details/add-location"
import { areAllFieldsValid, areAllTimesValid } from "src/utils/all-field-checks"

interface Props {
	address: DoctorAddressData
	setAddressesConfirmation: (conf: ConfirmationMessage) => void
}

export default function AddLocationButton (props: Props) {
	const {address, setAddressesConfirmation} = props

	return (
		<Button
			className = "mr-3"
			colorClass = "bg-green-600"
			hoverClass = "hover:bg-green-700"
			title = "Add Location"
			onClick = {(e: React.MouseEvent) => {
				e.stopPropagation()
				addLocation(address, setAddressesConfirmation)
			}}
			disabled = {!areAllFieldsValid(address) || !areAllTimesValid(address)}
			textColor = "text-white"
		/>
	)
}
