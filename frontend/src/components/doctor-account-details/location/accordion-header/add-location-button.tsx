import { Button } from "react-bootstrap"
import { addLocation } from "src/helper-functions/account-details/save/save-doctor-account-details"
import { areAllFieldsValid, areAllTimesValid } from "src/utils/all-field-checks"

interface Props {
  address: DoctorAddressData
  setAddresses: React.Dispatch<React.SetStateAction<DoctorAddressData[]>>
  setAddressesConfirmation: (conf: ConfirmationMessage) => void
}

const AddLocationButton = (props: Props) => {
  const {address, setAddresses, setAddressesConfirmation} = props

  return (
    <Button
      variant = "success"
      disabled = {!areAllFieldsValid(address) || !areAllTimesValid(address)}
      onClick = {() => addLocation(address, setAddresses, setAddressesConfirmation)}
    >
      Add Location
    </Button>
  )
}

export default AddLocationButton
