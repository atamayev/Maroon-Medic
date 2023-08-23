import Button from "src/components/button"
import deleteLocation from "src/helper-functions/account-details/save/doctor-account-details/delete-location"

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
      className = "mr-3 float-right"
      colorClass = "bg-red-600"
      hoverClass = "hover:bg-red-700"
      title = "Delete Location"
      onClick = {() => handleDeleteAddress()}
    />
  )
}

export default DeleteLocationButton
