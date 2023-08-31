import AddressAccordionItem from "./address-accordion-item"

interface Props {
  addresses: DoctorAddressData[]
  setAddresses: React.Dispatch<React.SetStateAction<DoctorAddressData[]>>
  setAddressesConfirmation: (conf: ConfirmationMessage) => void
}

export default function AddressAccordionMap (props: Props) {
	const { addresses, setAddresses, setAddressesConfirmation } = props

	return (
		<>
			{addresses.sort((a, b) => a.addressPriority - b.addressPriority).map((address, index) => (
				<AddressAccordionItem
					// do not change the key to addressesId, or saving locations gets messed up when adding multiple locations at once
					key = {address.addressPriority}
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
