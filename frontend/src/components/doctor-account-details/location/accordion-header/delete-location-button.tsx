import { useContext, useState } from "react"
import Button from "src/components/button"
import { AppContext } from "src/contexts/maroon-context"
import deleteLocation from "src/helper-functions/account-details/save/doctor-account-details/delete-location"

interface Props {
	address: DoctorAddressData
	setAddressesConfirmation: (conf: ConfirmationMessage) => void
}

export default function DeleteLocationButton (props: Props) {
	const { address, setAddressesConfirmation } = props
	const { doctorAccountDetails } = useContext(AppContext)

	const [status, setStatus] = useState("initial" as DeleteStatuses)

	const handleDeleteAddress = () => {
		if (address.addressesId === -1) {
			doctorAccountDetails?.addressData.filter(addressf => addressf.addressPriority !== address.addressPriority)
		}
		else deleteLocation(address.addressesId, setAddressesConfirmation)
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
