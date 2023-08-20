import UpdateLocationButton from "./update-location-button"
import AddLocationButton from "./add-location-button"

interface Props {
  address: DoctorAddressData
  setAddresses: React.Dispatch<React.SetStateAction<DoctorAddressData[]>>
  setAddressesConfirmation: (conf: ConfirmationMessage) => void
}

const SaveOrUpdateButton = (props: Props) => {
  const { address, setAddresses, setAddressesConfirmation } = props
  const nonExistantAddressesID = -1

  if (address.addressesID === nonExistantAddressesID) {
    return (
      <AddLocationButton
        address = {address}
        setAddresses = {setAddresses}
        setAddressesConfirmation = {setAddressesConfirmation}
      />
    )
  }

  return (
    <UpdateLocationButton
      address = {address}
      setAddresses = {setAddresses}
      setAddressesConfirmation = {setAddressesConfirmation}
    />
  )
}

export default SaveOrUpdateButton
