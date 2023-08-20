import { Accordion,  Container, Row, Col } from "react-bootstrap"
import PublicStatus from "./public-status"
import InstantBook from "./instant-book"
import SaveOrUpdateButton from "./save-or-update-button"
import DeleteLocationButton from "./delete-location-button"
import AddressTitle from "./address-title"

interface Props {
  index: number
  address: DoctorAddressData
  addresses: DoctorAddressData[]
  setAddresses: React.Dispatch<React.SetStateAction<DoctorAddressData[]>>
  setAddressesConfirmation: (conf: ConfirmationMessage) => void
}

const AccordionHeader = (props: Props) => {
  const { index, address, addresses, setAddresses, setAddressesConfirmation } = props

  const handleToggleChange = (
    addressPriority: number,
    field: keyof Pick<DoctorAddressData, "address_public_status" | "instant_book">
  ) => {
    // Create a copy of the addresses state
    const updatedAddresses = [...addresses]
    // Find the index of the address object with the matching priority
    const addressIndex = updatedAddresses.findIndex(addr => addr.address_priority === addressPriority)

    if (field in updatedAddresses[addressIndex]) {
      updatedAddresses[addressIndex][field] = !updatedAddresses[addressIndex][field]
    } else {
      return
    }
    setAddresses(updatedAddresses)
  }

  return (
    <Accordion.Header>
      <Container>
        <Row>
          <Col xs = {4} className = "d-flex align-items-center">
            <PublicStatus
              address = {address}
              handleToggleChange = {handleToggleChange}
            />
            <InstantBook
              address = {address}
              handleToggleChange = {handleToggleChange}
            />
          </Col>
          <Col xs = {4} className = "text-center font-weight-bold">
            <AddressTitle
              address = {address}
              index = {index}
            />
          </Col>
          <Col xs = {4} className = "text-right">
            <div className = "align-items-left">
              <SaveOrUpdateButton
                address = {address}
                setAddresses = {setAddresses}
                setAddressesConfirmation = {setAddressesConfirmation}
              />
            </div>
            <DeleteLocationButton
              address = {address}
              addresses = {addresses}
              setAddresses = {setAddresses}
              setAddressesConfirmation = {setAddressesConfirmation}
            />
          </Col>
        </Row>
      </Container>
    </Accordion.Header>
  )
}

export default AccordionHeader
