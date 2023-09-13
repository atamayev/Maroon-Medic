import PublicStatus from "./public-status"
import InstantBook from "./instant-book"
import SaveOrUpdateButton from "./save-or-update-button"
import DeleteLocationButton from "./delete-location-button"
import AddressTitle from "./address-title"
import { useContext } from "react"
import { AppContext } from "src/contexts/maroon-context"

interface Props {
	index: number
	address: DoctorAddressData
	setAddressesConfirmation: (conf: ConfirmationMessage) => void
	toggleOpen: () => void
}

export default function AccordionHeader (props: Props) {
	const { index, address, setAddressesConfirmation, toggleOpen } = props
	const { doctorAccountDetails } = useContext(AppContext)

	const handleToggleChange = (
		addressPriority: number,
		field: keyof Pick<DoctorAddressData, "addressPublicStatus" | "instantBook">
	) => {
		// Create a copy of the addresses state
		const updatedAddresses = [...doctorAccountDetails!.addressData]
		// Find the index of the address object with the matching priority
		const addressIndex = updatedAddresses.findIndex(addr => addr.addressPriority === addressPriority)

		if (field in updatedAddresses[addressIndex]) {
			updatedAddresses[addressIndex][field] = !updatedAddresses[addressIndex][field]
		} else {
			return
		}
		doctorAccountDetails!.addressData = updatedAddresses
	}

	return (
		<div onClick = {toggleOpen} className = "flex justify-between items-center p-3 bg-gray-200 text-black cursor-pointer">
			<div className = "flex space-x-4">
				<PublicStatus
					address = {address}
					handleToggleChange = {handleToggleChange}
				/>
				<InstantBook
					address = {address}
					handleToggleChange = {handleToggleChange}
				/>
			</div>
			<div className = "text-center font-bold">
				<AddressTitle
					address = {address}
					index = {index}
				/>
			</div>
			<div className = "flex justify-end items-center">
				<div className = "flex items-center">
					<SaveOrUpdateButton
						address = {address}
						setAddressesConfirmation = {setAddressesConfirmation}
					/>
				</div>
				<DeleteLocationButton
					address = {address}
					setAddressesConfirmation = {setAddressesConfirmation}
				/>
			</div>
		</div>
	)
}
