import { Button } from "react-bootstrap"
import { handleAddAccordion } from "src/custom-hooks/account-details-hooks/add"

interface Props {
  addresses: DoctorAddressData[]
  setAddresses: React.Dispatch<React.SetStateAction<DoctorAddressData[]>>
}

const AddNewLocationButton = (props: Props) => {
  const { addresses, setAddresses } = props

  return (
    <Button
      variant = "primary"
      onClick = {() => handleAddAccordion(addresses, setAddresses)}
      style = {{ marginRight: "10px" }}
    >
      Add New Location
    </Button>
  )
}

export default AddNewLocationButton
