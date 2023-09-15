import _ from "lodash"
import Button from "src/components/button"
import { areAllFieldsValid, areAllTimesValid } from "src/utils/all-field-checks"
import { useContext } from "react"
import { AppContext } from "src/contexts/maroon-context"
import useModifyAddressData from "src/custom-hooks/account-details/save/doctor-account-details-helpers/use-modify-address-data"
import PrivateDoctorDataService from "src/services/private-doctor-data-service"

interface Props {
	address: DoctorAddressData
	setAddressesConfirmation: (conf: ConfirmationMessage) => void
}

export default function UpdateLocationButton (props: Props) {
	const {address, setAddressesConfirmation} = props

	const { doctorAccountDetails} = useContext(AppContext)

	const originalAddress = doctorAccountDetails?.addressData.find(
		(addr: DoctorAddressData) => addr.addressesId === address.addressesId)
	const isAddressSame = _.isEqual(originalAddress, address)

	const modifyAddressData = useModifyAddressData()

	if (isAddressSame) return null

	return (
		<Button
			className = "mr-3 float-right"
			colorClass = "bg-amber-600"
			hoverClass = "hover:bg-amber-700"
			title = "Update Location"
			onClick = {(e: React. MouseEvent) => {
				e.stopPropagation()
				modifyAddressData(
					PrivateDoctorDataService.updateAddressData,
					address,
					setAddressesConfirmation
				)
			}}
			disabled = {!areAllFieldsValid(address) || !areAllTimesValid(address)}
			textColor = "text-white"
		/>
	)
}
