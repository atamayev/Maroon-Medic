import { useState } from "react"
import AccordionBody from "./accordion-body/accordion-body"
import AccordionHeader from "./accordion-header/accordion-header"

interface AddressAccordionProps {
  index: number
  address: DoctorAddressData
  addresses: DoctorAddressData[]
  setAddresses: React.Dispatch<React.SetStateAction<DoctorAddressData[]>>
  setAddressesConfirmation: (conf: ConfirmationMessage) => void
}

export default function AddressAccordionItem (props: AddressAccordionProps) {
	const { index, address, addresses, setAddresses, setAddressesConfirmation } = props

	const [isOpen, setIsOpen] = useState(false)

	return (
		<div className="mb-4">
			<AccordionHeader
				index = {index}
				address = {address}
				addresses = {addresses}
				setAddresses = {setAddresses}
				setAddressesConfirmation = {setAddressesConfirmation}
				toggleOpen={() => setIsOpen(!isOpen)}
			/>
			<AccordionBody
				isOpen={isOpen}
				address = {address}
				addresses = {addresses}
				setAddresses = {setAddresses}
			/>
		</div>
	)
}
