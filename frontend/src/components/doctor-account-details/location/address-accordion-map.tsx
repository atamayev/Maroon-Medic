import AddressAccordionItem from "./address-accordion-item"

interface Props {
  addresses: DoctorAddressData[]
  setAddresses: React.Dispatch<React.SetStateAction<DoctorAddressData[]>>
  setAddressesConfirmation: (conf: ConfirmationMessage) => void
}

const AddressAccordionMap = (props: Props) => {
	const { addresses, setAddresses, setAddressesConfirmation } = props

	return (
		<>
			{addresses.sort((a, b) => a.address_priority - b.address_priority).map((address, index) => (
				<AddressAccordionItem
					// do not change the key to addressesID, or saving locations gets messed up when adding multiple locations at once
					key = {address.address_priority}
					index = {index}
					address = {address}
					addresses = {addresses}
					setAddresses = {setAddresses}
					setAddressesConfirmation = {setAddressesConfirmation}
				/>
			))}
		</>
	)
}

export default AddressAccordionMap
