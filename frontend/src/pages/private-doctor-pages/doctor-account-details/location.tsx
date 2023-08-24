import "react-toggle/style.css"
import "../../../styles/location.css"
import SavedConfirmationMessage from "../../../components/saved-confirmation-message"
import useConfirmationMessage from "../../../custom-hooks/use-confirmation-message"
import AddNewLocationButton from "src/components/doctor-account-details/location/add-new-location-button"
import AddressAccordionMap from "src/components/doctor-account-details/location/address-accordion-map"
import AccountDetailsCard from "src/components/account-details-card"

interface Props {
  addresses: DoctorAddressData[]
  setAddresses: React.Dispatch<React.SetStateAction<DoctorAddressData[]>>
}

export default function LocationSection(props: Props) {
	return (
		<AccountDetailsCard
			title = "Locations"
			content = {<AddressForm {...props} />}
		/>
	)
}

function AddressForm(props: Props) {
	const { addresses, setAddresses } = props
	const [addressesConfirmation, setAddressesConfirmation] = useConfirmationMessage()

	return (
		<>
			<AddressAccordionMap
				addresses = {addresses}
				setAddresses = {setAddresses}
				setAddressesConfirmation = {setAddressesConfirmation}
			/>
			<AddNewLocationButton
				addresses = {addresses}
				setAddresses = {setAddresses}
			/>
			<SavedConfirmationMessage
				confirmationMessage = {addressesConfirmation}
				whatIsBeingSaved = "Locations"
			/>
		</>
	)
}
