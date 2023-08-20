import { Accordion, Form } from "react-bootstrap"
import FirstAccordionBodyRow from "./first-accordion-body-row"
import SecondAccordionBodyRow from "./second-accordion-body-row"
import MapDataAndWeekDays from "./times-section/map-data-and-week-days"

interface Props {
  address: DoctorAddressData
  addresses: DoctorAddressData[]
  setAddresses: React.Dispatch<React.SetStateAction<DoctorAddressData[]>>
}

const AccordionBody = (props: Props) => {
  const { address, setAddresses, addresses } = props

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, addressPriority: number) => {
    const newAddresses = addresses.map(_address => {
      if (_address.address_priority === addressPriority) return { ..._address, [event.target.name]: event.target.value }
      return _address
    })
    setAddresses(newAddresses)
  }

  return (
    <Accordion.Body>
      <Form>
        <FirstAccordionBodyRow
          address = {address}
          handleInputChange = {handleInputChange}
        />
        <SecondAccordionBodyRow
          address = {address}
          handleInputChange = {handleInputChange}
        />
        <MapDataAndWeekDays
          address = {address}
          setAddresses  = {setAddresses}
          addresses = {addresses}
        />
      </Form>
    </Accordion.Body>
  )
}

export default AccordionBody
