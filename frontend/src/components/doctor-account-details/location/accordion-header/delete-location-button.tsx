import { useState } from "react"
import Button from "src/components/button"
import deleteLocation from "src/helper-functions/account-details/save/doctor-account-details/delete-location"

interface Props {
	address: DoctorAddressData
	addresses: DoctorAddressData[]
	setAddresses: React.Dispatch<React.SetStateAction<DoctorAddressData[]>>
	setAddressesConfirmation: (conf: ConfirmationMessage) => void
}

export default function DeleteLocationButton (props: Props) {
	const { address, addresses, setAddresses, setAddressesConfirmation } = props
	const [status, setStatus] = useState("initial" as DeleteStatuses)

	const handleDeleteAddress = () => {
		if (address.addressesId === -1) setAddresses(addresses.filter(addressf => addressf.addressPriority !== address.addressPriority))
		else deleteLocation(address.addressesId, setAddresses, setAddressesConfirmation)
	}

	if (status !== "initial") {
		return (
			<>
				<Button
					className = "mx-3 font-normal"
					colorClass = "bg-amber-600"
					hoverClass = "hover:bg-amber-700"
					title = "Nevermind"
					onClick = {(e: React.MouseEvent) => {
						e.stopPropagation()
						setStatus("initial")
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
