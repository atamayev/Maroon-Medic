import { Button } from "react-bootstrap"
import addAccordion from "src/helper-functions/account-details/add/add-accordion"

interface Props {
  addresses: DoctorAddressData[]
  setAddresses: React.Dispatch<React.SetStateAction<DoctorAddressData[]>>
}

const AddNewLocationButton = (props: Props) => {
  const { addresses, setAddresses } = props

  return (
    <Button
      variant = "primary"
      onClick = {() => addAccordion(addresses, setAddresses)}
      style = {{ marginRight: "10px" }}
    >
      Add New Location
    </Button>
  )
}

export default AddNewLocationButton
