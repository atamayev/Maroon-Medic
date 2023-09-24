import _ from "lodash"
import { observer } from "mobx-react"
import { useContext, useState } from "react"
import Button from "src/components/button"
import AppContext from "src/contexts/maroon-context"
import useDeleteAddressData from "src/custom-hooks/account-details/save/doctor-account-details-helpers/use-delete-address-data"

interface Props {
	address: DoctorAddressData
	setAddressesConfirmation: (conf: ConfirmationMessage) => void
}

function DeleteLocationButton (props: Props) {
	const { address, setAddressesConfirmation } = props
	const doctorAccountDetails = useContext(AppContext).privateDoctorData?.doctorAccountDetails

	const [status, setStatus] = useState<DeleteStatuses>(undefined)
	const deleteAddressData = useDeleteAddressData()

	const handleDeleteAddress = () => {
		if (_.isNil(doctorAccountDetails)) return
		if (address.addressesId === -1) {
			_.filter(doctorAccountDetails.addressData, a => a.addressPriority !== address.addressPriority)
		}
		else deleteAddressData(address.addressesId, setAddressesConfirmation)
	}

	if (!_.isUndefined(status)) {
		return (
			<>
				<Button
					className = "mx-3 font-normal"
					colorClass = "bg-amber-600"
					hoverClass = "hover:bg-amber-700"
					title = "Nevermind"
					onClick = {(e: React.MouseEvent) => {
						e.stopPropagation()
						setStatus(undefined)
					}}
					textColor = "text-white"
				/>
				<Button
					className = "mr-3 float-right"
					colorClass = "bg-red-600"
					hoverClass = "hover:bg-red-700"
					title = "Confirm Delete"
					onClick = {(e: React.MouseEvent) => {
						e.stopPropagation()
						handleDeleteAddress()
					}}
					textColor = "text-white"
				/>
			</>
		)
	}

	return (
		<Button
			className = "mr-3 float-right"
			colorClass = "bg-red-600"
			hoverClass = "hover:bg-red-700"
			title = "Delete Location"
			onClick = {(e: React.MouseEvent) => {
				e.stopPropagation()
				setStatus("deleting")
			}}
			textColor = "text-white"
		/>
	)
}

export default observer(DeleteLocationButton)
