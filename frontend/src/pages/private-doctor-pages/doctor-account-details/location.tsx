import "react-toggle/style.css"
import { Card, Accordion } from "react-bootstrap"
import "../../../styles/location.css"
import SavedConfirmationMessage from "../../../components/saved-confirmation-message"
import useConfirmationMessage from "../../../custom-hooks/use-confirmation-message"
import AddNewLocationButton from "src/components/doctor-account-details/location/add-new-location-button"
import AddressAccordionMap from "src/components/doctor-account-details/location/address-accordion-map"

interface Props {
  addresses: DoctorAddressData[]
  setAddresses: React.Dispatch<React.SetStateAction<DoctorAddressData[]>>
}

export default function LocationSection(props: Props) {
  return (
    <Card className = "mb-3">
      <Card.Header>
        Locations
      </Card.Header>
      <Card.Body>
        <AddressForm {...props} />
      </Card.Body>
    </Card>
  )
}

function AddressForm(props: Props) {
  const { addresses, setAddresses } = props
  const [addressesConfirmation, setAddressesConfirmation] = useConfirmationMessage()

  return (
    <>
      <Accordion >
        <AddressAccordionMap
          addresses = {addresses}
          setAddresses = {setAddresses}
          setAddressesConfirmation = {setAddressesConfirmation}
        />
      </Accordion>
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
