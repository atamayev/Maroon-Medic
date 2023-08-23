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
  toggleOpen: () => void
}

const AccordionHeader = (props: Props) => {
  const { index, address, addresses, setAddresses, setAddressesConfirmation, toggleOpen } = props

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
    <div onClick = {toggleOpen} className = "flex justify-between items-center p-4 bg-yellow-500 text-white cursor-pointer">
      <div className = "flex space-x-4">
        <PublicStatus
          address = {address}
          handleToggleChange = {handleToggleChange}
        />
        <InstantBook
          address = {address}
          handleToggleChange = {handleToggleChange}
        />
      </div>
      <div className = "text-center font-bold">
        <AddressTitle
          address = {address}
          index = {index}
        />
      </div>
      <div className = "flex justify-end items-center">
        <div className = "flex items-center">
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
      </div>
    </div>
  )
}

export default AccordionHeader
