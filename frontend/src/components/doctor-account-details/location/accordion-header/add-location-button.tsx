import Button from "src/components/button"
import useModifyAddressData from "src/custom-hooks/account-details/save/doctor-account-details-helpers/use-modify-address-data"
import PrivateDoctorDataService from "src/services/private-doctor-data-service"
import { areAllFieldsValid, areAllTimesValid } from "src/utils/all-field-checks"

interface Props {
	address: DoctorAddressData
	setAddressesConfirmation: (conf: ConfirmationMessage) => void
}

export default function AddLocationButton (props: Props) {
	const { address, setAddressesConfirmation } = props

	const modifyAddressData = useModifyAddressData()

	return (
		<Button
			className = "mr-3"
			colorClass = "bg-green-600"
			hoverClass = "hover:bg-green-700"
			title = "Add Location"
			onClick = {(e: React.MouseEvent) => {
				e.stopPropagation()
				modifyAddressData(
					PrivateDoctorDataService.addAddressData,
					address,
					setAddressesConfirmation
				)
			}}
			disabled = {!areAllFieldsValid(address) || !areAllTimesValid(address)}
			textColor = "text-white"
		/>
	)
}
