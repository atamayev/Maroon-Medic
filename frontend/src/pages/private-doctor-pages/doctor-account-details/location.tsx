import "react-toggle/style.css"
import "../../../styles/location.css"
import SavedConfirmationMessage from "../../../components/saved-confirmation-message"
import useConfirmationMessage from "../../../custom-hooks/use-confirmation-message"
import AddNewLocationButton from "src/components/doctor-account-details/location/add-new-location-button"
import AddressAccordionMap from "src/components/doctor-account-details/location/address-accordion-map"
import AccountDetailsCard from "src/components/account-details-card"

export default function LocationSection() {
	return (
		<AccountDetailsCard
			title = "Locations"
			content = {<AddressForm />}
		/>
	)
}

function AddressForm() {
	const [addressesConfirmation, setAddressesConfirmation] = useConfirmationMessage()

	return (
		<>
			<AddressAccordionMap
				setAddressesConfirmation = {setAddressesConfirmation}
			/>
			<AddNewLocationButton
			/>
			<SavedConfirmationMessage
				confirmationMessage = {addressesConfirmation}
				whatIsBeingSaved = "Locations"
			/>
		</>
	)
}
