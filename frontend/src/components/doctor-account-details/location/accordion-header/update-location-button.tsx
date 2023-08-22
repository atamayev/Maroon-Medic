import _ from "lodash"
import { Button } from "react-bootstrap"
import { areAllFieldsValid, areAllTimesValid } from "src/utils/all-field-checks"
import { updateLocation } from "src/helper-functions/account-details/save/save-doctor-account-details"

interface Props {
  address: DoctorAddressData
  setAddresses: React.Dispatch<React.SetStateAction<DoctorAddressData[]>>
  setAddressesConfirmation: (conf: ConfirmationMessage) => void
}

const UpdateLocationButton = (props: Props) => {
  const {address, setAddresses, setAddressesConfirmation} = props

  const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails") ?? "{}")
  const originalAddress = DoctorAccountDetails.addressData.find((addr: DoctorAddressData) => addr.addressesID === address.addressesID)
  const isAddressSame = _.isEqual(originalAddress, address)
  if (isAddressSame) return null

  return (
    <Button
      variant = "secondary"
      disabled = {!areAllFieldsValid(address) || !areAllTimesValid(address)}
      onClick = {() => updateLocation(address, setAddresses, setAddressesConfirmation)}
    >
      Update Location
    </Button>
  )
}

export default UpdateLocationButton
