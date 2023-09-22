import _ from "lodash"
import { useContext } from "react"
import { observer } from "mobx-react"
import AddressAccordionItem from "./address-accordion-item"
import { AppContext } from "src/contexts/maroon-context"

interface Props {
	setAddressesConfirmation: (conf: ConfirmationMessage) => void
}

function AddressAccordionMap (props: Props) {
	const { setAddressesConfirmation } = props
	const { doctorAccountDetails } = useContext(AppContext)

	if (_.isNull(doctorAccountDetails)) return null

	const sortedAddresses = doctorAccountDetails.addressData.slice().sort((a, b) => a.addressPriority - b.addressPriority)

	return (
		<>
			{sortedAddresses.map((address, index) => (
				<AddressAccordionItem
					// do not change the key to addressesId, or saving locations gets messed up when adding multiple locations at once
					key={address.addressPriority}
					index={index}
					address={address}
					setAddressesConfirmation={setAddressesConfirmation}
				/>
			))}
		</>
	)
}

export default observer(AddressAccordionMap)
