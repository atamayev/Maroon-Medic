import { Accordion } from "react-bootstrap"
import AccordionBody from "./accordion-body/accordion-body"
import AccordionHeader from "./accordion-header/accordion-header"

interface AddressAccordionProps {
  index: number
  address: DoctorAddressData
  addresses: DoctorAddressData[]
  setAddresses: React.Dispatch<React.SetStateAction<DoctorAddressData[]>>
  setAddressesConfirmation: (conf: ConfirmationMessage) => void
}

const AddressAccordionItem = (props: AddressAccordionProps) => {
  const { index, address, addresses, setAddresses, setAddressesConfirmation } = props

  return (
    <Accordion.Item eventKey = {address.address_priority.toString()} style = {{ marginBottom: "10px" }}>
      <AccordionHeader
        index = {index}
        address = {address}
        addresses = {addresses}
        setAddresses = {setAddresses}
        setAddressesConfirmation = {setAddressesConfirmation}
      />
      <AccordionBody
        address = {address}
        addresses = {addresses}
        setAddresses = {setAddresses}
      />
    </Accordion.Item>
  )
}

export default AddressAccordionItem
