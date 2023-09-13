import _ from "lodash"
import { useContext } from "react"
import AddressAccordionItem from "./address-accordion-item"
import { AppContext } from "src/contexts/maroon-context"

interface Props {
	setAddressesConfirmation: (conf: ConfirmationMessage) => void
}

export default function AddressAccordionMap (props: Props) {
	const { setAddressesConfirmation } = props
	const { doctorAccountDetails } = useContext(AppContext)

	if (_.isNull(doctorAccountDetails)) return null

	return (
		<>
			{doctorAccountDetails.addressData.sort((a, b) => a.addressPriority - b.addressPriority).map((address, index) => (
				<AddressAccordionItem
					// do not change the key to addressesId, or saving locations gets messed up when adding multiple locations at once
					key = {address.addressPriority}
					index = {index}
					address = {address}
					setAddressesConfirmation = {setAddressesConfirmation}
				/>
			))}
		</>
	)
}
