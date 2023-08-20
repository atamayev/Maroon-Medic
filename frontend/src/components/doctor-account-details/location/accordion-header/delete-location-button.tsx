import { Button } from "react-bootstrap"
import { deleteLocation } from "src/custom-hooks/account-details-hooks/save-doctor-account-details"

interface Props {
  address: DoctorAddressData
  addresses: DoctorAddressData[]
  setAddresses: React.Dispatch<React.SetStateAction<DoctorAddressData[]>>
  setAddressesConfirmation: (conf: ConfirmationMessage) => void
}

const DeleteLocationButton = (props: Props) => {
  const { address, addresses, setAddresses, setAddressesConfirmation } = props

  const handleDeleteAddress = () => {
    if (address.addressesID === -1) setAddresses(addresses.filter(addressf => addressf.address_priority !== address.address_priority))
    else deleteLocation(address.addressesID, setAddresses, setAddressesConfirmation)
  }

  return (
    <Button
      variant = "danger"
      size = "sm"
      onClick = {() => handleDeleteAddress()} style = {{ float: "right" }}
    >
      Delete Location
    </Button>
  )
}

export default DeleteLocationButton
