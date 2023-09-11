import _ from "lodash"
import Button from "src/components/button"
import { areAllFieldsValid, areAllTimesValid } from "src/utils/all-field-checks"
import updateLocation from "src/helper-functions/account-details/save/doctor-account-details/update-location"
import { useContext } from "react"
import { AppContext } from "src/contexts/maroon-context"

interface Props {
	address: DoctorAddressData
	setAddresses: React.Dispatch<React.SetStateAction<DoctorAddressData[]>>
	setAddressesConfirmation: (conf: ConfirmationMessage) => void
}

export default function UpdateLocationButton (props: Props) {
	const {address, setAddresses, setAddressesConfirmation} = props

	const { doctorAccountDetails} = useContext(AppContext)

	const originalAddress = doctorAccountDetails?.addressData.find(
		(addr: DoctorAddressData) => addr.addressesId === address.addressesId)
	const isAddressSame = _.isEqual(originalAddress, address)

	if (isAddressSame) return null

	return (
		<Button
			className = "mr-3 float-right"
			colorClass = "bg-amber-600"
			hoverClass = "hover:bg-amber-700"
			title = "Update Location"
			onClick = {(e: React. MouseEvent) => {
				e.stopPropagation()
				updateLocation(address, setAddresses, setAddressesConfirmation)
			}}
			disabled = {!areAllFieldsValid(address) || !areAllTimesValid(address)}
			textColor = "text-white"
		/>
	)
}
